/**
 * KingsLibrary Core - Event-driven JavaScript utility library
 * Provides CSS class-based auto-binding for seamless front-end to back-end communications
 * 
 * @version 3.0.0
 * @author KingsLibrary Team
 * @license MIT
 */

class KingsLibrary {
    constructor() {
        this.config = {
            apiBaseUrl: '/api',
            csrfToken: null,
            debug: false,
            notifications: {
                position: 'top-right',
                duration: 4000
            },
            validationMessages: {
                required: 'This field is required',
                email: 'Please enter a valid email',
                minLength: 'Minimum length is {min} characters',
                maxLength: 'Maximum length is {max} characters',
                passwordMatch: 'Passwords do not match'
            }
        };
        
        this.utilities = new Map();
        this.isInitialized = false;
        this.eventHandlers = new Map();
        
        // Backward compatibility for legacy functions
        this.setupLegacySupport();
    }
    
    /**
     * Initialize KingsLibrary with configuration
     * @param {Object} options - Configuration options
     */
    init(options = {}) {
        if (this.isInitialized) {
            console.warn('KingsLibrary is already initialized');
            return this;
        }
        
        // Merge configuration
        this.config = { ...this.config, ...options };
        
        // Set CSRF token from meta tag if available
        if (!this.config.csrfToken) {
            const csrfMeta = document.querySelector('meta[name="csrf-token"]');
            if (csrfMeta) {
                this.config.csrfToken = csrfMeta.getAttribute('content');
            }
        }
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeUtilities());
        } else {
            this.initializeUtilities();
        }
        
        this.isInitialized = true;
        this.log('KingsLibrary initialized successfully');
        
        return this;
    }
    
    /**
     * Register a utility class
     * @param {string} name - Utility name
     * @param {Function} UtilityClass - Utility class constructor
     */
    registerUtility(name, UtilityClass) {
        if (this.utilities.has(name)) {
            console.warn(`Utility '${name}' is already registered`);
            return;
        }
        
        this.utilities.set(name, new UtilityClass(this));
        this.log(`Registered utility: ${name}`);
    }
    
    /**
     * Initialize all registered utilities
     */
    initializeUtilities() {
        // Register core utilities
        if (typeof FormUtility !== 'undefined') {
            this.registerUtility('form', FormUtility);
        }
        
        if (typeof PasswordUtility !== 'undefined') {
            this.registerUtility('password', PasswordUtility);
        }
        
        if (typeof TableUtility !== 'undefined') {
            this.registerUtility('table', TableUtility);
        }
        
        if (typeof MediaUtility !== 'undefined') {
            this.registerUtility('media', MediaUtility);
        }
        
        if (typeof NotificationUtility !== 'undefined') {
            this.registerUtility('notification', NotificationUtility);
        }
        
        // Initialize all utilities
        this.utilities.forEach((utility, name) => {
            try {
                utility.init();
                this.log(`Initialized utility: ${name}`);
            } catch (error) {
                console.error(`Failed to initialize utility '${name}':`, error);
            }
        });
        
        // Setup global event listeners
        this.setupGlobalEvents();
    }
    
    /**
     * Setup global event listeners for dynamic content
     */
    setupGlobalEvents() {
        // Re-initialize utilities when new content is added
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.initializeElement(node);
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    /**
     * Initialize utilities for a specific element
     * @param {HTMLElement} element - Element to initialize
     */
    initializeElement(element) {
        this.utilities.forEach((utility) => {
            if (typeof utility.initializeElement === 'function') {
                utility.initializeElement(element);
            }
        });
    }
    
    /**
     * Get utility instance by name
     * @param {string} name - Utility name
     * @returns {Object|null} Utility instance
     */
    getUtility(name) {
        return this.utilities.get(name) || null;
    }
    
    /**
     * Make AJAX request with automatic CSRF handling
     * @param {Object} options - Request options
     * @returns {Promise} Request promise
     */
    async request(options) {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            ...options
        };
        
        // Add CSRF token for non-GET requests
        if (this.config.csrfToken && config.method !== 'GET') {
            config.headers['X-CSRF-TOKEN'] = this.config.csrfToken;
        }
        
        // Handle URL
        if (config.url && !config.url.startsWith('http')) {
            config.url = this.config.apiBaseUrl + config.url;
        }
        
        try {
            const response = await fetch(config.url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }
            
            return data;
        } catch (error) {
            this.log('Request failed:', error);
            throw error;
        }
    }
    
    /**
     * Show success notification
     * @param {string} message - Success message
     * @param {Object} options - Notification options
     */
    success(message, options = {}) {
        this.notify('success', message, options);
    }
    
    /**
     * Show error notification
     * @param {string} message - Error message
     * @param {Object} options - Notification options
     */
    error(message, options = {}) {
        this.notify('error', message, options);
    }
    
    /**
     * Show info notification
     * @param {string} message - Info message
     * @param {Object} options - Notification options
     */
    info(message, options = {}) {
        this.notify('info', message, options);
    }
    
    /**
     * Show notification using available library
     * @param {string} type - Notification type
     * @param {string} message - Message to show
     * @param {Object} options - Additional options
     */
    notify(type, message, options = {}) {
        // Try SweetAlert2 first
        if (typeof Swal !== 'undefined') {
            const config = {
                icon: type === 'error' ? 'error' : type === 'success' ? 'success' : 'info',
                title: message,
                toast: true,
                position: this.config.notifications.position,
                showConfirmButton: false,
                timer: options.duration || this.config.notifications.duration,
                timerProgressBar: true,
                ...options
            };
            
            Swal.fire(config);
            return;
        }
        
        // Fallback to browser alert
        alert(`[${type.toUpperCase()}] ${message}`);
    }
    
    /**
     * Setup backward compatibility for legacy functions
     */
    setupLegacySupport() {
        // Legacy function mappings will be added by utilities
        window.KingsLibraryLegacy = {};
        
        // Expose common legacy functions
        window.insert_data = (url, formId) => {
            const utility = this.getUtility('form');
            if (utility && utility.submitFormLegacy) {
                return utility.submitFormLegacy(url, formId);
            }
        };
        
        window.call_pagelet = (url, targetId) => {
            return this.request({
                url: url,
                method: 'GET'
            }).then(response => {
                const target = document.getElementById(targetId);
                if (target && response.html) {
                    target.innerHTML = response.html;
                }
            }).catch(error => {
                console.error('Pagelet load failed:', error);
            });
        };
        
        window.checknewpass = (pass1Id, pass2Id, messageId) => {
            const utility = this.getUtility('password');
            if (utility && utility.checkPasswordMatch) {
                return utility.checkPasswordMatch(pass1Id, pass2Id, messageId);
            }
        };
        
        window.ExportToExcel = (tableId) => {
            const utility = this.getUtility('table');
            if (utility && utility.exportToExcel) {
                return utility.exportToExcel(tableId);
            }
        };
        
        window.Toastz = (type, title, message) => {
            this.notify(type, `${title}: ${message}`);
        };
    }
    
    /**
     * Debug logging
     * @param {...any} args - Arguments to log
     */
    log(...args) {
        if (this.config.debug) {
            console.log('[KingsLibrary]', ...args);
        }
    }
}

/**
 * Base utility class that all utilities should extend
 */
class BaseUtility {
    constructor(kingsLibrary) {
        this.kl = kingsLibrary;
        this.initialized = false;
    }
    
    /**
     * Initialize the utility
     */
    init() {
        if (this.initialized) {
            return;
        }
        
        this.bindEvents();
        this.initialized = true;
    }
    
    /**
     * Bind event listeners - should be overridden by child classes
     */
    bindEvents() {
        // Override in child classes
    }
    
    /**
     * Initialize utility for a specific element
     * @param {HTMLElement} element - Element to initialize
     */
    initializeElement(element) {
        // Override in child classes if needed for dynamic content
    }
    
    /**
     * Find elements by selector within a container
     * @param {string} selector - CSS selector
     * @param {HTMLElement} container - Container element
     * @returns {NodeList} Matching elements
     */
    findElements(selector, container = document) {
        return container.querySelectorAll(selector);
    }
    
    /**
     * Add event listener with automatic cleanup
     * @param {HTMLElement} element - Target element
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     * @param {Object} options - Event options
     */
    addEventListener(element, event, handler, options = {}) {
        element.addEventListener(event, handler, options);
        
        // Store for potential cleanup
        if (!this.eventListeners) {
            this.eventListeners = [];
        }
        this.eventListeners.push({ element, event, handler, options });
    }
    
    /**
     * Clean up event listeners
     */
    cleanup() {
        if (this.eventListeners) {
            this.eventListeners.forEach(({ element, event, handler, options }) => {
                element.removeEventListener(event, handler, options);
            });
            this.eventListeners = [];
        }
    }
}

// Create global instance
const KL = new KingsLibrary();

// Auto-initialize if jQuery is available (backward compatibility)
if (typeof $ !== 'undefined') {
    $(document).ready(() => {
        if (!KL.isInitialized) {
            KL.init();
        }
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KingsLibrary, BaseUtility };
}

// Global exposure
window.KingsLibrary = KingsLibrary;
window.BaseUtility = BaseUtility;
window.KL = KL;