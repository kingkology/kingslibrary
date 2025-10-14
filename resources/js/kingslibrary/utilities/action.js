/**
 * KingsLibrary - Action Utilities
 * Handles AJAX actions, confirmations, and form interactions
 * 
 * @version 3.0.0
 * @author KingsLibrary
 * @requires jQuery, SweetAlert2
 */

(function() {
    'use strict';

    // Action utility class
    class ActionUtility extends KL.BaseUtility {
        constructor() {
            super('Action');
            this.selectors = {
                confirmAction: '.confirm-action',
                ajaxAction: '.ajax-action',
                forms: 'form'
            };
        }

        initialize() {
            this.bindConfirmActions();
            this.bindAjaxActions();
            this.bindFormSubmissions();
            this.log('Action utilities initialized');
        }

        /**
         * Bind confirmation actions
         * Shows SweetAlert confirmation before executing action
         */
        bindConfirmActions() {
            $(document).on('click', this.selectors.confirmAction, (e) => {
                e.preventDefault();
                const $target = $(e.currentTarget);
                
                const config = {
                    message: $target.data('message') || 'Are you sure you want to perform this action?',
                    actionUrl: $target.data('action-url'),
                    method: $target.data('method') || 'POST',
                    formId: $target.data('form-id'),
                    ajaxSubmit: $target.data('ajax-submit')
                };

                this.showConfirmation(config, $target);
            });
        }

        /**
         * Show confirmation dialog
         */
        showConfirmation(config, $target) {
            if (window.Swal) {
                Swal.fire({
                    title: 'Please Confirm',
                    text: config.message,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, proceed',
                    cancelButtonText: 'Cancel',
                    draggable: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.executeAction(config, $target);
                    }
                });
            } else {
                // Fallback to native confirm
                if (confirm(config.message)) {
                    this.executeAction(config, $target);
                }
            }
        }

        /**
         * Execute the confirmed action
         */
        executeAction(config, $target) {
            if (config.formId) {
                this.handleFormAction(config);
            } else if (config.actionUrl) {
                this.handleDirectAction(config);
            }
        }

        /**
         * Handle form submission after confirmation
         */
        handleFormAction(config) {
            const $form = $(`#${config.formId}`);
            if (!$form.length) {
                this.showError('Form not found');
                return;
            }

            if (config.ajaxSubmit === 'true' || config.ajaxSubmit === true) {
                this.submitFormViaAjax($form);
            } else {
                $form.submit();
            }
        }

        /**
         * Handle direct AJAX action
         */
        handleDirectAction(config) {
            this.showLoading();
            
            $.ajax({
                url: config.actionUrl,
                type: config.method,
                headers: this.getAjaxHeaders(),
                success: (response) => {
                    this.hideLoading();
                    this.handleActionSuccess(response);
                },
                error: (xhr) => {
                    this.hideLoading();
                    this.handleActionError(xhr);
                }
            });
        }

        /**
         * Bind AJAX actions (no confirmation)
         */
        bindAjaxActions() {
            $(document).on('click', this.selectors.ajaxAction, (e) => {
                e.preventDefault();
                const $target = $(e.currentTarget);
                
                const config = {
                    actionUrl: $target.data('action-url'),
                    method: $target.data('method') || 'POST',
                    successMessage: $target.data('success-message') || 'Action completed.',
                    errorMessage: $target.data('error-message') || 'An error occurred.',
                    formId: $target.data('form-id')
                };

                if (config.formId) {
                    const $form = $(`#${config.formId}`);
                    if ($form.length) {
                        this.submitFormViaAjax($form, config);
                    }
                } else if (config.actionUrl) {
                    this.executeAjaxAction(config);
                }
            });
        }

        /**
         * Execute AJAX action without confirmation
         */
        executeAjaxAction(config) {
            $.ajax({
                url: config.actionUrl,
                type: config.method,
                headers: this.getAjaxHeaders(),
                success: (response) => {
                    this.showSuccess(config.successMessage);
                    this.triggerEvent('ajax:success', { response, config });
                },
                error: (xhr) => {
                    const errorMsg = this.extractErrorMessage(xhr) || config.errorMessage;
                    this.showError(errorMsg);
                    this.triggerEvent('ajax:error', { xhr, config });
                }
            });
        }

        /**
         * Submit form via AJAX
         */
        submitFormViaAjax($form, config = {}) {
            const actionUrl = config.actionUrl || $form.attr('action');
            const method = config.method || $form.attr('method') || 'POST';
            const formData = $form.serialize();

            this.showLoading('Processing...');

            $.ajax({
                url: actionUrl,
                type: method,
                data: formData,
                headers: this.getAjaxHeaders(),
                success: (response) => {
                    this.hideLoading();
                    
                    if (response.success !== false) {
                        const message = response.message || config.successMessage || 'Form submitted successfully';
                        this.showSuccess(message);
                        
                        // Reset form if successful
                        $form[0].reset();
                        
                        // Redirect if specified
                        if (response.redirect) {
                            setTimeout(() => {
                                window.location.href = response.redirect;
                            }, 1500);
                        }
                    } else {
                        this.showError(response.message || 'Form submission failed');
                    }
                    
                    this.triggerEvent('form:ajax:success', { response, form: $form });
                },
                error: (xhr) => {
                    this.hideLoading();
                    const errorMsg = this.extractErrorMessage(xhr) || config.errorMessage || 'Form submission failed';
                    this.showError(errorMsg);
                    this.triggerEvent('form:ajax:error', { xhr, form: $form });
                }
            });
        }

        /**
         * Bind form submissions to show loading state
         */
        bindFormSubmissions() {
            // Skip forms that have ajax-form class (handled by form utility)
            $(document).on('submit', 'form:not(.ajax-form)', (e) => {
                // Don't show loading for forms that are being submitted via AJAX
                if ($(e.target).hasClass('ajax-action-form')) {
                    return;
                }
                
                this.showFormLoading();
            });
        }

        /**
         * Show loading state for form submissions
         */
        showFormLoading() {
            if (window.Swal) {
                Swal.fire({
                    title: 'Please wait...',
                    text: 'Your request is being processed.',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
            }
        }

        /**
         * Show loading state
         */
        showLoading(message = 'Please wait...') {
            if (window.Swal) {
                Swal.fire({
                    title: message,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
            }
        }

        /**
         * Hide loading state
         */
        hideLoading() {
            if (window.Swal) {
                Swal.close();
            }
        }

        /**
         * Handle action success
         */
        handleActionSuccess(response) {
            let message = 'Action completed successfully';
            
            if (response && typeof response === 'object') {
                message = response.message || message;
                
                // Handle redirect
                if (response.redirect) {
                    this.showSuccess(message);
                    setTimeout(() => {
                        window.location.href = response.redirect;
                    }, 1500);
                    return;
                }
                
                // Handle page reload
                if (response.reload) {
                    this.showSuccess(message);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                    return;
                }
            }
            
            this.showSuccess(message);
        }

        /**
         * Handle action error
         */
        handleActionError(xhr) {
            const message = this.extractErrorMessage(xhr) || 'An error occurred';
            this.showError(message);
        }

        /**
         * Extract error message from XHR response
         */
        extractErrorMessage(xhr) {
            try {
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    return xhr.responseJSON.message;
                }
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    return xhr.responseJSON.error;
                }
                return xhr.statusText;
            } catch (e) {
                return xhr.statusText || 'Network error occurred';
            }
        }

        /**
         * Get AJAX headers including CSRF token
         */
        getAjaxHeaders() {
            const headers = {
                'X-Requested-With': 'XMLHttpRequest'
            };

            // Add CSRF token for Laravel
            const token = $('meta[name="csrf-token"]').attr('content');
            if (token) {
                headers['X-CSRF-TOKEN'] = token;
            }

            return headers;
        }

        /**
         * Show success message
         */
        showSuccess(message) {
            if (window.KL && window.KL.notification) {
                window.KL.notification.show({
                    type: 'success',
                    title: 'Success!',
                    message: message
                });
            } else if (window.Swal) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: message,
                    timer: 3000,
                    showConfirmButton: false
                });
            } else {
                alert(message);
            }
        }

        /**
         * Show error message
         */
        showError(message) {
            if (window.KL && window.KL.notification) {
                window.KL.notification.show({
                    type: 'error',
                    title: 'Error!',
                    message: message
                });
            } else if (window.Swal) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: message
                });
            } else {
                alert(message);
            }
        }
    }

    // Register utility
    if (typeof window.KL !== 'undefined') {
        window.KL.registerUtility('action', ActionUtility);
    }

})();