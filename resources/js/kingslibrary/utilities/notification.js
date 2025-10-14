/**
 * Notification Utility - Smart notification system with SweetAlert2 integration
 * Supports CSS classes: .notification-trigger, .toast-trigger
 */

class NotificationUtility extends BaseUtility {
    constructor(kingsLibrary) {
        super(kingsLibrary);
        
        this.config = {
            position: 'top-right',
            duration: 4000,
            showCloseButton: true,
            showProgressBar: true,
            pauseOnHover: true,
            newestOnTop: true
        };
        
        this.notificationQueue = [];
        this.activeNotifications = new Map();
    }
    
    bindEvents() {
        // Handle notification triggers
        document.addEventListener('click', (e) => {
            if (e.target.matches('.notification-trigger') || e.target.closest('.notification-trigger')) {
                e.preventDefault();
                const trigger = e.target.closest('.notification-trigger') || e.target;
                this.handleNotificationTrigger(trigger);
            }
            
            if (e.target.matches('.toast-trigger') || e.target.closest('.toast-trigger')) {
                e.preventDefault();
                const trigger = e.target.closest('.toast-trigger') || e.target;
                this.handleToastTrigger(trigger);
            }
            
            // Handle event triggers
            if (e.target.dataset.event) {
                e.preventDefault();
                this.handleEventTrigger(e.target);
            }
            
            // Handle notification method triggers
            if (e.target.dataset.notification) {
                e.preventDefault();
                this.handleNotificationMethodTrigger(e.target);
            }
        });
        
        // Listen for form success/error events
        document.addEventListener('kingslibrary:form:success', (e) => {
            const message = e.detail.response?.message || 'Operation completed successfully!';
            this.success(message);
        });
        
        document.addEventListener('kingslibrary:form:error', (e) => {
            const message = e.detail.error?.message || 'An error occurred. Please try again.';
            this.error(message);
        });
        
        // Listen for AJAX request events
        document.addEventListener('kingslibrary:ajax:success', (e) => {
            const message = e.detail.message || 'Request completed successfully!';
            this.success(message, 'Success');
        });
        
        document.addEventListener('kingslibrary:ajax:error', (e) => {
            const message = e.detail.message || 'Request failed. Please try again.';
            this.error(message, 'Request Failed');
        });
        
        // Listen for validation events
        document.addEventListener('kingslibrary:validation:error', (e) => {
            const message = e.detail.message || 'Please correct the errors and try again.';
            this.warning(message, 'Validation Error');
        });
        
        // Listen for data events
        document.addEventListener('kingslibrary:data:saved', (e) => {
            const message = e.detail.message || 'Data saved successfully!';
            this.success(message, 'Saved', { toast: true, timer: 2000 });
        });
        
        document.addEventListener('kingslibrary:data:deleted', (e) => {
            const message = e.detail.message || 'Item deleted successfully!';
            this.success(message, 'Deleted');
        });
        
        // Listen for authentication events
        document.addEventListener('kingslibrary:auth:login', (e) => {
            const message = e.detail.message || 'Welcome back!';
            this.success(message, 'Login Successful', { toast: true });
        });
        
        document.addEventListener('kingslibrary:auth:logout', (e) => {
            const message = e.detail.message || 'You have been logged out successfully.';
            this.info(message, 'Logged Out', { toast: true });
        });
        
        document.addEventListener('kingslibrary:auth:error', (e) => {
            const message = e.detail.message || 'Authentication failed. Please try again.';
            this.error(message, 'Authentication Error');
        });
        
        // Listen for file upload events
        document.addEventListener('kingslibrary:upload:success', (e) => {
            const message = e.detail.message || 'File uploaded successfully!';
            this.success(message, 'Upload Complete');
        });
        
        document.addEventListener('kingslibrary:upload:error', (e) => {
            const message = e.detail.message || 'File upload failed. Please try again.';
            this.error(message, 'Upload Failed');
        });
        
        document.addEventListener('kingslibrary:upload:progress', (e) => {
            const percent = e.detail.percent || 0;
            this.info(`Upload progress: ${percent}%`, 'Uploading...', { 
                toast: true, 
                timer: 1000 
            });
        });
        
        // Listen for network events
        document.addEventListener('kingslibrary:network:offline', (e) => {
            this.warning('You are currently offline. Some features may not work.', 'Network Status');
        });
        
        document.addEventListener('kingslibrary:network:online', (e) => {
            this.success('Connection restored!', 'Back Online', { toast: true });
        });
        
        // Listen for permission events
        document.addEventListener('kingslibrary:permission:denied', (e) => {
            const message = e.detail.message || 'You do not have permission to perform this action.';
            this.warning(message, 'Access Denied');
        });
        
        // Listen for session events
        document.addEventListener('kingslibrary:session:expired', (e) => {
            this.warning('Your session has expired. Please login again.', 'Session Expired', {
                showConfirmButton: true,
                confirmButtonText: 'Login',
                timer: null
            });
        });
        
        // Listen for generic notification events
        document.addEventListener('kingslibrary:notify', (e) => {
            const { type = 'info', message, title, options = {} } = e.detail;
            this.show(type, message, title, options);
        });
    }
    
    /**
     * Show success notification
     * @param {string} message - Success message
     * @param {string} title - Optional title
     * @param {Object} options - Additional options
     */
    success(message, title = 'Success', options = {}) {
        return this.show('success', message, title, options);
    }
    
    /**
     * Show error notification
     * @param {string} message - Error message
     * @param {string} title - Optional title
     * @param {Object} options - Additional options
     */
    error(message, title = 'Error', options = {}) {
        return this.show('error', message, title, options);
    }
    
    /**
     * Show warning notification
     * @param {string} message - Warning message
     * @param {string} title - Optional title
     * @param {Object} options - Additional options
     */
    warning(message, title = 'Warning', options = {}) {
        return this.show('warning', message, title, options);
    }
    
    /**
     * Show info notification
     * @param {string} message - Info message
     * @param {string} title - Optional title
     * @param {Object} options - Additional options
     */
    info(message, title = 'Info', options = {}) {
        return this.show('info', message, title, options);
    }
    
    /**
     * Show notification
     * @param {string} type - Notification type (success, error, warning, info)
     * @param {string} message - Notification message
     * @param {string} title - Notification title
     * @param {Object} options - Additional options
     */
    show(type, message, title, options = {}) {
        if (typeof Swal !== 'undefined') {
            return this.showSweetAlert(type, message, title, options);
        } else {
            return this.showToast(type, message, title, options);
        }
    }
    
    /**
     * Show SweetAlert2 notification
     * @param {string} type - Notification type
     * @param {string} message - Notification message
     * @param {string} title - Notification title
     * @param {Object} options - Additional options
     */
    showSweetAlert(type, message, title, options = {}) {
        const config = {
            icon: type,
            title: title,
            text: message,
            position: options.position || this.config.position,
            showConfirmButton: options.showConfirmButton !== false,
            timer: options.timer || (options.autoClose !== false ? this.config.duration : null),
            timerProgressBar: options.timerProgressBar !== false && this.config.showProgressBar,
            ...options
        };
        
        // For toast notifications
        if (options.toast === true) {
            config.toast = true;
            config.showConfirmButton = false;
            config.position = options.position || 'top-end';
        }
        
        return Swal.fire(config);
    }
    
    /**
     * Show fallback toast notification
     * @param {string} type - Notification type
     * @param {string} message - Notification message
     * @param {string} title - Notification title
     * @param {Object} options - Additional options
     */
    showToast(type, message, title, options = {}) {
        const toastId = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        
        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = `kingslibrary-toast toast-${type} ${options.className || ''}`;
        
        const iconMap = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">
                    <i class="fa ${iconMap[type] || iconMap.info}"></i>
                </div>
                <div class="toast-message">
                    <div class="toast-title">${title}</div>
                    <div class="toast-text">${message}</div>
                </div>
                ${this.config.showCloseButton ? '<button class="toast-close">&times;</button>' : ''}
            </div>
            ${this.config.showProgressBar ? '<div class="toast-progress"><div class="toast-progress-bar"></div></div>' : ''}
        `;
        
        // Add to container
        this.getToastContainer().appendChild(toast);
        
        // Animate in
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Auto remove
        const duration = options.duration || this.config.duration;
        if (duration > 0) {
            const progressBar = toast.querySelector('.toast-progress-bar');
            if (progressBar) {
                progressBar.style.animationDuration = `${duration}ms`;
            }
            
            setTimeout(() => this.removeToast(toastId), duration);
        }
        
        // Handle close button
        const closeButton = toast.querySelector('.toast-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.removeToast(toastId));
        }
        
        // Handle hover pause
        if (this.config.pauseOnHover) {
            toast.addEventListener('mouseenter', () => {
                toast.classList.add('paused');
            });
            
            toast.addEventListener('mouseleave', () => {
                toast.classList.remove('paused');
            });
        }
        
        this.activeNotifications.set(toastId, toast);
        
        return { id: toastId, element: toast };
    }
    
    /**
     * Show confirmation dialog
     * @param {string} message - Confirmation message
     * @param {string} title - Dialog title
     * @param {Object} options - Additional options
     */
    confirm(message, title = 'Confirm', options = {}) {
        const config = {
            icon: 'question',
            title: title,
            text: message,
            showCancelButton: true,
            confirmButtonText: options.confirmText || 'Yes',
            cancelButtonText: options.cancelText || 'No',
            ...options
        };
        
        if (typeof Swal !== 'undefined') {
            return Swal.fire(config);
        } else {
            // Fallback to native confirm
            return Promise.resolve({ 
                isConfirmed: confirm(`${title}\n\n${message}`) 
            });
        }
    }
    
    /**
     * Remove toast notification
     * @param {string} toastId - Toast ID to remove
     */
    removeToast(toastId) {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.remove('show');
            toast.classList.add('hide');
            
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
                this.activeNotifications.delete(toastId);
            }, 300);
        }
    }
    
    /**
     * Get or create toast container
     * @returns {HTMLElement} Toast container
     */
    getToastContainer() {
        let container = document.querySelector('.kingslibrary-toast-container');
        
        if (!container) {
            container = document.createElement('div');
            container.className = 'kingslibrary-toast-container';
            document.body.appendChild(container);
        }
        
        return container;
    }
    
    /**
     * Handle notification trigger click
     * @param {HTMLElement} trigger - Trigger element
     */
    handleNotificationTrigger(trigger) {
        const type = trigger.dataset.type || 'info';
        const message = trigger.dataset.message || 'Notification triggered';
        const title = trigger.dataset.title || 'Notification';
        
        const options = {};
        if (trigger.dataset.position) options.position = trigger.dataset.position;
        if (trigger.dataset.duration) options.duration = parseInt(trigger.dataset.duration);
        if (trigger.dataset.autoClose === 'false') options.autoClose = false;
        
        this.show(type, message, title, options);
    }
    
    /**
     * Handle toast trigger click
     * @param {HTMLElement} trigger - Trigger element
     */
    handleToastTrigger(trigger) {
        const type = trigger.dataset.type || 'info';
        const message = trigger.dataset.message || 'Toast notification';
        const title = trigger.dataset.title || 'Toast';
        
        const options = { toast: true };
        if (trigger.dataset.position) options.position = trigger.dataset.position;
        if (trigger.dataset.duration) options.duration = parseInt(trigger.dataset.duration);
        
        this.show(type, message, title, options);
    }
    
    /**
     * Handle event trigger click
     * @param {HTMLElement} trigger - Trigger element
     */
    handleEventTrigger(trigger) {
        const eventName = trigger.dataset.event;
        let eventDetail = {};
        
        if (trigger.dataset.eventDetail) {
            try {
                eventDetail = JSON.parse(trigger.dataset.eventDetail);
            } catch (e) {
                console.warn('Invalid JSON in data-event-detail:', e);
            }
        }
        
        // Dispatch the custom event
        document.dispatchEvent(new CustomEvent(eventName, {
            detail: eventDetail
        }));
    }
    
    /**
     * Handle notification method trigger click
     * @param {HTMLElement} trigger - Trigger element
     */
    handleNotificationMethodTrigger(trigger) {
        const method = trigger.dataset.notification;
        const message = trigger.dataset.message;
        const title = trigger.dataset.title;
        const item = trigger.dataset.item;
        const timer = trigger.dataset.timer ? parseInt(trigger.dataset.timer) : null;
        const duration = trigger.dataset.duration ? parseInt(trigger.dataset.duration) : null;
        
        switch (method) {
            case 'successToast':
                this.successToast(message || 'Success!');
                break;
                
            case 'errorToast':
                this.errorToast(message || 'Error occurred');
                break;
                
            case 'warningToast':
                this.warningToast(message || 'Warning!');
                break;
                
            case 'infoToast':
                this.infoToast(message || 'Information');
                break;
                
            case 'confirmDelete':
                this.confirmDelete(item || 'this item').then(result => {
                    if (result.isConfirmed) {
                        this.success('Item deleted successfully!');
                    }
                });
                break;
                
            case 'confirmSave':
                this.confirmSave(message || 'Do you want to save your changes?').then(result => {
                    if (result.isConfirmed) {
                        this.successToast('Changes saved!');
                    }
                });
                break;
                
            case 'networkError':
                this.networkError(message);
                break;
                
            case 'loading':
                this.loading(message || 'Loading...');
                if (duration) {
                    setTimeout(() => {
                        this.closeLoading();
                        this.successToast('Operation completed!');
                    }, duration);
                }
                break;
                
            case 'closeLoading':
                this.closeLoading();
                break;
                
            case 'autoSave':
                this.autoSave();
                break;
                
            case 'sessionTimeout':
                const minutes = trigger.dataset.minutes ? parseInt(trigger.dataset.minutes) : 5;
                this.sessionTimeout(minutes);
                break;
                
            case 'warning':
                this.warning(message || 'Warning!', title || 'Warning', timer ? { timer } : {});
                break;
                
            case 'success':
                this.success(message || 'Success!', title || 'Success', timer ? { timer } : {});
                break;
                
            case 'error':
                this.error(message || 'Error!', title || 'Error', timer ? { timer } : {});
                break;
                
            case 'info':
                this.info(message || 'Info!', title || 'Information', timer ? { timer } : {});
                break;
                
            default:
                console.warn(`Unknown notification method: ${method}`);
        }
    }
    
    /**
     * Clear all notifications
     */
    clearAll() {
        this.activeNotifications.forEach((toast, id) => {
            this.removeToast(id);
        });
    }
    
    /**
     * Configure notification system
     * @param {Object} config - Configuration options
     */
    configure(config) {
        this.config = { ...this.config, ...config };
    }
    
    /**
     * Convenience Methods for Common Use Cases
     */
    
    /**
     * Show toast notification (quick, non-blocking)
     * @param {string} type - Notification type
     * @param {string} message - Message text
     * @param {Object} options - Additional options
     */
    toast(type, message, options = {}) {
        return this.show(type, message, '', {
            toast: true,
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false,
            ...options
        });
    }
    
    /**
     * Quick success toast
     * @param {string} message - Success message
     */
    successToast(message) {
        return this.toast('success', message);
    }
    
    /**
     * Quick error toast
     * @param {string} message - Error message
     */
    errorToast(message) {
        return this.toast('error', message, { timer: 5000 });
    }
    
    /**
     * Quick warning toast
     * @param {string} message - Warning message
     */
    warningToast(message) {
        return this.toast('warning', message, { timer: 4000 });
    }
    
    /**
     * Quick info toast
     * @param {string} message - Info message
     */
    infoToast(message) {
        return this.toast('info', message);
    }
    
    /**
     * Show delete confirmation
     * @param {string} itemName - Name of item to delete
     * @param {Object} options - Additional options
     */
    confirmDelete(itemName = 'this item', options = {}) {
        return this.confirm(
            `Are you sure you want to delete ${itemName}? This action cannot be undone.`,
            'Confirm Delete',
            {
                icon: 'warning',
                confirmButtonText: 'Yes, delete it!',
                confirmButtonColor: '#dc3545',
                focusCancel: true,
                ...options
            }
        );
    }
    
    /**
     * Show save confirmation
     * @param {string} message - Custom save message
     * @param {Object} options - Additional options
     */
    confirmSave(message = 'Do you want to save your changes?', options = {}) {
        return this.confirm(message, 'Save Changes', {
            icon: 'question',
            confirmButtonText: 'Save',
            confirmButtonColor: '#198754',
            ...options
        });
    }
    
    /**
     * Show network error notification
     * @param {string} customMessage - Custom error message
     */
    networkError(customMessage = null) {
        const message = customMessage || 'Network error occurred. Please check your connection and try again.';
        return this.error(message, 'Network Error', {
            showConfirmButton: true,
            confirmButtonText: 'Retry'
        });
    }
    
    /**
     * Show loading notification
     * @param {string} message - Loading message
     * @param {Object} options - Additional options
     */
    loading(message = 'Loading...', options = {}) {
        return this.show('info', message, 'Please wait', {
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            showCancelButton: false,
            didOpen: () => {
                if (typeof Swal !== 'undefined') {
                    Swal.showLoading();
                }
            },
            ...options
        });
    }
    
    /**
     * Close loading notification
     */
    closeLoading() {
        if (typeof Swal !== 'undefined') {
            Swal.close();
        }
    }
    
    /**
     * Show auto-save notification
     * @param {Date} timestamp - Save timestamp
     */
    autoSave(timestamp = new Date()) {
        const timeString = timestamp.toLocaleTimeString();
        return this.toast('success', `Auto-saved at ${timeString}`, {
            position: 'bottom-end',
            timer: 2000
        });
    }
    
    /**
     * Show validation errors
     * @param {Array|Object} errors - Validation errors
     */
    validationErrors(errors) {
        let message = 'Please correct the following errors:';
        
        if (Array.isArray(errors)) {
            message += '\n• ' + errors.join('\n• ');
        } else if (typeof errors === 'object') {
            const errorList = Object.values(errors).flat();
            message += '\n• ' + errorList.join('\n• ');
        } else {
            message = errors.toString();
        }
        
        return this.warning(message, 'Validation Errors', {
            html: message.replace(/\n/g, '<br>')
        });
    }
    
    /**
     * Show session timeout warning
     * @param {number} minutes - Minutes until timeout
     */
    sessionTimeout(minutes = 5) {
        return this.warning(
            `Your session will expire in ${minutes} minute${minutes !== 1 ? 's' : ''}. Click to extend.`,
            'Session Timeout Warning',
            {
                showConfirmButton: true,
                confirmButtonText: 'Extend Session',
                timer: null,
                allowOutsideClick: false
            }
        );
    }
    
    /**
     * Backend Integration Methods
     */
    
    /**
     * Show Laravel flash message
     * @param {string} type - Message type from Laravel session
     * @param {string} message - Message content
     */
    showFlashMessage(type, message) {
        const typeMap = {
            'status': 'success',
            'message': 'success',
            'success': 'success',
            'error': 'error',
            'danger': 'error',
            'warning': 'warning',
            'info': 'info',
            'primary': 'info',
            'secondary': 'info'
        };
        
        const notificationType = typeMap[type] || 'info';
        return this.show(notificationType, message);
    }
    
    /**
     * Check and display Laravel validation errors
     * @param {Object} errors - Laravel validation errors object
     */
    showValidationErrors(errors) {
        if (typeof errors === 'object' && errors !== null) {
            // Handle Laravel validation error format
            const errorMessages = [];
            
            Object.keys(errors).forEach(field => {
                if (Array.isArray(errors[field])) {
                    errorMessages.push(...errors[field]);
                } else {
                    errorMessages.push(errors[field]);
                }
            });
            
            if (errorMessages.length > 0) {
                return this.validationErrors(errorMessages);
            }
        }
    }
    
    /**
     * Show form submission result
     * @param {boolean} success - Whether form submission was successful
     * @param {string} message - Result message
     * @param {Object} errors - Validation errors (if any)
     */
    showFormResult(success, message, errors = null) {
        if (success) {
            return this.success(message || 'Form submitted successfully!');
        } else {
            if (errors) {
                this.showValidationErrors(errors);
            } else {
                return this.error(message || 'Form submission failed. Please try again.');
            }
        }
    }
    
    /**
     * Legacy function support
     * @param {string} type - Notification type
     * @param {string} title - Title
     * @param {string} message - Message
     */
    toastzLegacy(type, title, message) {
        return this.show(type, message, title);
    }
}

// Legacy function support
if (typeof window !== 'undefined') {
    window.Toastz = function(type, title, message) {
        if (window.KL && window.KL.getUtility) {
            const notificationUtility = window.KL.getUtility('notification');
            if (notificationUtility && notificationUtility.toastzLegacy) {
                return notificationUtility.toastzLegacy(type, title, message);
            }
        }
        
        // Fallback
        alert(`${title}: ${message}`);
    };
}

// Global notification instance for easy access
let globalNotificationInstance = null;

// Auto-register with KingsLibrary if available
if (typeof window !== 'undefined' && window.KL) {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof NotificationUtility !== 'undefined') {
            window.KL.registerUtility('notification', NotificationUtility);
            
            // Create global instance for easy access
            globalNotificationInstance = window.KL.getUtility('notification');
            
            // Make it globally accessible
            window.KingsNotify = globalNotificationInstance;
        }
    });
}

// Global helper functions for backend integration
window.KingsLibrary = window.KingsLibrary || {};
window.KingsLibrary.showNotification = function(type, message, title = null, options = {}) {
    if (globalNotificationInstance) {
        return globalNotificationInstance.show(type, message, title, options);
    } else {
        // Fallback if KingsLibrary not loaded yet
        console.warn('KingsLibrary not loaded yet, using alert fallback');
        alert(`${title ? title + ': ' : ''}${message}`);
    }
};

// Convenience functions for Laravel integration
window.KingsLibrary.checkSessionMessages = function() {
    // Check for common Laravel session message keys
    const sessionKeys = ['success', 'error', 'warning', 'info', 'message', 'status'];
    
    sessionKeys.forEach(key => {
        const element = document.querySelector(`meta[name="flash-${key}"]`);
        if (element && element.content) {
            const message = element.content;
            
            // Determine notification type
            let type = key;
            if (key === 'message' || key === 'status') {
                type = 'success'; // Default for generic messages
            }
            
            // Show notification
            window.KingsLibrary.showNotification(type, message);
            
            // Remove meta tag to prevent duplicate notifications
            element.remove();
        }
    });
    
    // Also check for data attributes on body
    const body = document.body;
    if (body.dataset.flashSuccess) {
        window.KingsLibrary.showNotification('success', body.dataset.flashSuccess);
        delete body.dataset.flashSuccess;
    }
    if (body.dataset.flashError) {
        window.KingsLibrary.showNotification('error', body.dataset.flashError);
        delete body.dataset.flashError;
    }
    if (body.dataset.flashWarning) {
        window.KingsLibrary.showNotification('warning', body.dataset.flashWarning);
        delete body.dataset.flashWarning;
    }
    if (body.dataset.flashInfo) {
        window.KingsLibrary.showNotification('info', body.dataset.flashInfo);
        delete body.dataset.flashInfo;
    }
};

// Auto-check for session messages on page load
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for KingsLibrary to fully initialize
    setTimeout(() => {
        window.KingsLibrary.checkSessionMessages();
    }, 500);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationUtility;
}

// Global exposure
window.NotificationUtility = NotificationUtility;