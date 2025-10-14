/**
 * Form Utility - Handles AJAX form submissions with automatic validation
 * Supports CSS classes: .ajax-form, .validate-form, .validate-field
 */

class FormUtility extends BaseUtility {
    constructor(kingsLibrary) {
        super(kingsLibrary);
        
        this.activeRequests = new Map();
        this.validationRules = new Map();
    }
    
    bindEvents() {
        // Handle AJAX form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.matches('.ajax-form')) {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });
        
        // Handle real-time validation
        document.addEventListener('input', (e) => {
            if (e.target.matches('.validate-field')) {
                this.validateField(e.target);
            }
        });
        
        // Handle form reset
        document.addEventListener('reset', (e) => {
            if (e.target.matches('.ajax-form, .validate-form')) {
                this.clearValidation(e.target);
            }
        });
    }
    
    /**
     * Handle AJAX form submission
     * @param {HTMLFormElement} form - Form element
     */
    async handleFormSubmit(form) {
        // Prevent duplicate submissions
        if (this.activeRequests.has(form)) {
            return;
        }
        
        try {
            // Validate form if it has validation classes
            if (form.classList.contains('validate-form') && !this.validateForm(form)) {
                return;
            }
            
            // Set loading state
            this.setFormLoading(form, true);
            
            // Get form configuration
            const config = this.getFormConfig(form);
            
            // Prepare form data
            const formData = new FormData(form);
            
            // Make request
            this.activeRequests.set(form, true);
            
            const response = await this.kl.request({
                url: config.action,
                method: config.method,
                body: config.method === 'GET' ? undefined : formData,
                headers: config.method === 'GET' ? {} : undefined
            });
            
            // Handle successful response
            this.handleFormSuccess(form, response, config);
            
        } catch (error) {
            // Handle error response
            this.handleFormError(form, error, this.getFormConfig(form));
        } finally {
            // Clean up
            this.setFormLoading(form, false);
            this.activeRequests.delete(form);
        }
    }
    
    /**
     * Get form configuration from data attributes
     * @param {HTMLFormElement} form - Form element
     * @returns {Object} Form configuration
     */
    getFormConfig(form) {
        return {
            action: form.dataset.action || form.action || '#',
            method: (form.dataset.method || form.method || 'POST').toUpperCase(),
            successMessage: form.dataset.successMessage || 'Operation completed successfully!',
            errorMessage: form.dataset.errorMessage || 'An error occurred. Please try again.',
            redirect: form.dataset.redirect || null,
            resetOnSuccess: form.dataset.resetOnSuccess !== 'false',
            showSuccessMessage: form.dataset.showSuccessMessage !== 'false'
        };
    }
    
    /**
     * Set form loading state
     * @param {HTMLFormElement} form - Form element
     * @param {boolean} loading - Loading state
     */
    setFormLoading(form, loading) {
        const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
        
        if (loading) {
            form.classList.add('form-loading');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.dataset.originalText = submitButton.textContent;
                submitButton.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            }
        } else {
            form.classList.remove('form-loading');
            if (submitButton) {
                submitButton.disabled = false;
                if (submitButton.dataset.originalText) {
                    submitButton.textContent = submitButton.dataset.originalText;
                    delete submitButton.dataset.originalText;
                }
            }
        }
    }
    
    /**
     * Handle successful form submission
     * @param {HTMLFormElement} form - Form element
     * @param {Object} response - API response
     * @param {Object} config - Form configuration
     */
    handleFormSuccess(form, response, config) {
        // Show success message
        if (config.showSuccessMessage && response.message) {
            this.kl.success(response.message);
        } else if (config.showSuccessMessage) {
            this.kl.success(config.successMessage);
        }
        
        // Reset form if configured
        if (config.resetOnSuccess) {
            form.reset();
            this.clearValidation(form);
        }
        
        // Redirect if configured
        if (response.redirect || config.redirect) {
            const redirectUrl = response.redirect || config.redirect;
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 1000);
        }
        
        // Trigger custom event
        form.dispatchEvent(new CustomEvent('kingslibrary:form:success', {
            detail: { response, config }
        }));
    }
    
    /**
     * Handle form submission error
     * @param {HTMLFormElement} form - Form element
     * @param {Error} error - Error object
     * @param {Object} config - Form configuration
     */
    handleFormError(form, error, config) {
        let message = config.errorMessage;
        
        // Handle validation errors
        if (error.response && error.response.status === 422) {
            const errors = error.response.data?.errors;
            if (errors) {
                this.displayValidationErrors(form, errors);
                message = 'Please correct the errors below.';
            }
        } else if (error.message) {
            message = error.message;
        }
        
        this.kl.error(message);
        
        // Trigger custom event
        form.dispatchEvent(new CustomEvent('kingslibrary:form:error', {
            detail: { error, config }
        }));
    }
    
    /**
     * Validate entire form
     * @param {HTMLFormElement} form - Form element
     * @returns {boolean} Is form valid
     */
    validateForm(form) {
        const fields = form.querySelectorAll('.validate-field');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    /**
     * Validate individual field
     * @param {HTMLElement} field - Field element
     * @returns {boolean} Is field valid
     */
    validateField(field) {
        const rules = this.getFieldValidationRules(field);
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Required validation
        if (rules.required && !value) {
            isValid = false;
            errorMessage = this.kl.config.validationMessages.required;
        }
        
        // Email validation
        if (isValid && rules.email && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = this.kl.config.validationMessages.email;
            }
        }
        
        // Min length validation
        if (isValid && rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = this.kl.config.validationMessages.minLength
                .replace('{min}', rules.minLength);
        }
        
        // Max length validation
        if (isValid && rules.maxLength && value.length > rules.maxLength) {
            isValid = false;
            errorMessage = this.kl.config.validationMessages.maxLength
                .replace('{max}', rules.maxLength);
        }
        
        // Custom validation
        if (isValid && rules.custom) {
            const customResult = rules.custom(value, field);
            if (customResult !== true) {
                isValid = false;
                errorMessage = typeof customResult === 'string' ? customResult : 'Invalid value';
            }
        }
        
        // Display validation result
        this.displayFieldValidation(field, isValid, errorMessage);
        
        return isValid;
    }
    
    /**
     * Get validation rules for a field
     * @param {HTMLElement} field - Field element
     * @returns {Object} Validation rules
     */
    getFieldValidationRules(field) {
        const rules = {
            required: field.hasAttribute('required'),
            email: field.classList.contains('validate-email') || field.type === 'email',
            minLength: parseInt(field.getAttribute('minlength')) || null,
            maxLength: parseInt(field.getAttribute('maxlength')) || null
        };
        
        // Custom rules from data attributes
        if (field.dataset.validateCustom) {
            const customRuleName = field.dataset.validateCustom;
            rules.custom = this.validationRules.get(customRuleName);
        }
        
        return rules;
    }
    
    /**
     * Display field validation result
     * @param {HTMLElement} field - Field element
     * @param {boolean} isValid - Is field valid
     * @param {string} errorMessage - Error message
     */
    displayFieldValidation(field, isValid, errorMessage = '') {
        // Remove existing validation classes
        field.classList.remove('is-valid', 'is-invalid');
        
        // Add appropriate class
        field.classList.add(isValid ? 'is-valid' : 'is-invalid');
        
        // Handle error message display
        let errorDiv = field.parentNode.querySelector('.invalid-feedback');
        
        if (!isValid && errorMessage) {
            if (!errorDiv) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'invalid-feedback';
                field.parentNode.appendChild(errorDiv);
            }
            errorDiv.textContent = errorMessage;
            errorDiv.style.display = 'block';
        } else if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    }
    
    /**
     * Display validation errors from server response
     * @param {HTMLFormElement} form - Form element
     * @param {Object} errors - Validation errors
     */
    displayValidationErrors(form, errors) {
        Object.keys(errors).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                this.displayFieldValidation(field, false, errors[fieldName][0]);
            }
        });
    }
    
    /**
     * Clear form validation
     * @param {HTMLFormElement} form - Form element
     */
    clearValidation(form) {
        const fields = form.querySelectorAll('.validate-field');
        fields.forEach(field => {
            field.classList.remove('is-valid', 'is-invalid');
            const errorDiv = field.parentNode.querySelector('.invalid-feedback');
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }
        });
    }
    
    /**
     * Register custom validation rule
     * @param {string} name - Rule name
     * @param {Function} validator - Validation function
     */
    addValidationRule(name, validator) {
        this.validationRules.set(name, validator);
    }
    
    /**
     * Legacy support for insert_data function
     * @param {string} url - Target URL
     * @param {string} formId - Form ID
     */
    submitFormLegacy(url, formId) {
        const form = document.getElementById(formId);
        if (!form) {
            console.error(`Form with ID '${formId}' not found`);
            return;
        }
        
        // Set action URL
        form.dataset.action = url;
        
        // Add ajax-form class if not present
        if (!form.classList.contains('ajax-form')) {
            form.classList.add('ajax-form');
        }
        
        // Trigger submission
        this.handleFormSubmit(form);
    }
    
    /**
     * Initialize form utility for dynamic content
     * @param {HTMLElement} element - Element to initialize
     */
    initializeElement(element) {
        // Check if element or its children have ajax-form class
        const forms = element.matches('.ajax-form') ? [element] : element.querySelectorAll('.ajax-form');
        
        forms.forEach(form => {
            // Ensure form is properly set up
            if (!form.dataset.initialized) {
                form.dataset.initialized = 'true';
                // Additional setup if needed
            }
        });
    }
}

// Auto-register if KingsLibrary is available
if (typeof window !== 'undefined' && window.KL) {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof FormUtility !== 'undefined') {
            window.KL.registerUtility('form', FormUtility);
        }
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormUtility;
}

// Global exposure
window.FormUtility = FormUtility;