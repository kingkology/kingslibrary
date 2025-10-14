/**
 * Password Utility - Handles password strength validation and matching
 * Supports CSS classes: .password-strength__input, .toggle-password
 */

class PasswordUtility extends BaseUtility {
    constructor(kingsLibrary) {
        super(kingsLibrary);
        
        this.strengthConfig = {
            minLength: 8,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecialChars: false,
            strengthLevels: {
                weak: { score: 0, color: '#dc3545', text: 'Weak' },
                fair: { score: 1, color: '#fd7e14', text: 'Fair' },
                good: { score: 2, color: '#ffc107', text: 'Good' },
                strong: { score: 3, color: '#20c997', text: 'Strong' },
                excellent: { score: 4, color: '#28a745', text: 'Excellent' }
            }
        };
    }
    
    bindEvents() {
        // Handle password strength checking
        document.addEventListener('input', (e) => {
            if (e.target.matches('.password-strength__input')) {
                this.checkPasswordStrength(e.target);
            }
            
            if (e.target.matches('.password_input, .confirm_password_input')) {
                this.checkPasswordMatch();
            }
        });
        
        // Handle password visibility toggle
        document.addEventListener('click', (e) => {
            if (e.target.matches('.toggle-password') || e.target.closest('.toggle-password')) {
                e.preventDefault();
                const button = e.target.closest('.toggle-password');
                this.togglePasswordVisibility(button);
            }
        });
    }
    
    /**
     * Check password strength and update visual indicators
     * @param {HTMLInputElement} passwordInput - Password input element
     */
    checkPasswordStrength(passwordInput) {
        const password = passwordInput.value;
        const strength = this.calculatePasswordStrength(password);
        
        // Find associated elements
        const container = passwordInput.closest('.password-strength') || 
                         passwordInput.closest('.form-group') ||
                         passwordInput.parentNode;
        
        const strengthBar = container.querySelector('.password-strength__bar');
        const strengthText = container.querySelector('.password-strength__text');
        const strengthBlock = container.querySelector('.password-strength__bar-block');
        
        // Update strength bar
        if (strengthBar) {
            const level = this.getStrengthLevel(strength.score);
            
            // Update bar width and color
            strengthBar.style.width = `${(strength.score + 1) * 20}%`;
            strengthBar.style.backgroundColor = level.color;
            
            // Show/hide the bar block
            if (strengthBlock) {
                strengthBlock.style.display = password ? 'block' : 'none';
            }
        }
        
        // Update strength text
        if (strengthText) {
            if (password) {
                const level = this.getStrengthLevel(strength.score);
                strengthText.textContent = `${level.text} (${strength.score + 1}/5)`;
                strengthText.style.color = level.color;
                strengthText.style.display = 'block';
            } else {
                strengthText.style.display = 'none';
            }
        }
        
        // Add validation feedback
        this.updatePasswordValidation(passwordInput, strength);
        
        // Trigger custom event
        passwordInput.dispatchEvent(new CustomEvent('kingslibrary:password:strength', {
            detail: { strength, level: this.getStrengthLevel(strength.score) }
        }));
    }
    
    /**
     * Calculate password strength score
     * @param {string} password - Password to evaluate
     * @returns {Object} Strength analysis
     */
    calculatePasswordStrength(password) {
        const analysis = {
            score: 0,
            feedback: [],
            criteria: {
                length: password.length >= this.strengthConfig.minLength,
                uppercase: /[A-Z]/.test(password),
                lowercase: /[a-z]/.test(password),
                numbers: /[0-9]/.test(password),
                specialChars: /[^A-Za-z0-9]/.test(password),
                noCommonPatterns: !this.hasCommonPatterns(password)
            }
        };
        
        // Length check
        if (analysis.criteria.length) {
            analysis.score += 1;
        } else {
            analysis.feedback.push(`At least ${this.strengthConfig.minLength} characters`);
        }
        
        // Character variety
        if (analysis.criteria.uppercase) analysis.score += 0.5;
        else if (this.strengthConfig.requireUppercase) analysis.feedback.push('Include uppercase letters');
        
        if (analysis.criteria.lowercase) analysis.score += 0.5;
        else if (this.strengthConfig.requireLowercase) analysis.feedback.push('Include lowercase letters');
        
        if (analysis.criteria.numbers) analysis.score += 1;
        else analysis.feedback.push('Include numbers');
        
        if (analysis.criteria.specialChars) analysis.score += 1;
        else if (this.strengthConfig.requireSpecialChars) analysis.feedback.push('Include special characters');
        
        // Pattern analysis
        if (analysis.criteria.noCommonPatterns) {
            analysis.score += 1;
        } else {
            analysis.feedback.push('Avoid common patterns');
        }
        
        // Cap score at 4 (excellent)
        analysis.score = Math.min(Math.floor(analysis.score), 4);
        
        return analysis;
    }
    
    /**
     * Check for common password patterns
     * @param {string} password - Password to check
     * @returns {boolean} Has common patterns
     */
    hasCommonPatterns(password) {
        const commonPatterns = [
            /123456/,
            /password/i,
            /qwerty/i,
            /abc123/i,
            /(.)\1{2,}/, // Repeated characters
            /012345/,
            /987654/
        ];
        
        return commonPatterns.some(pattern => pattern.test(password));
    }
    
    /**
     * Get strength level configuration
     * @param {number} score - Strength score
     * @returns {Object} Strength level
     */
    getStrengthLevel(score) {
        const levels = Object.values(this.strengthConfig.strengthLevels);
        return levels.find(level => level.score === score) || levels[0];
    }
    
    /**
     * Update password validation display
     * @param {HTMLInputElement} passwordInput - Password input
     * @param {Object} strength - Strength analysis
     */
    updatePasswordValidation(passwordInput, strength) {
        // Remove existing validation classes
        passwordInput.classList.remove('is-valid', 'is-invalid');
        
        // Determine if password meets minimum requirements
        const meetsRequirements = strength.score >= 2; // At least "good"
        
        // Add appropriate validation class
        if (passwordInput.value) {
            passwordInput.classList.add(meetsRequirements ? 'is-valid' : 'is-invalid');
        }
        
        // Show feedback if configured
        if (strength.feedback.length > 0 && passwordInput.value) {
            let feedbackDiv = passwordInput.parentNode.querySelector('.password-feedback');
            
            if (!feedbackDiv) {
                feedbackDiv = document.createElement('div');
                feedbackDiv.className = 'password-feedback invalid-feedback';
                passwordInput.parentNode.appendChild(feedbackDiv);
            }
            
            feedbackDiv.innerHTML = strength.feedback.map(item => `• ${item}`).join('<br>');
            feedbackDiv.style.display = 'block';
        }
    }
    
    /**
     * Toggle password visibility
     * @param {HTMLElement} toggleButton - Toggle button element
     */
    togglePasswordVisibility(toggleButton) {
        const target = toggleButton.dataset.target;
        let passwordInput;
        
        if (target) {
            // Find target by selector
            passwordInput = document.querySelector(target);
        } else {
            // Find nearest password input
            passwordInput = toggleButton.parentNode.querySelector('input[type="password"], input[type="text"]');
        }
        
        if (!passwordInput) return;
        
        // Toggle input type
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        
        // Update button icon/text
        const icon = toggleButton.querySelector('i');
        if (icon) {
            if (isPassword) {
                icon.className = icon.className.replace('fa-eye', 'fa-eye-slash');
            } else {
                icon.className = icon.className.replace('fa-eye-slash', 'fa-eye');
            }
        } else {
            toggleButton.textContent = isPassword ? '🙈' : '👁️';
        }
        
        // Update accessibility
        toggleButton.setAttribute('aria-label', 
            isPassword ? 'Hide password' : 'Show password');
    }
    
    /**
     * Check password matching (legacy support)
     */
    checkPasswordMatch() {
        const passwordInput = document.querySelector('.password_input');
        const confirmInput = document.querySelector('.confirm_password_input');
        const messageElement = document.querySelector('.password_message');
        
        if (!passwordInput || !confirmInput) return;
        
        const password = passwordInput.value;
        const confirm = confirmInput.value;
        
        if (confirm === '') {
            // Clear message if confirm field is empty
            if (messageElement) {
                messageElement.textContent = '';
                messageElement.className = 'password_message';
            }
            confirmInput.classList.remove('is-valid', 'is-invalid');
            return;
        }
        
        const matches = password === confirm;
        
        // Update message
        if (messageElement) {
            if (matches) {
                messageElement.textContent = 'Passwords match ✓';
                messageElement.className = 'password_message text-success';
            } else {
                messageElement.textContent = 'Passwords do not match ✗';
                messageElement.className = 'password_message text-danger';
            }
        }
        
        // Update validation classes
        confirmInput.classList.remove('is-valid', 'is-invalid');
        confirmInput.classList.add(matches ? 'is-valid' : 'is-invalid');
        
        return matches;
    }
    
    /**
     * Legacy support for checknewpass function
     * @param {string} pass1Id - First password field ID
     * @param {string} pass2Id - Second password field ID  
     * @param {string} messageId - Message element ID
     */
    checkPasswordMatchLegacy(pass1Id, pass2Id, messageId) {
        const pass1 = document.getElementById(pass1Id);
        const pass2 = document.getElementById(pass2Id);
        const messageEl = document.getElementById(messageId);
        
        if (!pass1 || !pass2) return false;
        
        const password1 = pass1.value;
        const password2 = pass2.value;
        
        if (password2 === '') {
            if (messageEl) messageEl.textContent = '';
            return true;
        }
        
        const matches = password1 === password2;
        
        if (messageEl) {
            if (matches) {
                messageEl.textContent = 'Passwords match ✓';
                messageEl.style.color = 'green';
            } else {
                messageEl.textContent = 'Passwords do not match ✗';
                messageEl.style.color = 'red';
            }
        }
        
        return matches;
    }
    
    /**
     * Initialize password utilities for dynamic content
     * @param {HTMLElement} element - Element to initialize
     */
    initializeElement(element) {
        // Initialize password strength for new elements
        const strengthInputs = element.matches('.password-strength__input') ? 
                              [element] : element.querySelectorAll('.password-strength__input');
        
        strengthInputs.forEach(input => {
            if (!input.dataset.strengthInitialized) {
                input.dataset.strengthInitialized = 'true';
                // Set up initial state
                if (input.value) {
                    this.checkPasswordStrength(input);
                }
            }
        });
        
        // Initialize toggle buttons
        const toggleButtons = element.matches('.toggle-password') ? 
                             [element] : element.querySelectorAll('.toggle-password');
        
        toggleButtons.forEach(button => {
            if (!button.dataset.toggleInitialized) {
                button.dataset.toggleInitialized = 'true';
                button.setAttribute('role', 'button');
                button.setAttribute('tabindex', '0');
                button.setAttribute('aria-label', 'Show password');
            }
        });
    }
    
    /**
     * Configure password strength requirements
     * @param {Object} config - Strength configuration
     */
    configureStrength(config) {
        this.strengthConfig = { ...this.strengthConfig, ...config };
    }
}

// Setup legacy support
if (typeof window !== 'undefined') {
    window.checknewpass = function(pass1Id, pass2Id, messageId) {
        if (window.KL && window.KL.getUtility) {
            const utility = window.KL.getUtility('password');
            if (utility && utility.checkPasswordMatchLegacy) {
                return utility.checkPasswordMatchLegacy(pass1Id, pass2Id, messageId);
            }
        }
        return false;
    };
}

// Auto-register if KingsLibrary is available
if (typeof window !== 'undefined' && window.KL) {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof PasswordUtility !== 'undefined') {
            window.KL.registerUtility('password', PasswordUtility);
        }
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PasswordUtility;
}

// Global exposure
window.PasswordUtility = PasswordUtility;