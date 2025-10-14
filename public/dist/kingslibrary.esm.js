/**
 * KingsLibrary Core - Event-driven JavaScript utility library
 * Provides CSS class-based auto-binding for seamless front-end to back-end communications
 * 
 * @version 3.0.0
 * @author KingsLibrary Team
 * @license MIT
 */
class y {
  constructor() {
    this.config = {
      apiBaseUrl: "/api",
      csrfToken: null,
      debug: !1,
      notifications: {
        position: "top-right",
        duration: 4e3
      },
      validationMessages: {
        required: "This field is required",
        email: "Please enter a valid email",
        minLength: "Minimum length is {min} characters",
        maxLength: "Maximum length is {max} characters",
        passwordMatch: "Passwords do not match"
      }
    }, this.utilities = /* @__PURE__ */ new Map(), this.isInitialized = !1, this.eventHandlers = /* @__PURE__ */ new Map(), this.setupLegacySupport();
  }
  /**
   * Initialize KingsLibrary with configuration
   * @param {Object} options - Configuration options
   */
  init(s = {}) {
    if (this.isInitialized)
      return console.warn("KingsLibrary is already initialized"), this;
    if (this.config = { ...this.config, ...s }, !this.config.csrfToken) {
      const e = document.querySelector('meta[name="csrf-token"]');
      e && (this.config.csrfToken = e.getAttribute("content"));
    }
    return document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => this.initializeUtilities()) : this.initializeUtilities(), this.isInitialized = !0, this.log("KingsLibrary initialized successfully"), this;
  }
  /**
   * Register a utility class
   * @param {string} name - Utility name
   * @param {Function} UtilityClass - Utility class constructor
   */
  registerUtility(s, e) {
    if (this.utilities.has(s)) {
      console.warn(`Utility '${s}' is already registered`);
      return;
    }
    this.utilities.set(s, new e(this)), this.log(`Registered utility: ${s}`);
  }
  /**
   * Initialize all registered utilities
   */
  initializeUtilities() {
    typeof FormUtility < "u" && this.registerUtility("form", FormUtility), typeof PasswordUtility < "u" && this.registerUtility("password", PasswordUtility), typeof TableUtility < "u" && this.registerUtility("table", TableUtility), typeof MediaUtility < "u" && this.registerUtility("media", MediaUtility), typeof NotificationUtility < "u" && this.registerUtility("notification", NotificationUtility), this.utilities.forEach((s, e) => {
      try {
        s.init(), this.log(`Initialized utility: ${e}`);
      } catch (t) {
        console.error(`Failed to initialize utility '${e}':`, t);
      }
    }), this.setupGlobalEvents();
  }
  /**
   * Setup global event listeners for dynamic content
   */
  setupGlobalEvents() {
    new MutationObserver((e) => {
      e.forEach((t) => {
        t.type === "childList" && t.addedNodes.length > 0 && t.addedNodes.forEach((i) => {
          i.nodeType === Node.ELEMENT_NODE && this.initializeElement(i);
        });
      });
    }).observe(document.body, {
      childList: !0,
      subtree: !0
    });
  }
  /**
   * Initialize utilities for a specific element
   * @param {HTMLElement} element - Element to initialize
   */
  initializeElement(s) {
    this.utilities.forEach((e) => {
      typeof e.initializeElement == "function" && e.initializeElement(s);
    });
  }
  /**
   * Get utility instance by name
   * @param {string} name - Utility name
   * @returns {Object|null} Utility instance
   */
  getUtility(s) {
    return this.utilities.get(s) || null;
  }
  /**
   * Make AJAX request with automatic CSRF handling
   * @param {Object} options - Request options
   * @returns {Promise} Request promise
   */
  async request(s) {
    const e = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      ...s
    };
    this.config.csrfToken && e.method !== "GET" && (e.headers["X-CSRF-TOKEN"] = this.config.csrfToken), e.url && !e.url.startsWith("http") && (e.url = this.config.apiBaseUrl + e.url);
    try {
      const t = await fetch(e.url, e), i = await t.json();
      if (!t.ok)
        throw new Error(i.message || `HTTP error! status: ${t.status}`);
      return i;
    } catch (t) {
      throw this.log("Request failed:", t), t;
    }
  }
  /**
   * Show success notification
   * @param {string} message - Success message
   * @param {Object} options - Notification options
   */
  success(s, e = {}) {
    this.notify("success", s, e);
  }
  /**
   * Show error notification
   * @param {string} message - Error message
   * @param {Object} options - Notification options
   */
  error(s, e = {}) {
    this.notify("error", s, e);
  }
  /**
   * Show info notification
   * @param {string} message - Info message
   * @param {Object} options - Notification options
   */
  info(s, e = {}) {
    this.notify("info", s, e);
  }
  /**
   * Show notification using available library
   * @param {string} type - Notification type
   * @param {string} message - Message to show
   * @param {Object} options - Additional options
   */
  notify(s, e, t = {}) {
    if (typeof Swal < "u") {
      const i = {
        icon: s === "error" ? "error" : s === "success" ? "success" : "info",
        title: e,
        toast: !0,
        position: this.config.notifications.position,
        showConfirmButton: !1,
        timer: t.duration || this.config.notifications.duration,
        timerProgressBar: !0,
        ...t
      };
      Swal.fire(i);
      return;
    }
    alert(`[${s.toUpperCase()}] ${e}`);
  }
  /**
   * Setup backward compatibility for legacy functions
   */
  setupLegacySupport() {
    window.KingsLibraryLegacy = {}, window.insert_data = (s, e) => {
      const t = this.getUtility("form");
      if (t && t.submitFormLegacy)
        return t.submitFormLegacy(s, e);
    }, window.call_pagelet = (s, e) => this.request({
      url: s,
      method: "GET"
    }).then((t) => {
      const i = document.getElementById(e);
      i && t.html && (i.innerHTML = t.html);
    }).catch((t) => {
      console.error("Pagelet load failed:", t);
    }), window.checknewpass = (s, e, t) => {
      const i = this.getUtility("password");
      if (i && i.checkPasswordMatch)
        return i.checkPasswordMatch(s, e, t);
    }, window.ExportToExcel = (s) => {
      const e = this.getUtility("table");
      if (e && e.exportToExcel)
        return e.exportToExcel(s);
    }, window.Toastz = (s, e, t) => {
      this.notify(s, `${e}: ${t}`);
    };
  }
  /**
   * Debug logging
   * @param {...any} args - Arguments to log
   */
  log(...s) {
    this.config.debug && console.log("[KingsLibrary]", ...s);
  }
}
let L = class {
  constructor(s) {
    this.kl = s, this.initialized = !1;
  }
  /**
   * Initialize the utility
   */
  init() {
    this.initialized || (this.bindEvents(), this.initialized = !0);
  }
  /**
   * Bind event listeners - should be overridden by child classes
   */
  bindEvents() {
  }
  /**
   * Initialize utility for a specific element
   * @param {HTMLElement} element - Element to initialize
   */
  initializeElement(s) {
  }
  /**
   * Find elements by selector within a container
   * @param {string} selector - CSS selector
   * @param {HTMLElement} container - Container element
   * @returns {NodeList} Matching elements
   */
  findElements(s, e = document) {
    return e.querySelectorAll(s);
  }
  /**
   * Add event listener with automatic cleanup
   * @param {HTMLElement} element - Target element
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   * @param {Object} options - Event options
   */
  addEventListener(s, e, t, i = {}) {
    s.addEventListener(e, t, i), this.eventListeners || (this.eventListeners = []), this.eventListeners.push({ element: s, event: e, handler: t, options: i });
  }
  /**
   * Clean up event listeners
   */
  cleanup() {
    this.eventListeners && (this.eventListeners.forEach(({ element: s, event: e, handler: t, options: i }) => {
      s.removeEventListener(e, t, i);
    }), this.eventListeners = []);
  }
};
const v = new y();
typeof $ < "u" && $(document).ready(() => {
  v.isInitialized || v.init();
});
typeof module < "u" && module.exports && (module.exports = { KingsLibrary: y, BaseUtility: L });
window.KingsLibrary = y;
window.BaseUtility = L;
window.KL = v;
let h = class extends BaseUtility {
  constructor(s) {
    super(s), this.activeRequests = /* @__PURE__ */ new Map(), this.validationRules = /* @__PURE__ */ new Map();
  }
  bindEvents() {
    document.addEventListener("submit", (s) => {
      s.target.matches(".ajax-form") && (s.preventDefault(), this.handleFormSubmit(s.target));
    }), document.addEventListener("input", (s) => {
      s.target.matches(".validate-field") && this.validateField(s.target);
    }), document.addEventListener("reset", (s) => {
      s.target.matches(".ajax-form, .validate-form") && this.clearValidation(s.target);
    });
  }
  /**
   * Handle AJAX form submission
   * @param {HTMLFormElement} form - Form element
   */
  async handleFormSubmit(s) {
    if (!this.activeRequests.has(s))
      try {
        if (s.classList.contains("validate-form") && !this.validateForm(s))
          return;
        this.setFormLoading(s, !0);
        const e = this.getFormConfig(s), t = new FormData(s);
        this.activeRequests.set(s, !0);
        const i = await this.kl.request({
          url: e.action,
          method: e.method,
          body: e.method === "GET" ? void 0 : t,
          headers: e.method === "GET" ? {} : void 0
        });
        this.handleFormSuccess(s, i, e);
      } catch (e) {
        this.handleFormError(s, e, this.getFormConfig(s));
      } finally {
        this.setFormLoading(s, !1), this.activeRequests.delete(s);
      }
  }
  /**
   * Get form configuration from data attributes
   * @param {HTMLFormElement} form - Form element
   * @returns {Object} Form configuration
   */
  getFormConfig(s) {
    return {
      action: s.dataset.action || s.action || "#",
      method: (s.dataset.method || s.method || "POST").toUpperCase(),
      successMessage: s.dataset.successMessage || "Operation completed successfully!",
      errorMessage: s.dataset.errorMessage || "An error occurred. Please try again.",
      redirect: s.dataset.redirect || null,
      resetOnSuccess: s.dataset.resetOnSuccess !== "false",
      showSuccessMessage: s.dataset.showSuccessMessage !== "false"
    };
  }
  /**
   * Set form loading state
   * @param {HTMLFormElement} form - Form element
   * @param {boolean} loading - Loading state
   */
  setFormLoading(s, e) {
    const t = s.querySelector('button[type="submit"], input[type="submit"]');
    e ? (s.classList.add("form-loading"), t && (t.disabled = !0, t.dataset.originalText = t.textContent, t.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...')) : (s.classList.remove("form-loading"), t && (t.disabled = !1, t.dataset.originalText && (t.textContent = t.dataset.originalText, delete t.dataset.originalText)));
  }
  /**
   * Handle successful form submission
   * @param {HTMLFormElement} form - Form element
   * @param {Object} response - API response
   * @param {Object} config - Form configuration
   */
  handleFormSuccess(s, e, t) {
    if (t.showSuccessMessage && e.message ? this.kl.success(e.message) : t.showSuccessMessage && this.kl.success(t.successMessage), t.resetOnSuccess && (s.reset(), this.clearValidation(s)), e.redirect || t.redirect) {
      const i = e.redirect || t.redirect;
      setTimeout(() => {
        window.location.href = i;
      }, 1e3);
    }
    s.dispatchEvent(new CustomEvent("kingslibrary:form:success", {
      detail: { response: e, config: t }
    }));
  }
  /**
   * Handle form submission error
   * @param {HTMLFormElement} form - Form element
   * @param {Error} error - Error object
   * @param {Object} config - Form configuration
   */
  handleFormError(s, e, t) {
    var a;
    let i = t.errorMessage;
    if (e.response && e.response.status === 422) {
      const r = (a = e.response.data) == null ? void 0 : a.errors;
      r && (this.displayValidationErrors(s, r), i = "Please correct the errors below.");
    } else
      e.message && (i = e.message);
    this.kl.error(i), s.dispatchEvent(new CustomEvent("kingslibrary:form:error", {
      detail: { error: e, config: t }
    }));
  }
  /**
   * Validate entire form
   * @param {HTMLFormElement} form - Form element
   * @returns {boolean} Is form valid
   */
  validateForm(s) {
    const e = s.querySelectorAll(".validate-field");
    let t = !0;
    return e.forEach((i) => {
      this.validateField(i) || (t = !1);
    }), t;
  }
  /**
   * Validate individual field
   * @param {HTMLElement} field - Field element
   * @returns {boolean} Is field valid
   */
  validateField(s) {
    const e = this.getFieldValidationRules(s), t = s.value.trim();
    let i = !0, a = "";
    if (e.required && !t && (i = !1, a = this.kl.config.validationMessages.required), i && e.email && t && (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t) || (i = !1, a = this.kl.config.validationMessages.email)), i && e.minLength && t.length < e.minLength && (i = !1, a = this.kl.config.validationMessages.minLength.replace("{min}", e.minLength)), i && e.maxLength && t.length > e.maxLength && (i = !1, a = this.kl.config.validationMessages.maxLength.replace("{max}", e.maxLength)), i && e.custom) {
      const r = e.custom(t, s);
      r !== !0 && (i = !1, a = typeof r == "string" ? r : "Invalid value");
    }
    return this.displayFieldValidation(s, i, a), i;
  }
  /**
   * Get validation rules for a field
   * @param {HTMLElement} field - Field element
   * @returns {Object} Validation rules
   */
  getFieldValidationRules(s) {
    const e = {
      required: s.hasAttribute("required"),
      email: s.classList.contains("validate-email") || s.type === "email",
      minLength: parseInt(s.getAttribute("minlength")) || null,
      maxLength: parseInt(s.getAttribute("maxlength")) || null
    };
    if (s.dataset.validateCustom) {
      const t = s.dataset.validateCustom;
      e.custom = this.validationRules.get(t);
    }
    return e;
  }
  /**
   * Display field validation result
   * @param {HTMLElement} field - Field element
   * @param {boolean} isValid - Is field valid
   * @param {string} errorMessage - Error message
   */
  displayFieldValidation(s, e, t = "") {
    s.classList.remove("is-valid", "is-invalid"), s.classList.add(e ? "is-valid" : "is-invalid");
    let i = s.parentNode.querySelector(".invalid-feedback");
    !e && t ? (i || (i = document.createElement("div"), i.className = "invalid-feedback", s.parentNode.appendChild(i)), i.textContent = t, i.style.display = "block") : i && (i.style.display = "none");
  }
  /**
   * Display validation errors from server response
   * @param {HTMLFormElement} form - Form element
   * @param {Object} errors - Validation errors
   */
  displayValidationErrors(s, e) {
    Object.keys(e).forEach((t) => {
      const i = s.querySelector(`[name="${t}"]`);
      i && this.displayFieldValidation(i, !1, e[t][0]);
    });
  }
  /**
   * Clear form validation
   * @param {HTMLFormElement} form - Form element
   */
  clearValidation(s) {
    s.querySelectorAll(".validate-field").forEach((t) => {
      t.classList.remove("is-valid", "is-invalid");
      const i = t.parentNode.querySelector(".invalid-feedback");
      i && (i.style.display = "none");
    });
  }
  /**
   * Register custom validation rule
   * @param {string} name - Rule name
   * @param {Function} validator - Validation function
   */
  addValidationRule(s, e) {
    this.validationRules.set(s, e);
  }
  /**
   * Legacy support for insert_data function
   * @param {string} url - Target URL
   * @param {string} formId - Form ID
   */
  submitFormLegacy(s, e) {
    const t = document.getElementById(e);
    if (!t) {
      console.error(`Form with ID '${e}' not found`);
      return;
    }
    t.dataset.action = s, t.classList.contains("ajax-form") || t.classList.add("ajax-form"), this.handleFormSubmit(t);
  }
  /**
   * Initialize form utility for dynamic content
   * @param {HTMLElement} element - Element to initialize
   */
  initializeElement(s) {
    (s.matches(".ajax-form") ? [s] : s.querySelectorAll(".ajax-form")).forEach((t) => {
      t.dataset.initialized || (t.dataset.initialized = "true");
    });
  }
};
typeof window < "u" && window.KL && document.addEventListener("DOMContentLoaded", () => {
  typeof h < "u" && window.KL.registerUtility("form", h);
});
typeof module < "u" && module.exports && (module.exports = h);
window.FormUtility = h;
let g = class extends BaseUtility {
  constructor(s) {
    super(s), this.strengthConfig = {
      minLength: 8,
      requireUppercase: !0,
      requireLowercase: !0,
      requireNumbers: !0,
      requireSpecialChars: !1,
      strengthLevels: {
        weak: { score: 0, color: "#dc3545", text: "Weak" },
        fair: { score: 1, color: "#fd7e14", text: "Fair" },
        good: { score: 2, color: "#ffc107", text: "Good" },
        strong: { score: 3, color: "#20c997", text: "Strong" },
        excellent: { score: 4, color: "#28a745", text: "Excellent" }
      }
    };
  }
  bindEvents() {
    document.addEventListener("input", (s) => {
      s.target.matches(".password-strength__input") && this.checkPasswordStrength(s.target), s.target.matches(".password_input, .confirm_password_input") && this.checkPasswordMatch();
    }), document.addEventListener("click", (s) => {
      if (s.target.matches(".toggle-password") || s.target.closest(".toggle-password")) {
        s.preventDefault();
        const e = s.target.closest(".toggle-password");
        this.togglePasswordVisibility(e);
      }
    });
  }
  /**
   * Check password strength and update visual indicators
   * @param {HTMLInputElement} passwordInput - Password input element
   */
  checkPasswordStrength(s) {
    const e = s.value, t = this.calculatePasswordStrength(e), i = s.closest(".password-strength") || s.closest(".form-group") || s.parentNode, a = i.querySelector(".password-strength__bar"), r = i.querySelector(".password-strength__text"), o = i.querySelector(".password-strength__bar-block");
    if (a) {
      const n = this.getStrengthLevel(t.score);
      a.style.width = `${(t.score + 1) * 20}%`, a.style.backgroundColor = n.color, o && (o.style.display = e ? "block" : "none");
    }
    if (r)
      if (e) {
        const n = this.getStrengthLevel(t.score);
        r.textContent = `${n.text} (${t.score + 1}/5)`, r.style.color = n.color, r.style.display = "block";
      } else
        r.style.display = "none";
    this.updatePasswordValidation(s, t), s.dispatchEvent(new CustomEvent("kingslibrary:password:strength", {
      detail: { strength: t, level: this.getStrengthLevel(t.score) }
    }));
  }
  /**
   * Calculate password strength score
   * @param {string} password - Password to evaluate
   * @returns {Object} Strength analysis
   */
  calculatePasswordStrength(s) {
    const e = {
      score: 0,
      feedback: [],
      criteria: {
        length: s.length >= this.strengthConfig.minLength,
        uppercase: /[A-Z]/.test(s),
        lowercase: /[a-z]/.test(s),
        numbers: /[0-9]/.test(s),
        specialChars: /[^A-Za-z0-9]/.test(s),
        noCommonPatterns: !this.hasCommonPatterns(s)
      }
    };
    return e.criteria.length ? e.score += 1 : e.feedback.push(`At least ${this.strengthConfig.minLength} characters`), e.criteria.uppercase ? e.score += 0.5 : this.strengthConfig.requireUppercase && e.feedback.push("Include uppercase letters"), e.criteria.lowercase ? e.score += 0.5 : this.strengthConfig.requireLowercase && e.feedback.push("Include lowercase letters"), e.criteria.numbers ? e.score += 1 : e.feedback.push("Include numbers"), e.criteria.specialChars ? e.score += 1 : this.strengthConfig.requireSpecialChars && e.feedback.push("Include special characters"), e.criteria.noCommonPatterns ? e.score += 1 : e.feedback.push("Avoid common patterns"), e.score = Math.min(Math.floor(e.score), 4), e;
  }
  /**
   * Check for common password patterns
   * @param {string} password - Password to check
   * @returns {boolean} Has common patterns
   */
  hasCommonPatterns(s) {
    return [
      /123456/,
      /password/i,
      /qwerty/i,
      /abc123/i,
      /(.)\1{2,}/,
      // Repeated characters
      /012345/,
      /987654/
    ].some((t) => t.test(s));
  }
  /**
   * Get strength level configuration
   * @param {number} score - Strength score
   * @returns {Object} Strength level
   */
  getStrengthLevel(s) {
    const e = Object.values(this.strengthConfig.strengthLevels);
    return e.find((t) => t.score === s) || e[0];
  }
  /**
   * Update password validation display
   * @param {HTMLInputElement} passwordInput - Password input
   * @param {Object} strength - Strength analysis
   */
  updatePasswordValidation(s, e) {
    s.classList.remove("is-valid", "is-invalid");
    const t = e.score >= 2;
    if (s.value && s.classList.add(t ? "is-valid" : "is-invalid"), e.feedback.length > 0 && s.value) {
      let i = s.parentNode.querySelector(".password-feedback");
      i || (i = document.createElement("div"), i.className = "password-feedback invalid-feedback", s.parentNode.appendChild(i)), i.innerHTML = e.feedback.map((a) => `• ${a}`).join("<br>"), i.style.display = "block";
    }
  }
  /**
   * Toggle password visibility
   * @param {HTMLElement} toggleButton - Toggle button element
   */
  togglePasswordVisibility(s) {
    const e = s.dataset.target;
    let t;
    if (e ? t = document.querySelector(e) : t = s.parentNode.querySelector('input[type="password"], input[type="text"]'), !t)
      return;
    const i = t.type === "password";
    t.type = i ? "text" : "password";
    const a = s.querySelector("i");
    a ? i ? a.className = a.className.replace("fa-eye", "fa-eye-slash") : a.className = a.className.replace("fa-eye-slash", "fa-eye") : s.textContent = i ? "🙈" : "👁️", s.setAttribute(
      "aria-label",
      i ? "Hide password" : "Show password"
    );
  }
  /**
   * Check password matching (legacy support)
   */
  checkPasswordMatch() {
    const s = document.querySelector(".password_input"), e = document.querySelector(".confirm_password_input"), t = document.querySelector(".password_message");
    if (!s || !e)
      return;
    const i = s.value, a = e.value;
    if (a === "") {
      t && (t.textContent = "", t.className = "password_message"), e.classList.remove("is-valid", "is-invalid");
      return;
    }
    const r = i === a;
    return t && (r ? (t.textContent = "Passwords match ✓", t.className = "password_message text-success") : (t.textContent = "Passwords do not match ✗", t.className = "password_message text-danger")), e.classList.remove("is-valid", "is-invalid"), e.classList.add(r ? "is-valid" : "is-invalid"), r;
  }
  /**
   * Legacy support for checknewpass function
   * @param {string} pass1Id - First password field ID
   * @param {string} pass2Id - Second password field ID  
   * @param {string} messageId - Message element ID
   */
  checkPasswordMatchLegacy(s, e, t) {
    const i = document.getElementById(s), a = document.getElementById(e), r = document.getElementById(t);
    if (!i || !a)
      return !1;
    const o = i.value, n = a.value;
    if (n === "")
      return r && (r.textContent = ""), !0;
    const c = o === n;
    return r && (c ? (r.textContent = "Passwords match ✓", r.style.color = "green") : (r.textContent = "Passwords do not match ✗", r.style.color = "red")), c;
  }
  /**
   * Initialize password utilities for dynamic content
   * @param {HTMLElement} element - Element to initialize
   */
  initializeElement(s) {
    (s.matches(".password-strength__input") ? [s] : s.querySelectorAll(".password-strength__input")).forEach((i) => {
      i.dataset.strengthInitialized || (i.dataset.strengthInitialized = "true", i.value && this.checkPasswordStrength(i));
    }), (s.matches(".toggle-password") ? [s] : s.querySelectorAll(".toggle-password")).forEach((i) => {
      i.dataset.toggleInitialized || (i.dataset.toggleInitialized = "true", i.setAttribute("role", "button"), i.setAttribute("tabindex", "0"), i.setAttribute("aria-label", "Show password"));
    });
  }
  /**
   * Configure password strength requirements
   * @param {Object} config - Strength configuration
   */
  configureStrength(s) {
    this.strengthConfig = { ...this.strengthConfig, ...s };
  }
};
typeof window < "u" && (window.checknewpass = function(l, s, e) {
  if (window.KL && window.KL.getUtility) {
    const t = window.KL.getUtility("password");
    if (t && t.checkPasswordMatchLegacy)
      return t.checkPasswordMatchLegacy(l, s, e);
  }
  return !1;
});
typeof window < "u" && window.KL && document.addEventListener("DOMContentLoaded", () => {
  typeof g < "u" && window.KL.registerUtility("password", g);
});
typeof module < "u" && module.exports && (module.exports = g);
window.PasswordUtility = g;
let f = class extends BaseUtility {
  constructor(s) {
    super(s), this.defaultConfig = {
      // Core features
      paging: !0,
      pageLength: 10,
      searching: !0,
      ordering: !0,
      info: !0,
      lengthChange: !0,
      // Advanced features
      responsive: !0,
      scrollX: !1,
      scrollY: !1,
      fixedHeader: !1,
      fixedColumns: !1,
      // UI options
      lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
      language: {
        search: "Search:",
        lengthMenu: "Show _MENU_ entries",
        info: "Showing _START_ to _END_ of _TOTAL_ entries",
        infoEmpty: "Showing 0 to 0 of 0 entries",
        infoFiltered: "(filtered from _MAX_ total entries)",
        zeroRecords: "No matching records found",
        emptyTable: "No data available in table",
        paginate: {
          first: "First",
          last: "Last",
          next: "Next",
          previous: "Previous"
        }
      },
      // Export buttons (requires DataTables Buttons extension)
      buttons: [
        {
          extend: "excelHtml5",
          text: '<i class="fas fa-file-excel me-1"></i> Excel',
          className: "btn btn-success btn-sm me-1",
          exportOptions: {
            columns: ":visible:not(.no-export)"
          }
        },
        {
          extend: "pdfHtml5",
          text: '<i class="fas fa-file-pdf me-1"></i> PDF',
          className: "btn btn-danger btn-sm me-1",
          exportOptions: {
            columns: ":visible:not(.no-export)"
          },
          customize: function(e) {
            e.defaultStyle.fontSize = 9, e.styles.tableHeader.fontSize = 10, e.content[1].table.widths = Array(e.content[1].table.body[0].length + 1).join("*").split("");
          }
        },
        {
          extend: "csvHtml5",
          text: '<i class="fas fa-file-csv me-1"></i> CSV',
          className: "btn btn-info btn-sm me-1",
          exportOptions: {
            columns: ":visible:not(.no-export)"
          }
        },
        {
          extend: "print",
          text: '<i class="fas fa-print me-1"></i> Print',
          className: "btn btn-secondary btn-sm",
          exportOptions: {
            columns: ":visible:not(.no-export)"
          }
        }
      ],
      // Server-side processing
      serverSide: !1,
      processing: !1,
      ajax: null
    }, this.initializedTables = /* @__PURE__ */ new Map();
  }
  bindEvents() {
    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
      this.initializeTables();
    }) : this.initializeTables(), this.bindAutoInit(), document.addEventListener("click", (s) => {
      if (s.target.matches(".export-excel") || s.target.closest(".export-excel")) {
        s.preventDefault();
        const e = s.target.closest(".export-excel") || s.target;
        this.exportToExcel(e);
      }
      if (s.target.matches(".export-pdf") || s.target.closest(".export-pdf")) {
        s.preventDefault();
        const e = s.target.closest(".export-pdf") || s.target;
        this.exportToPdf(e);
      }
      if (s.target.matches(".export-csv") || s.target.closest(".export-csv")) {
        s.preventDefault();
        const e = s.target.closest(".export-csv") || s.target;
        this.exportToCsv(e);
      }
    });
  }
  /**
   * Bind auto-initialization for new tables
   */
  bindAutoInit() {
    window.MutationObserver && new MutationObserver((e) => {
      e.forEach((t) => {
        t.type === "childList" && t.addedNodes.forEach((i) => {
          if (i.nodeType === 1) {
            const a = i.querySelector ? i : null;
            if (a) {
              if (a.closest('[data-manual-init="true"]'))
                return;
              a.classList && a.classList.contains("datatable-init") && !a.classList.contains("dt-initialized") && this.initializeTable(a), a.querySelectorAll(".datatable-init:not(.dt-initialized)").forEach((n) => {
                n.closest('[data-manual-init="true"]') || this.initializeTable(n);
              });
            }
          }
        });
      });
    }).observe(document.body, {
      childList: !0,
      subtree: !0
    });
  }
  /**
   * Initialize all tables with .datatable-init class
   */
  initializeTables() {
    document.querySelectorAll(".datatable-init").forEach((e) => {
      e.closest('[data-manual-init="true"]') || this.initializeTable(e);
    });
  }
  /**
   * Initialize a specific table with DataTables
   * @param {HTMLTableElement} table - Table element
   */
  initializeTable(s) {
    if (!this.initializedTables.has(s)) {
      if (typeof $ > "u" || !$.fn.DataTable) {
        console.warn("DataTables library not found. Please include it to use table utilities.");
        return;
      }
      try {
        const e = this.buildTableConfig(s), t = $(s).DataTable(e);
        this.initializedTables.set(s, t), this.addExportButtons(s, t), s.dispatchEvent(new CustomEvent("kingslibrary:table:initialized", {
          detail: { dataTable: t, config: e }
        })), this.kl.log(`DataTable initialized for table: ${s.id || "unnamed"}`);
      } catch (e) {
        console.error("Failed to initialize DataTable:", e);
      }
    }
  }
  /**
   * Build DataTable configuration from table data attributes
   * @param {HTMLTableElement} table - Table element
   * @returns {Object} DataTable configuration
   */
  buildTableConfig(s) {
    const e = { ...this.defaultConfig }, t = s.dataset;
    if (t.paging !== void 0 && (e.paging = t.paging === "true"), t.pageLength !== void 0 && (e.pageLength = parseInt(t.pageLength)), t.searching !== void 0 && (e.searching = t.searching === "true"), t.ordering !== void 0 && (e.ordering = t.ordering === "true"), t.info !== void 0 && (e.info = t.info === "true"), t.lengthChange !== void 0 && (e.lengthChange = t.lengthChange === "true"), t.responsive !== void 0 && (e.responsive = t.responsive === "true"), t.scrollX !== void 0 && (e.scrollX = t.scrollX === "true" ? !0 : t.scrollX), t.scrollY !== void 0 && (e.scrollY = t.scrollY === "true" ? !0 : t.scrollY), t.fixedHeader !== void 0 && (e.fixedHeader = t.fixedHeader === "true"), t.fixedColumns !== void 0) {
      const a = t.fixedColumns;
      a === "true" ? e.fixedColumns = !0 : isNaN(a) || (e.fixedColumns = { leftColumns: parseInt(a) });
    }
    if (t.lengthMenu !== void 0)
      try {
        const a = JSON.parse(t.lengthMenu);
        e.lengthMenu = a;
      } catch {
        console.warn("Invalid lengthMenu format, using default");
      }
    if (t.serverSide !== void 0 && (e.serverSide = t.serverSide === "true", e.processing = !0), t.ajaxUrl !== void 0 && (e.ajax = {
      url: t.ajaxUrl,
      type: t.ajaxMethod || "POST",
      data: function(a) {
        return window.KL && window.KL.config.csrfToken && (a._token = window.KL.config.csrfToken), a;
      }
    }), t.columnDefs !== void 0)
      try {
        e.columnDefs = JSON.parse(t.columnDefs);
      } catch {
        console.warn("Invalid columnDefs format, ignoring");
      }
    if (t.order !== void 0)
      try {
        e.order = JSON.parse(t.order);
      } catch {
        console.warn("Invalid order format, using default");
      }
    const i = [];
    return t.exportExcel === "true" && i.push("excel"), t.exportPdf === "true" && i.push("pdf"), t.exportCsv === "true" && i.push("csv"), t.exportPrint === "true" && i.push("print"), i.length > 0 && (e.dom = "Bfrtip", e.buttons = i.map((a) => ({
      extend: a,
      className: "btn btn-sm btn-outline-primary me-1"
    }))), e;
  }
  /**
   * Add export buttons for tables without DataTables Buttons extension
   * @param {HTMLTableElement} table - Table element
   * @param {Object} dataTable - DataTable instance
   */
  addExportButtons(s, e) {
    const t = s.parentNode.querySelector(".table-export-buttons");
    if (t) {
      if (s.dataset.exportExcel === "true") {
        const i = document.createElement("button");
        i.className = "btn btn-sm btn-success export-excel me-1", i.innerHTML = '<i class="fa fa-file-excel-o"></i> Excel', i.dataset.table = `#${s.id}`, t.appendChild(i);
      }
      if (s.dataset.exportCsv === "true") {
        const i = document.createElement("button");
        i.className = "btn btn-sm btn-info export-csv me-1", i.innerHTML = '<i class="fa fa-file-text-o"></i> CSV', i.dataset.table = `#${s.id}`, t.appendChild(i);
      }
      if (s.dataset.exportPdf === "true") {
        const i = document.createElement("button");
        i.className = "btn btn-sm btn-danger export-pdf me-1", i.innerHTML = '<i class="fa fa-file-pdf-o"></i> PDF', i.dataset.table = `#${s.id}`, t.appendChild(i);
      }
    }
  }
  /**
   * Export table to Excel
   * @param {HTMLElement} button - Export button
   */
  exportToExcel(s) {
    var i;
    const e = s.dataset.table, t = e ? document.querySelector(e) : ((i = s.closest(".table-container")) == null ? void 0 : i.querySelector("table")) || s.parentNode.querySelector("table");
    if (!t) {
      console.error("Table not found for Excel export");
      return;
    }
    this.exportTableData(t, "excel");
  }
  /**
   * Export table to CSV
   * @param {HTMLElement} button - Export button
   */
  exportToCsv(s) {
    var i;
    const e = s.dataset.table, t = e ? document.querySelector(e) : ((i = s.closest(".table-container")) == null ? void 0 : i.querySelector("table")) || s.parentNode.querySelector("table");
    if (!t) {
      console.error("Table not found for CSV export");
      return;
    }
    this.exportTableData(t, "csv");
  }
  /**
   * Export table to PDF
   * @param {HTMLElement} button - Export button
   */
  exportToPdf(s) {
    var i;
    const e = s.dataset.table, t = e ? document.querySelector(e) : ((i = s.closest(".table-container")) == null ? void 0 : i.querySelector("table")) || s.parentNode.querySelector("table");
    if (!t) {
      console.error("Table not found for PDF export");
      return;
    }
    this.exportTableData(t, "pdf");
  }
  /**
   * Export table data in specified format
   * @param {HTMLTableElement} table - Table element
   * @param {string} format - Export format (excel, csv, pdf)
   */
  exportTableData(s, e) {
    const t = this.initializedTables.get(s);
    t && t.buttons ? t.button(`.buttons-${e}`).trigger() : this.basicExport(s, e);
  }
  /**
   * Basic export functionality (fallback)
   * @param {HTMLTableElement} table - Table element
   * @param {string} format - Export format
   */
  basicExport(s, e) {
    const t = s.dataset.exportFilename || "table-export";
    switch (e) {
      case "csv":
        this.exportToCsvBasic(s, t);
        break;
      case "excel":
        this.exportToCsvBasic(s, t);
        break;
      default:
        console.warn(`Basic export for format '${e}' not implemented`);
    }
  }
  /**
   * Basic CSV export
   * @param {HTMLTableElement} table - Table element
   * @param {string} filename - File name
   */
  exportToCsvBasic(s, e) {
    const i = Array.from(s.querySelectorAll("tr")).map((n) => Array.from(n.querySelectorAll("th, td")).map((d) => {
      let u = d.textContent.trim();
      return (u.includes(",") || u.includes('"') || u.includes(`
`)) && (u = `"${u.replace(/"/g, '""')}"`), u;
    }).join(",")).join(`
`), a = new Blob([i], { type: "text/csv" }), r = window.URL.createObjectURL(a), o = document.createElement("a");
    o.href = r, o.download = `${e}.csv`, o.click(), window.URL.revokeObjectURL(r);
  }
  /**
   * Get DataTable instance for a table
   * @param {HTMLTableElement} table - Table element
   * @returns {Object|null} DataTable instance
   */
  getDataTable(s) {
    return this.initializedTables.get(s) || null;
  }
  /**
   * Destroy and reinitialize a table
   * @param {HTMLTableElement} table - Table element
   */
  reinitializeTable(s) {
    const e = this.initializedTables.get(s);
    e && (e.destroy(), this.initializedTables.delete(s)), this.initializeTable(s);
  }
  /**
   * Initialize utility for dynamically added elements
   * @param {HTMLElement} element - Element to initialize
   */
  initializeElement(s) {
    (s.matches(".datatable-init") ? [s] : s.querySelectorAll(".datatable-init")).forEach((t) => {
      t.dataset.initialized || (t.dataset.initialized = "true", this.initializeTable(t));
    });
  }
  /**
   * Legacy support for ExportToExcel function
   * @param {string} tableId - Table ID or selector
   */
  exportToExcelLegacy(s) {
    const e = document.querySelector(s.startsWith("#") ? s : `#${s}`);
    e ? this.exportTableData(e, "excel") : console.error(`Table with selector '${s}' not found`);
  }
};
typeof window < "u" && (window.ExportToExcel = function(l) {
  if (window.KL && window.KL.getUtility) {
    const s = window.KL.getUtility("table");
    if (s && s.exportToExcelLegacy)
      return s.exportToExcelLegacy(l);
  }
  console.warn("TableUtility not available");
});
typeof window < "u" && window.KL && document.addEventListener("DOMContentLoaded", () => {
  typeof f < "u" && window.KL.registerUtility("table", f);
});
typeof module < "u" && module.exports && (module.exports = f);
window.TableUtility = f;
let m = class extends BaseUtility {
  constructor(s) {
    super(s), this.uploadConfig = {
      maxFileSize: 10 * 1024 * 1024,
      // 10MB
      allowedTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
      uploadUrl: "/api/upload",
      previewContainer: ".image-preview-container"
    }, this.activeUploads = /* @__PURE__ */ new Map();
  }
  bindEvents() {
    document.addEventListener("change", (s) => {
      s.target.matches(".file-upload") && this.handleFileSelect(s.target);
    }), document.addEventListener("dragover", (s) => {
      (s.target.matches(".file-drop-zone") || s.target.closest(".file-drop-zone")) && (s.preventDefault(), (s.target.closest(".file-drop-zone") || s.target).classList.add("drag-over"));
    }), document.addEventListener("dragleave", (s) => {
      (s.target.matches(".file-drop-zone") || s.target.closest(".file-drop-zone")) && (s.target.closest(".file-drop-zone") || s.target).classList.remove("drag-over");
    }), document.addEventListener("drop", (s) => {
      if (s.target.matches(".file-drop-zone") || s.target.closest(".file-drop-zone")) {
        s.preventDefault();
        const e = s.target.closest(".file-drop-zone") || s.target;
        e.classList.remove("drag-over"), this.handleFileDrop(s.dataTransfer.files, e);
      }
    }), document.addEventListener("click", (s) => {
      s.target.matches(".remove-preview") && (s.preventDefault(), this.removePreview(s.target));
    });
  }
  /**
   * Handle file selection from input
   * @param {HTMLInputElement} input - File input element
   */
  handleFileSelect(s) {
    const e = Array.from(s.files), t = this.getPreviewContainer(s);
    e.forEach((i) => {
      this.validateFile(i) && (this.createPreview(i, t, s), s.dataset.autoUpload === "true" && this.uploadFile(i, s));
    });
  }
  /**
   * Handle drag and drop files
   * @param {FileList} files - Dropped files
   * @param {HTMLElement} dropZone - Drop zone element
   */
  handleFileDrop(s, e) {
    const t = Array.from(s), i = this.getPreviewContainer(e);
    t.forEach((a) => {
      this.validateFile(a) && (this.createPreview(a, i, e), e.dataset.autoUpload === "true" && this.uploadFile(a, e));
    });
  }
  /**
   * Validate file before processing
   * @param {File} file - File to validate
   * @returns {boolean} Is file valid
   */
  validateFile(s) {
    return s.size > this.uploadConfig.maxFileSize ? (this.kl.error(`File "${s.name}" is too large. Maximum size is ${this.formatFileSize(this.uploadConfig.maxFileSize)}`), !1) : this.uploadConfig.allowedTypes.includes(s.type) ? !0 : (this.kl.error(`File type "${s.type}" is not allowed.`), !1);
  }
  /**
   * Create image preview
   * @param {File} file - File to preview
   * @param {HTMLElement} container - Preview container
   * @param {HTMLElement} source - Source element
   */
  createPreview(s, e, t) {
    const i = new FileReader();
    i.onload = (a) => {
      const r = "preview-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9), o = `
                <div class="image-preview" data-preview-id="${r}">
                    <img src="${a.target.result}" alt="${s.name}" class="preview-image">
                    <div class="preview-info">
                        <span class="file-name">${s.name}</span>
                        <span class="file-size">${this.formatFileSize(s.size)}</span>
                    </div>
                    <div class="preview-actions">
                        <button type="button" class="remove-preview btn btn-sm btn-danger">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                    <div class="upload-progress" style="display: none;">
                        <div class="progress">
                            <div class="progress-bar" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
            `;
      e.insertAdjacentHTML("beforeend", o);
      const n = e.querySelector(`[data-preview-id="${r}"]`);
      n._file = s, n._source = t;
    }, i.readAsDataURL(s);
  }
  /**
   * Upload file to server
   * @param {File} file - File to upload
   * @param {HTMLElement} source - Source element
   */
  async uploadFile(s, e) {
    var r;
    const t = e.dataset.uploadUrl || this.uploadConfig.uploadUrl, i = (r = document.querySelector(`[data-preview-id] img[alt="${s.name}"]`)) == null ? void 0 : r.closest(".image-preview");
    if (!i)
      return;
    const a = i.querySelector(".upload-progress");
    i.querySelector(".progress-bar"), a.style.display = "block";
    try {
      const o = new FormData();
      o.append("file", s), this.kl.config.csrfToken && o.append("_token", this.kl.config.csrfToken);
      const n = await fetch(t, {
        method: "POST",
        body: o,
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      });
      if (n.ok) {
        const c = await n.json();
        this.handleUploadSuccess(i, c);
      } else
        throw new Error(`Upload failed: ${n.statusText}`);
    } catch (o) {
      this.handleUploadError(i, o);
    }
  }
  /**
   * Handle successful upload
   * @param {HTMLElement} previewElement - Preview element
   * @param {Object} result - Upload result
   */
  handleUploadSuccess(s, e) {
    const t = s.querySelector(".upload-progress");
    t.style.display = "none", s.classList.add("upload-success"), s.dataset.uploadResult = JSON.stringify(e), s.dispatchEvent(new CustomEvent("kingslibrary:upload:success", {
      detail: { result: e, element: s }
    })), this.kl.success("File uploaded successfully!");
  }
  /**
   * Handle upload error
   * @param {HTMLElement} previewElement - Preview element
   * @param {Error} error - Upload error
   */
  handleUploadError(s, e) {
    const t = s.querySelector(".upload-progress");
    t.style.display = "none", s.classList.add("upload-error"), s.dispatchEvent(new CustomEvent("kingslibrary:upload:error", {
      detail: { error: e, element: s }
    })), this.kl.error(`Upload failed: ${e.message}`);
  }
  /**
   * Remove preview
   * @param {HTMLElement} button - Remove button
   */
  removePreview(s) {
    const e = s.closest(".image-preview");
    e && (e.dispatchEvent(new CustomEvent("kingslibrary:preview:removed", {
      detail: { element: e }
    })), e.remove());
  }
  /**
   * Get preview container for source element
   * @param {HTMLElement} source - Source element
   * @returns {HTMLElement} Preview container
   */
  getPreviewContainer(s) {
    var i;
    const e = s.dataset.previewContainer;
    if (e)
      return document.querySelector(e);
    let t = s.parentNode.querySelector(".image-preview-container");
    return t || (t = (i = s.closest(".file-upload-wrapper")) == null ? void 0 : i.querySelector(".image-preview-container")), t || (t = document.createElement("div"), t.className = "image-preview-container", s.parentNode.insertBefore(t, s.nextSibling)), t;
  }
  /**
   * Format file size in human readable format
   * @param {number} bytes - File size in bytes
   * @returns {string} Formatted size
   */
  formatFileSize(s) {
    if (s === 0)
      return "0 Bytes";
    const e = 1024, t = ["Bytes", "KB", "MB", "GB"], i = Math.floor(Math.log(s) / Math.log(e));
    return parseFloat((s / Math.pow(e, i)).toFixed(2)) + " " + t[i];
  }
  /**
   * Initialize utility for dynamically added elements
   * @param {HTMLElement} element - Element to initialize
   */
  initializeElement(s) {
    (s.matches(".file-upload") ? [s] : s.querySelectorAll(".file-upload")).forEach((i) => {
      i.dataset.initialized || (i.dataset.initialized = "true");
    }), (s.matches(".file-drop-zone") ? [s] : s.querySelectorAll(".file-drop-zone")).forEach((i) => {
      i.dataset.initialized || (i.dataset.initialized = "true");
    });
  }
};
typeof window < "u" && window.KL && document.addEventListener("DOMContentLoaded", () => {
  typeof m < "u" && window.KL.registerUtility("media", m);
});
typeof module < "u" && module.exports && (module.exports = m);
window.MediaUtility = m;
let p = class extends BaseUtility {
  constructor(s) {
    super(s), this.config = {
      position: "top-right",
      duration: 4e3,
      showCloseButton: !0,
      showProgressBar: !0,
      pauseOnHover: !0,
      newestOnTop: !0
    }, this.notificationQueue = [], this.activeNotifications = /* @__PURE__ */ new Map();
  }
  bindEvents() {
    document.addEventListener("click", (s) => {
      if (s.target.matches(".notification-trigger") || s.target.closest(".notification-trigger")) {
        s.preventDefault();
        const e = s.target.closest(".notification-trigger") || s.target;
        this.handleNotificationTrigger(e);
      }
      if (s.target.matches(".toast-trigger") || s.target.closest(".toast-trigger")) {
        s.preventDefault();
        const e = s.target.closest(".toast-trigger") || s.target;
        this.handleToastTrigger(e);
      }
      s.target.dataset.event && (s.preventDefault(), this.handleEventTrigger(s.target)), s.target.dataset.notification && (s.preventDefault(), this.handleNotificationMethodTrigger(s.target));
    }), document.addEventListener("kingslibrary:form:success", (s) => {
      var t;
      const e = ((t = s.detail.response) == null ? void 0 : t.message) || "Operation completed successfully!";
      this.success(e);
    }), document.addEventListener("kingslibrary:form:error", (s) => {
      var t;
      const e = ((t = s.detail.error) == null ? void 0 : t.message) || "An error occurred. Please try again.";
      this.error(e);
    }), document.addEventListener("kingslibrary:ajax:success", (s) => {
      const e = s.detail.message || "Request completed successfully!";
      this.success(e, "Success");
    }), document.addEventListener("kingslibrary:ajax:error", (s) => {
      const e = s.detail.message || "Request failed. Please try again.";
      this.error(e, "Request Failed");
    }), document.addEventListener("kingslibrary:validation:error", (s) => {
      const e = s.detail.message || "Please correct the errors and try again.";
      this.warning(e, "Validation Error");
    }), document.addEventListener("kingslibrary:data:saved", (s) => {
      const e = s.detail.message || "Data saved successfully!";
      this.success(e, "Saved", { toast: !0, timer: 2e3 });
    }), document.addEventListener("kingslibrary:data:deleted", (s) => {
      const e = s.detail.message || "Item deleted successfully!";
      this.success(e, "Deleted");
    }), document.addEventListener("kingslibrary:auth:login", (s) => {
      const e = s.detail.message || "Welcome back!";
      this.success(e, "Login Successful", { toast: !0 });
    }), document.addEventListener("kingslibrary:auth:logout", (s) => {
      const e = s.detail.message || "You have been logged out successfully.";
      this.info(e, "Logged Out", { toast: !0 });
    }), document.addEventListener("kingslibrary:auth:error", (s) => {
      const e = s.detail.message || "Authentication failed. Please try again.";
      this.error(e, "Authentication Error");
    }), document.addEventListener("kingslibrary:upload:success", (s) => {
      const e = s.detail.message || "File uploaded successfully!";
      this.success(e, "Upload Complete");
    }), document.addEventListener("kingslibrary:upload:error", (s) => {
      const e = s.detail.message || "File upload failed. Please try again.";
      this.error(e, "Upload Failed");
    }), document.addEventListener("kingslibrary:upload:progress", (s) => {
      const e = s.detail.percent || 0;
      this.info(`Upload progress: ${e}%`, "Uploading...", {
        toast: !0,
        timer: 1e3
      });
    }), document.addEventListener("kingslibrary:network:offline", (s) => {
      this.warning("You are currently offline. Some features may not work.", "Network Status");
    }), document.addEventListener("kingslibrary:network:online", (s) => {
      this.success("Connection restored!", "Back Online", { toast: !0 });
    }), document.addEventListener("kingslibrary:permission:denied", (s) => {
      const e = s.detail.message || "You do not have permission to perform this action.";
      this.warning(e, "Access Denied");
    }), document.addEventListener("kingslibrary:session:expired", (s) => {
      this.warning("Your session has expired. Please login again.", "Session Expired", {
        showConfirmButton: !0,
        confirmButtonText: "Login",
        timer: null
      });
    }), document.addEventListener("kingslibrary:notify", (s) => {
      const { type: e = "info", message: t, title: i, options: a = {} } = s.detail;
      this.show(e, t, i, a);
    });
  }
  /**
   * Show success notification
   * @param {string} message - Success message
   * @param {string} title - Optional title
   * @param {Object} options - Additional options
   */
  success(s, e = "Success", t = {}) {
    return this.show("success", s, e, t);
  }
  /**
   * Show error notification
   * @param {string} message - Error message
   * @param {string} title - Optional title
   * @param {Object} options - Additional options
   */
  error(s, e = "Error", t = {}) {
    return this.show("error", s, e, t);
  }
  /**
   * Show warning notification
   * @param {string} message - Warning message
   * @param {string} title - Optional title
   * @param {Object} options - Additional options
   */
  warning(s, e = "Warning", t = {}) {
    return this.show("warning", s, e, t);
  }
  /**
   * Show info notification
   * @param {string} message - Info message
   * @param {string} title - Optional title
   * @param {Object} options - Additional options
   */
  info(s, e = "Info", t = {}) {
    return this.show("info", s, e, t);
  }
  /**
   * Show notification
   * @param {string} type - Notification type (success, error, warning, info)
   * @param {string} message - Notification message
   * @param {string} title - Notification title
   * @param {Object} options - Additional options
   */
  show(s, e, t, i = {}) {
    return typeof Swal < "u" ? this.showSweetAlert(s, e, t, i) : this.showToast(s, e, t, i);
  }
  /**
   * Show SweetAlert2 notification
   * @param {string} type - Notification type
   * @param {string} message - Notification message
   * @param {string} title - Notification title
   * @param {Object} options - Additional options
   */
  showSweetAlert(s, e, t, i = {}) {
    const a = {
      icon: s,
      title: t,
      text: e,
      position: i.position || this.config.position,
      showConfirmButton: i.showConfirmButton !== !1,
      timer: i.timer || (i.autoClose !== !1 ? this.config.duration : null),
      timerProgressBar: i.timerProgressBar !== !1 && this.config.showProgressBar,
      ...i
    };
    return i.toast === !0 && (a.toast = !0, a.showConfirmButton = !1, a.position = i.position || "top-end"), Swal.fire(a);
  }
  /**
   * Show fallback toast notification
   * @param {string} type - Notification type
   * @param {string} message - Notification message
   * @param {string} title - Notification title
   * @param {Object} options - Additional options
   */
  showToast(s, e, t, i = {}) {
    const a = "toast-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9), r = document.createElement("div");
    r.id = a, r.className = `kingslibrary-toast toast-${s} ${i.className || ""}`;
    const o = {
      success: "fa-check-circle",
      error: "fa-exclamation-circle",
      warning: "fa-exclamation-triangle",
      info: "fa-info-circle"
    };
    r.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">
                    <i class="fa ${o[s] || o.info}"></i>
                </div>
                <div class="toast-message">
                    <div class="toast-title">${t}</div>
                    <div class="toast-text">${e}</div>
                </div>
                ${this.config.showCloseButton ? '<button class="toast-close">&times;</button>' : ""}
            </div>
            ${this.config.showProgressBar ? '<div class="toast-progress"><div class="toast-progress-bar"></div></div>' : ""}
        `, this.getToastContainer().appendChild(r), setTimeout(() => r.classList.add("show"), 10);
    const n = i.duration || this.config.duration;
    if (n > 0) {
      const d = r.querySelector(".toast-progress-bar");
      d && (d.style.animationDuration = `${n}ms`), setTimeout(() => this.removeToast(a), n);
    }
    const c = r.querySelector(".toast-close");
    return c && c.addEventListener("click", () => this.removeToast(a)), this.config.pauseOnHover && (r.addEventListener("mouseenter", () => {
      r.classList.add("paused");
    }), r.addEventListener("mouseleave", () => {
      r.classList.remove("paused");
    })), this.activeNotifications.set(a, r), { id: a, element: r };
  }
  /**
   * Show confirmation dialog
   * @param {string} message - Confirmation message
   * @param {string} title - Dialog title
   * @param {Object} options - Additional options
   */
  confirm(s, e = "Confirm", t = {}) {
    const i = {
      icon: "question",
      title: e,
      text: s,
      showCancelButton: !0,
      confirmButtonText: t.confirmText || "Yes",
      cancelButtonText: t.cancelText || "No",
      ...t
    };
    return typeof Swal < "u" ? Swal.fire(i) : Promise.resolve({
      isConfirmed: confirm(`${e}

${s}`)
    });
  }
  /**
   * Remove toast notification
   * @param {string} toastId - Toast ID to remove
   */
  removeToast(s) {
    const e = document.getElementById(s);
    e && (e.classList.remove("show"), e.classList.add("hide"), setTimeout(() => {
      e.parentNode && e.parentNode.removeChild(e), this.activeNotifications.delete(s);
    }, 300));
  }
  /**
   * Get or create toast container
   * @returns {HTMLElement} Toast container
   */
  getToastContainer() {
    let s = document.querySelector(".kingslibrary-toast-container");
    return s || (s = document.createElement("div"), s.className = "kingslibrary-toast-container", document.body.appendChild(s)), s;
  }
  /**
   * Handle notification trigger click
   * @param {HTMLElement} trigger - Trigger element
   */
  handleNotificationTrigger(s) {
    const e = s.dataset.type || "info", t = s.dataset.message || "Notification triggered", i = s.dataset.title || "Notification", a = {};
    s.dataset.position && (a.position = s.dataset.position), s.dataset.duration && (a.duration = parseInt(s.dataset.duration)), s.dataset.autoClose === "false" && (a.autoClose = !1), this.show(e, t, i, a);
  }
  /**
   * Handle toast trigger click
   * @param {HTMLElement} trigger - Trigger element
   */
  handleToastTrigger(s) {
    const e = s.dataset.type || "info", t = s.dataset.message || "Toast notification", i = s.dataset.title || "Toast", a = { toast: !0 };
    s.dataset.position && (a.position = s.dataset.position), s.dataset.duration && (a.duration = parseInt(s.dataset.duration)), this.show(e, t, i, a);
  }
  /**
   * Handle event trigger click
   * @param {HTMLElement} trigger - Trigger element
   */
  handleEventTrigger(s) {
    const e = s.dataset.event;
    let t = {};
    if (s.dataset.eventDetail)
      try {
        t = JSON.parse(s.dataset.eventDetail);
      } catch (i) {
        console.warn("Invalid JSON in data-event-detail:", i);
      }
    document.dispatchEvent(new CustomEvent(e, {
      detail: t
    }));
  }
  /**
   * Handle notification method trigger click
   * @param {HTMLElement} trigger - Trigger element
   */
  handleNotificationMethodTrigger(s) {
    const e = s.dataset.notification, t = s.dataset.message, i = s.dataset.title, a = s.dataset.item, r = s.dataset.timer ? parseInt(s.dataset.timer) : null, o = s.dataset.duration ? parseInt(s.dataset.duration) : null;
    switch (e) {
      case "successToast":
        this.successToast(t || "Success!");
        break;
      case "errorToast":
        this.errorToast(t || "Error occurred");
        break;
      case "warningToast":
        this.warningToast(t || "Warning!");
        break;
      case "infoToast":
        this.infoToast(t || "Information");
        break;
      case "confirmDelete":
        this.confirmDelete(a || "this item").then((c) => {
          c.isConfirmed && this.success("Item deleted successfully!");
        });
        break;
      case "confirmSave":
        this.confirmSave(t || "Do you want to save your changes?").then((c) => {
          c.isConfirmed && this.successToast("Changes saved!");
        });
        break;
      case "networkError":
        this.networkError(t);
        break;
      case "loading":
        this.loading(t || "Loading..."), o && setTimeout(() => {
          this.closeLoading(), this.successToast("Operation completed!");
        }, o);
        break;
      case "closeLoading":
        this.closeLoading();
        break;
      case "autoSave":
        this.autoSave();
        break;
      case "sessionTimeout":
        const n = s.dataset.minutes ? parseInt(s.dataset.minutes) : 5;
        this.sessionTimeout(n);
        break;
      case "warning":
        this.warning(t || "Warning!", i || "Warning", r ? { timer: r } : {});
        break;
      case "success":
        this.success(t || "Success!", i || "Success", r ? { timer: r } : {});
        break;
      case "error":
        this.error(t || "Error!", i || "Error", r ? { timer: r } : {});
        break;
      case "info":
        this.info(t || "Info!", i || "Information", r ? { timer: r } : {});
        break;
      default:
        console.warn(`Unknown notification method: ${e}`);
    }
  }
  /**
   * Clear all notifications
   */
  clearAll() {
    this.activeNotifications.forEach((s, e) => {
      this.removeToast(e);
    });
  }
  /**
   * Configure notification system
   * @param {Object} config - Configuration options
   */
  configure(s) {
    this.config = { ...this.config, ...s };
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
  toast(s, e, t = {}) {
    return this.show(s, e, "", {
      toast: !0,
      position: "top-end",
      timer: 3e3,
      showConfirmButton: !1,
      ...t
    });
  }
  /**
   * Quick success toast
   * @param {string} message - Success message
   */
  successToast(s) {
    return this.toast("success", s);
  }
  /**
   * Quick error toast
   * @param {string} message - Error message
   */
  errorToast(s) {
    return this.toast("error", s, { timer: 5e3 });
  }
  /**
   * Quick warning toast
   * @param {string} message - Warning message
   */
  warningToast(s) {
    return this.toast("warning", s, { timer: 4e3 });
  }
  /**
   * Quick info toast
   * @param {string} message - Info message
   */
  infoToast(s) {
    return this.toast("info", s);
  }
  /**
   * Show delete confirmation
   * @param {string} itemName - Name of item to delete
   * @param {Object} options - Additional options
   */
  confirmDelete(s = "this item", e = {}) {
    return this.confirm(
      `Are you sure you want to delete ${s}? This action cannot be undone.`,
      "Confirm Delete",
      {
        icon: "warning",
        confirmButtonText: "Yes, delete it!",
        confirmButtonColor: "#dc3545",
        focusCancel: !0,
        ...e
      }
    );
  }
  /**
   * Show save confirmation
   * @param {string} message - Custom save message
   * @param {Object} options - Additional options
   */
  confirmSave(s = "Do you want to save your changes?", e = {}) {
    return this.confirm(s, "Save Changes", {
      icon: "question",
      confirmButtonText: "Save",
      confirmButtonColor: "#198754",
      ...e
    });
  }
  /**
   * Show network error notification
   * @param {string} customMessage - Custom error message
   */
  networkError(s = null) {
    const e = s || "Network error occurred. Please check your connection and try again.";
    return this.error(e, "Network Error", {
      showConfirmButton: !0,
      confirmButtonText: "Retry"
    });
  }
  /**
   * Show loading notification
   * @param {string} message - Loading message
   * @param {Object} options - Additional options
   */
  loading(s = "Loading...", e = {}) {
    return this.show("info", s, "Please wait", {
      allowOutsideClick: !1,
      allowEscapeKey: !1,
      showConfirmButton: !1,
      showCancelButton: !1,
      didOpen: () => {
        typeof Swal < "u" && Swal.showLoading();
      },
      ...e
    });
  }
  /**
   * Close loading notification
   */
  closeLoading() {
    typeof Swal < "u" && Swal.close();
  }
  /**
   * Show auto-save notification
   * @param {Date} timestamp - Save timestamp
   */
  autoSave(s = /* @__PURE__ */ new Date()) {
    const e = s.toLocaleTimeString();
    return this.toast("success", `Auto-saved at ${e}`, {
      position: "bottom-end",
      timer: 2e3
    });
  }
  /**
   * Show validation errors
   * @param {Array|Object} errors - Validation errors
   */
  validationErrors(s) {
    let e = "Please correct the following errors:";
    if (Array.isArray(s))
      e += `
• ` + s.join(`
• `);
    else if (typeof s == "object") {
      const t = Object.values(s).flat();
      e += `
• ` + t.join(`
• `);
    } else
      e = s.toString();
    return this.warning(e, "Validation Errors", {
      html: e.replace(/\n/g, "<br>")
    });
  }
  /**
   * Show session timeout warning
   * @param {number} minutes - Minutes until timeout
   */
  sessionTimeout(s = 5) {
    return this.warning(
      `Your session will expire in ${s} minute${s !== 1 ? "s" : ""}. Click to extend.`,
      "Session Timeout Warning",
      {
        showConfirmButton: !0,
        confirmButtonText: "Extend Session",
        timer: null,
        allowOutsideClick: !1
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
  showFlashMessage(s, e) {
    const i = {
      status: "success",
      message: "success",
      success: "success",
      error: "error",
      danger: "error",
      warning: "warning",
      info: "info",
      primary: "info",
      secondary: "info"
    }[s] || "info";
    return this.show(i, e);
  }
  /**
   * Check and display Laravel validation errors
   * @param {Object} errors - Laravel validation errors object
   */
  showValidationErrors(s) {
    if (typeof s == "object" && s !== null) {
      const e = [];
      if (Object.keys(s).forEach((t) => {
        Array.isArray(s[t]) ? e.push(...s[t]) : e.push(s[t]);
      }), e.length > 0)
        return this.validationErrors(e);
    }
  }
  /**
   * Show form submission result
   * @param {boolean} success - Whether form submission was successful
   * @param {string} message - Result message
   * @param {Object} errors - Validation errors (if any)
   */
  showFormResult(s, e, t = null) {
    if (s)
      return this.success(e || "Form submitted successfully!");
    if (t)
      this.showValidationErrors(t);
    else
      return this.error(e || "Form submission failed. Please try again.");
  }
  /**
   * Legacy function support
   * @param {string} type - Notification type
   * @param {string} title - Title
   * @param {string} message - Message
   */
  toastzLegacy(s, e, t) {
    return this.show(s, t, e);
  }
};
typeof window < "u" && (window.Toastz = function(l, s, e) {
  if (window.KL && window.KL.getUtility) {
    const t = window.KL.getUtility("notification");
    if (t && t.toastzLegacy)
      return t.toastzLegacy(l, s, e);
  }
  alert(`${s}: ${e}`);
});
let w = null;
typeof window < "u" && window.KL && document.addEventListener("DOMContentLoaded", () => {
  typeof p < "u" && (window.KL.registerUtility("notification", p), w = window.KL.getUtility("notification"), window.KingsNotify = w);
});
window.KingsLibrary = window.KingsLibrary || {};
window.KingsLibrary.showNotification = function(l, s, e = null, t = {}) {
  if (w)
    return w.show(l, s, e, t);
  console.warn("KingsLibrary not loaded yet, using alert fallback"), alert(`${e ? e + ": " : ""}${s}`);
};
window.KingsLibrary.checkSessionMessages = function() {
  ["success", "error", "warning", "info", "message", "status"].forEach((e) => {
    const t = document.querySelector(`meta[name="flash-${e}"]`);
    if (t && t.content) {
      const i = t.content;
      let a = e;
      (e === "message" || e === "status") && (a = "success"), window.KingsLibrary.showNotification(a, i), t.remove();
    }
  });
  const s = document.body;
  s.dataset.flashSuccess && (window.KingsLibrary.showNotification("success", s.dataset.flashSuccess), delete s.dataset.flashSuccess), s.dataset.flashError && (window.KingsLibrary.showNotification("error", s.dataset.flashError), delete s.dataset.flashError), s.dataset.flashWarning && (window.KingsLibrary.showNotification("warning", s.dataset.flashWarning), delete s.dataset.flashWarning), s.dataset.flashInfo && (window.KingsLibrary.showNotification("info", s.dataset.flashInfo), delete s.dataset.flashInfo);
};
document.addEventListener("DOMContentLoaded", function() {
  setTimeout(() => {
    window.KingsLibrary.checkSessionMessages();
  }, 500);
});
typeof module < "u" && module.exports && (module.exports = p);
window.NotificationUtility = p;
(function() {
  class l extends KL.BaseUtility {
    constructor() {
      super("Action"), this.selectors = {
        confirmAction: ".confirm-action",
        ajaxAction: ".ajax-action",
        forms: "form"
      };
    }
    initialize() {
      this.bindConfirmActions(), this.bindAjaxActions(), this.bindFormSubmissions(), this.log("Action utilities initialized");
    }
    /**
     * Bind confirmation actions
     * Shows SweetAlert confirmation before executing action
     */
    bindConfirmActions() {
      $(document).on("click", this.selectors.confirmAction, (e) => {
        e.preventDefault();
        const t = $(e.currentTarget), i = {
          message: t.data("message") || "Are you sure you want to perform this action?",
          actionUrl: t.data("action-url"),
          method: t.data("method") || "POST",
          formId: t.data("form-id"),
          ajaxSubmit: t.data("ajax-submit")
        };
        this.showConfirmation(i, t);
      });
    }
    /**
     * Show confirmation dialog
     */
    showConfirmation(e, t) {
      window.Swal ? Swal.fire({
        title: "Please Confirm",
        text: e.message,
        icon: "question",
        showCancelButton: !0,
        confirmButtonText: "Yes, proceed",
        cancelButtonText: "Cancel",
        draggable: !0
      }).then((i) => {
        i.isConfirmed && this.executeAction(e, t);
      }) : confirm(e.message) && this.executeAction(e, t);
    }
    /**
     * Execute the confirmed action
     */
    executeAction(e, t) {
      e.formId ? this.handleFormAction(e) : e.actionUrl && this.handleDirectAction(e);
    }
    /**
     * Handle form submission after confirmation
     */
    handleFormAction(e) {
      const t = $(`#${e.formId}`);
      if (!t.length) {
        this.showError("Form not found");
        return;
      }
      e.ajaxSubmit === "true" || e.ajaxSubmit === !0 ? this.submitFormViaAjax(t) : t.submit();
    }
    /**
     * Handle direct AJAX action
     */
    handleDirectAction(e) {
      this.showLoading(), $.ajax({
        url: e.actionUrl,
        type: e.method,
        headers: this.getAjaxHeaders(),
        success: (t) => {
          this.hideLoading(), this.handleActionSuccess(t);
        },
        error: (t) => {
          this.hideLoading(), this.handleActionError(t);
        }
      });
    }
    /**
     * Bind AJAX actions (no confirmation)
     */
    bindAjaxActions() {
      $(document).on("click", this.selectors.ajaxAction, (e) => {
        e.preventDefault();
        const t = $(e.currentTarget), i = {
          actionUrl: t.data("action-url"),
          method: t.data("method") || "POST",
          successMessage: t.data("success-message") || "Action completed.",
          errorMessage: t.data("error-message") || "An error occurred.",
          formId: t.data("form-id")
        };
        if (i.formId) {
          const a = $(`#${i.formId}`);
          a.length && this.submitFormViaAjax(a, i);
        } else
          i.actionUrl && this.executeAjaxAction(i);
      });
    }
    /**
     * Execute AJAX action without confirmation
     */
    executeAjaxAction(e) {
      $.ajax({
        url: e.actionUrl,
        type: e.method,
        headers: this.getAjaxHeaders(),
        success: (t) => {
          this.showSuccess(e.successMessage), this.triggerEvent("ajax:success", { response: t, config: e });
        },
        error: (t) => {
          const i = this.extractErrorMessage(t) || e.errorMessage;
          this.showError(i), this.triggerEvent("ajax:error", { xhr: t, config: e });
        }
      });
    }
    /**
     * Submit form via AJAX
     */
    submitFormViaAjax(e, t = {}) {
      const i = t.actionUrl || e.attr("action"), a = t.method || e.attr("method") || "POST", r = e.serialize();
      this.showLoading("Processing..."), $.ajax({
        url: i,
        type: a,
        data: r,
        headers: this.getAjaxHeaders(),
        success: (o) => {
          if (this.hideLoading(), o.success !== !1) {
            const n = o.message || t.successMessage || "Form submitted successfully";
            this.showSuccess(n), e[0].reset(), o.redirect && setTimeout(() => {
              window.location.href = o.redirect;
            }, 1500);
          } else
            this.showError(o.message || "Form submission failed");
          this.triggerEvent("form:ajax:success", { response: o, form: e });
        },
        error: (o) => {
          this.hideLoading();
          const n = this.extractErrorMessage(o) || t.errorMessage || "Form submission failed";
          this.showError(n), this.triggerEvent("form:ajax:error", { xhr: o, form: e });
        }
      });
    }
    /**
     * Bind form submissions to show loading state
     */
    bindFormSubmissions() {
      $(document).on("submit", "form:not(.ajax-form)", (e) => {
        $(e.target).hasClass("ajax-action-form") || this.showFormLoading();
      });
    }
    /**
     * Show loading state for form submissions
     */
    showFormLoading() {
      window.Swal && Swal.fire({
        title: "Please wait...",
        text: "Your request is being processed.",
        allowOutsideClick: !1,
        allowEscapeKey: !1,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    }
    /**
     * Show loading state
     */
    showLoading(e = "Please wait...") {
      window.Swal && Swal.fire({
        title: e,
        allowOutsideClick: !1,
        allowEscapeKey: !1,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    }
    /**
     * Hide loading state
     */
    hideLoading() {
      window.Swal && Swal.close();
    }
    /**
     * Handle action success
     */
    handleActionSuccess(e) {
      let t = "Action completed successfully";
      if (e && typeof e == "object") {
        if (t = e.message || t, e.redirect) {
          this.showSuccess(t), setTimeout(() => {
            window.location.href = e.redirect;
          }, 1500);
          return;
        }
        if (e.reload) {
          this.showSuccess(t), setTimeout(() => {
            window.location.reload();
          }, 1500);
          return;
        }
      }
      this.showSuccess(t);
    }
    /**
     * Handle action error
     */
    handleActionError(e) {
      const t = this.extractErrorMessage(e) || "An error occurred";
      this.showError(t);
    }
    /**
     * Extract error message from XHR response
     */
    extractErrorMessage(e) {
      try {
        return e.responseJSON && e.responseJSON.message ? e.responseJSON.message : e.responseJSON && e.responseJSON.error ? e.responseJSON.error : e.statusText;
      } catch {
        return e.statusText || "Network error occurred";
      }
    }
    /**
     * Get AJAX headers including CSRF token
     */
    getAjaxHeaders() {
      const e = {
        "X-Requested-With": "XMLHttpRequest"
      }, t = $('meta[name="csrf-token"]').attr("content");
      return t && (e["X-CSRF-TOKEN"] = t), e;
    }
    /**
     * Show success message
     */
    showSuccess(e) {
      window.KL && window.KL.notification ? window.KL.notification.show({
        type: "success",
        title: "Success!",
        message: e
      }) : window.Swal ? Swal.fire({
        icon: "success",
        title: "Success!",
        text: e,
        timer: 3e3,
        showConfirmButton: !1
      }) : alert(e);
    }
    /**
     * Show error message
     */
    showError(e) {
      window.KL && window.KL.notification ? window.KL.notification.show({
        type: "error",
        title: "Error!",
        message: e
      }) : window.Swal ? Swal.fire({
        icon: "error",
        title: "Error!",
        text: e
      }) : alert(e);
    }
  }
  typeof window.KL < "u" && window.KL.registerUtility("action", l);
})();
(function() {
  class l extends KL.BaseUtility {
    constructor() {
      super("Image"), this.selectors = {
        imagePreview: ".image-input-preview",
        fileDropZone: ".file-drop-zone",
        imageGallery: ".image-gallery"
      }, this.defaultConfig = {
        maxSize: 3 * 1024 * 1024,
        // 3MB in bytes
        allowedTypes: ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"],
        previewWidth: 200,
        previewHeight: 200,
        showFilename: !0,
        showFilesize: !0
      };
    }
    initialize() {
      this.bindImagePreview(), this.bindFileDropZones(), this.bindImageGallery(), this.log("Image utilities initialized");
    }
    /**
     * Bind image preview functionality
     */
    bindImagePreview() {
      $(document).on("change", this.selectors.imagePreview, (e) => {
        const t = e.target, i = $(t), a = this.getImageConfig(i);
        this.handleFileSelection(t, a);
      });
    }
    /**
     * Get image configuration from data attributes
     */
    getImageConfig(e) {
      var t;
      return {
        maxSize: parseInt(e.data("max-size")) || this.defaultConfig.maxSize,
        allowedTypes: ((t = e.data("allowed-types")) == null ? void 0 : t.split(",")) || this.defaultConfig.allowedTypes,
        previewTarget: e.data("preview-target"),
        previewContainer: e.data("preview-container"),
        showFilename: e.data("show-filename") !== !1,
        showFilesize: e.data("show-filesize") !== !1,
        multiple: e.prop("multiple")
      };
    }
    /**
     * Handle file selection and validation
     */
    handleFileSelection(e, t) {
      const i = e.files;
      if (!i || i.length === 0) {
        this.clearPreview(t);
        return;
      }
      const a = [], r = [];
      for (let o = 0; o < i.length; o++) {
        const n = i[o], c = this.validateFile(n, t);
        c.valid ? a.push(n) : r.push(`${n.name}: ${c.error}`);
      }
      if (r.length > 0) {
        this.showValidationErrors(r), e.value = "", this.clearPreview(t);
        return;
      }
      a.length > 0 && (this.createPreviews(a, t), this.triggerEvent("image:selected", { files: a, input: e }));
    }
    /**
     * Validate individual file
     */
    validateFile(e, t) {
      return t.allowedTypes.includes(e.type) ? e.size > t.maxSize ? {
        valid: !1,
        error: `File too large. Maximum size: ${(t.maxSize / 1048576).toFixed(1)}MB`
      } : { valid: !0 } : {
        valid: !1,
        error: `Invalid file type. Allowed: ${t.allowedTypes.join(", ")}`
      };
    }
    /**
     * Create image previews
     */
    createPreviews(e, t) {
      t.previewTarget ? this.createSinglePreview(e[0], t) : t.previewContainer && this.createMultiplePreviews(e, t);
    }
    /**
     * Create single image preview
     */
    createSinglePreview(e, t) {
      const i = $(`#${t.previewTarget}`);
      if (!i.length)
        return;
      const a = new FileReader();
      a.onload = (r) => {
        i.is("img") ? i.attr("src", r.target.result) : i.html(`
                        <img src="${r.target.result}" 
                             alt="Preview" 
                             style="max-width: 100%; max-height: ${t.previewHeight || 200}px; object-fit: cover;">
                    `), (t.showFilename || t.showFilesize) && this.addFileInfo(e, i.parent(), t), this.triggerEvent("image:preview:created", { file: e, target: i });
      }, a.readAsDataURL(e);
    }
    /**
     * Create multiple image previews
     */
    createMultiplePreviews(e, t) {
      const i = $(t.previewContainer);
      i.length && (t.append || i.empty(), e.forEach((a, r) => {
        const o = new FileReader();
        o.onload = (n) => {
          const c = this.createPreviewHtml(a, n.target.result, t, r);
          i.append(c), this.triggerEvent("image:preview:added", { file: a, container: i, index: r });
        }, o.readAsDataURL(a);
      }));
    }
    /**
     * Create preview HTML
     */
    createPreviewHtml(e, t, i, a) {
      const r = this.formatFileSize(e.size), o = e.name;
      return `
                <div class="image-preview-item" data-index="${a}">
                    <div class="image-preview-wrapper position-relative">
                        <img src="${t}" 
                             alt="${o}" 
                             class="img-thumbnail" 
                             style="width: ${i.previewWidth || 150}px; height: ${i.previewHeight || 150}px; object-fit: cover;">
                        <button type="button" 
                                class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 remove-preview" 
                                data-index="${a}" 
                                title="Remove">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    ${i.showFilename ? `<small class="text-muted d-block mt-1">${o}</small>` : ""}
                    ${i.showFilesize ? `<small class="text-muted d-block">${r}</small>` : ""}
                </div>
            `;
    }
    /**
     * Add file information
     */
    addFileInfo(e, t, i) {
      t.find(".file-info").remove();
      let r = '<div class="file-info mt-2">';
      i.showFilename && (r += `<small class="text-muted d-block"><i class="fas fa-file"></i> ${e.name}</small>`), i.showFilesize && (r += `<small class="text-muted d-block"><i class="fas fa-hdd"></i> ${this.formatFileSize(e.size)}</small>`), r += "</div>", t.append(r);
    }
    /**
     * Bind file drop zones
     */
    bindFileDropZones() {
      $(document).on("dragenter dragover dragleave drop", this.selectors.fileDropZone, (e) => {
        e.preventDefault(), e.stopPropagation();
      }), $(document).on("dragenter dragover", this.selectors.fileDropZone, (e) => {
        $(e.currentTarget).addClass("drag-over");
      }), $(document).on("dragleave", this.selectors.fileDropZone, (e) => {
        $(e.currentTarget).removeClass("drag-over");
      }), $(document).on("drop", this.selectors.fileDropZone, (e) => {
        const t = $(e.currentTarget);
        t.removeClass("drag-over");
        const i = e.originalEvent.dataTransfer.files, a = t.data("target-input");
        if (i.length > 0 && a) {
          const r = $(a);
          r.length && (this.assignFilesToInput(r[0], i), r.trigger("change"));
        }
      });
    }
    /**
     * Assign files to input element
     */
    assignFilesToInput(e, t) {
      const i = new DataTransfer();
      for (let a = 0; a < t.length; a++)
        i.items.add(t[a]);
      e.files = i.files;
    }
    /**
     * Bind image gallery functionality
     */
    bindImageGallery() {
      $(document).on("click", ".remove-preview", (e) => {
        e.preventDefault();
        const t = $(e.currentTarget), i = parseInt(t.data("index")), a = t.closest(".image-preview-item");
        a.fadeOut(300, () => {
          a.remove(), this.triggerEvent("image:preview:removed", { index: i });
        });
      }), $(document).on("click", ".image-gallery img", (e) => {
        const t = $(e.currentTarget), i = t.attr("src"), a = t.attr("alt") || "Image";
        this.showImageLightbox(i, a);
      });
    }
    /**
     * Show image in lightbox
     */
    showImageLightbox(e, t) {
      window.Swal ? Swal.fire({
        title: t,
        imageUrl: e,
        imageAlt: t,
        showConfirmButton: !1,
        showCloseButton: !0,
        customClass: {
          popup: "image-lightbox"
        }
      }) : window.open(e, "_blank");
    }
    /**
     * Clear preview
     */
    clearPreview(e) {
      if (e.previewTarget) {
        const t = $(`#${e.previewTarget}`);
        t.is("img") ? t.attr("src", "") : t.empty();
      }
      e.previewContainer && $(e.previewContainer).empty();
    }
    /**
     * Show validation errors
     */
    showValidationErrors(e) {
      const t = e.join(`
`);
      window.Swal ? Swal.fire({
        icon: "error",
        title: "File Validation Error",
        text: t,
        customClass: {
          popup: "file-validation-error"
        }
      }) : alert(`File Validation Errors:
` + t);
    }
    /**
     * Format file size
     */
    formatFileSize(e) {
      if (e === 0)
        return "0 Bytes";
      const t = 1024, i = ["Bytes", "KB", "MB", "GB"], a = Math.floor(Math.log(e) / Math.log(t));
      return parseFloat((e / Math.pow(t, a)).toFixed(1)) + " " + i[a];
    }
    /**
     * Get file extension
     */
    getFileExtension(e) {
      return e.split(".").pop().toLowerCase();
    }
    /**
     * Create thumbnail from file
     */
    createThumbnail(e, t = 150, i = 150) {
      return new Promise((a, r) => {
        const o = new FileReader();
        o.onload = (n) => {
          const c = new Image();
          c.onload = () => {
            const d = document.createElement("canvas"), u = d.getContext("2d");
            let { width: b, height: x } = this.calculateDimensions(c.width, c.height, t, i);
            d.width = b, d.height = x, u.drawImage(c, 0, 0, b, x), d.toBlob(a, "image/jpeg", 0.8);
          }, c.src = n.target.result;
        }, o.onerror = r, o.readAsDataURL(e);
      });
    }
    /**
     * Calculate proportional dimensions
     */
    calculateDimensions(e, t, i, a) {
      let r = e, o = t;
      const n = e / t;
      return r > i && (r = i, o = r / n), o > a && (o = a, r = o * n), { width: r, height: o };
    }
  }
  typeof window.KL < "u" && window.KL.registerUtility("image", l);
})();
(function() {
  class l extends KL.BaseUtility {
    constructor() {
      super("Chat"), this.selectors = {
        chatForm: ".chat-send-form",
        chatMessages: ".chat-messages",
        chatInput: ".chat-input",
        chatScroll: "#chat-scroll"
      }, this.userInfo = {};
    }
    initialize() {
      this.loadUserInfo(), this.bindChatForms(), this.bindChatEvents(), this.log("Chat utilities initialized");
    }
    /**
     * Load user information from data attributes
     */
    loadUserInfo() {
      const e = $(this.selectors.chatScroll);
      e.length && (this.userInfo = {
        currentUserId: e.data("current-user-id"),
        currentUserName: e.data("current-user-name"),
        currentUserAvatar: e.data("current-user-avatar"),
        otherUserName: e.data("other-user-name"),
        otherUserAvatar: e.data("other-user-avatar")
      });
    }
    /**
     * Bind chat form submissions
     */
    bindChatForms() {
      $(document).on("submit", this.selectors.chatForm, (e) => {
        e.preventDefault(), this.handleChatSubmission($(e.currentTarget));
      }), $(document).on("keypress", this.selectors.chatInput, (e) => {
        if (e.which === 13 && !e.shiftKey) {
          e.preventDefault();
          const t = $(e.target).closest("form");
          t.hasClass("chat-send-form") && t.submit();
        }
      });
    }
    /**
     * Handle chat form submission
     */
    handleChatSubmission(e) {
      const t = this.getChatConfig(e), i = t.$input.val().trim();
      if (!i) {
        this.showError("Please enter a message");
        return;
      }
      if (!t.actionUrl) {
        this.showError("Chat action URL not configured");
        return;
      }
      t.$input.prop("disabled", !0), this.showSendingIndicator(), t.$messagesContainer.length && this.addMessageToUI(i, "sending", t), this.sendChatMessage(t, i);
    }
    /**
     * Get chat configuration from form
     */
    getChatConfig(e) {
      const t = e.data("chat-input") || ".chat-input", i = e.data("chat-messages") || ".chat-messages";
      return {
        $form: e,
        actionUrl: e.data("action-url"),
        $input: e.find(t),
        $messagesContainer: $(i),
        scrollToBottom: e.data("auto-scroll") !== !1
      };
    }
    /**
     * Send chat message via AJAX
     */
    sendChatMessage(e, t) {
      const i = e.$form.serialize();
      $.ajax({
        url: e.actionUrl,
        type: "POST",
        data: i,
        headers: this.getAjaxHeaders(),
        success: (a) => {
          this.handleChatSuccess(a, e, t);
        },
        error: (a) => {
          this.handleChatError(a, e, t);
        },
        complete: () => {
          e.$input.prop("disabled", !1), this.hideSendingIndicator();
        }
      });
    }
    /**
     * Handle successful chat message
     */
    handleChatSuccess(e, t, i) {
      e.success !== !1 ? (t.$input.val(""), t.$messagesContainer.length && this.updateOrAddMessage(e, t, i), this.triggerEvent("chat:message:sent", {
        message: i,
        response: e,
        config: t
      }), this.log("Message sent successfully")) : this.handleChatError({ responseJSON: e }, t, i);
    }
    /**
     * Handle chat error
     */
    handleChatError(e, t, i) {
      const a = this.extractErrorMessage(e) || "Failed to send message";
      this.removeOptimisticMessage(t), this.showError(a), this.triggerEvent("chat:message:error", {
        message: i,
        error: a,
        config: t
      }), this.log("Failed to send message: " + a, "error");
    }
    /**
     * Add message to UI (optimistic update)
     */
    addMessageToUI(e, t = "sent", i) {
      const a = this.createMessageHtml(e, t);
      i.$messagesContainer.append(a), i.scrollToBottom && this.scrollToBottom(i.$messagesContainer);
    }
    /**
     * Update or add message in UI
     */
    updateOrAddMessage(e, t, i) {
      const a = t.$messagesContainer.find(".message-sending").last();
      a.length ? (a.removeClass("message-sending").addClass("message-sent"), e.timestamp && a.find(".message-time").text(this.formatTime(new Date(e.timestamp)))) : this.addMessageToUI(i, "sent", t);
    }
    /**
     * Remove optimistic message
     */
    removeOptimisticMessage(e) {
      const t = e.$messagesContainer.find(".message-sending").last();
      t.length && t.fadeOut(300, function() {
        $(this).remove();
      });
    }
    /**
     * Create message HTML
     */
    createMessageHtml(e, t = "sent") {
      const i = this.formatTime(/* @__PURE__ */ new Date()), a = `message-${t}`, r = this.getStatusIcon(t);
      return `
                <div class="chat-message ${a} mb-3">
                    <div class="d-flex justify-content-end">
                        <div class="message-bubble bg-primary text-white rounded p-2 max-width-75">
                            <div class="message-content">${this.escapeHtml(e)}</div>
                            <div class="message-meta d-flex align-items-center justify-content-between mt-1">
                                <small class="message-time opacity-75">${i}</small>
                                <span class="message-status ms-2">${r}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    }
    /**
     * Get status icon for message
     */
    getStatusIcon(e) {
      const t = {
        sending: '<i class="fas fa-clock text-warning"></i>',
        sent: '<i class="fas fa-check"></i>',
        delivered: '<i class="fas fa-check-double"></i>',
        error: '<i class="fas fa-exclamation-triangle text-danger"></i>'
      };
      return t[e] || t.sent;
    }
    /**
     * Bind additional chat events
     */
    bindChatEvents() {
      $(document).on("input", this.selectors.chatInput, (t) => {
        this.autoResizeTextarea(t.target);
      });
      let e;
      $(document).on("input", this.selectors.chatInput, (t) => {
        clearTimeout(e), this.showTypingIndicator(), e = setTimeout(() => {
          this.hideTypingIndicator();
        }, 2e3);
      }), $(document).on("click", ".message-action", (t) => {
        t.preventDefault();
        const i = $(t.currentTarget).data("action"), a = $(t.currentTarget).closest(".chat-message").data("message-id");
        this.handleMessageAction(i, a);
      });
    }
    /**
     * Auto-resize textarea
     */
    autoResizeTextarea(e) {
      e.style.height = "auto", e.style.height = Math.min(e.scrollHeight, 120) + "px";
    }
    /**
     * Show typing indicator
     */
    showTypingIndicator() {
      this.triggerEvent("chat:typing:start");
    }
    /**
     * Hide typing indicator
     */
    hideTypingIndicator() {
      this.triggerEvent("chat:typing:stop");
    }
    /**
     * Handle message actions
     */
    handleMessageAction(e, t) {
      this.triggerEvent("chat:message:action", {
        action: e,
        messageId: t
      });
    }
    /**
     * Show sending indicator
     */
    showSendingIndicator() {
      if (window.KL && window.KL.notification) {
        const e = "chat-sending-" + Date.now();
        window.KL.notification.show({
          id: e,
          type: "info",
          title: "Sending message...",
          duration: 0,
          // Don't auto-hide
          position: "bottom-center"
        }), this.sendingToastId = e;
      }
    }
    /**
     * Hide sending indicator
     */
    hideSendingIndicator() {
      this.sendingToastId && window.KL && window.KL.notification && (window.KL.notification.hide(this.sendingToastId), this.sendingToastId = null);
    }
    /**
     * Scroll to bottom of messages container
     */
    scrollToBottom(e) {
      e.length && e.animate({
        scrollTop: e[0].scrollHeight
      }, 300);
    }
    /**
     * Format time for display
     */
    formatTime(e) {
      return e.getHours().toString().padStart(2, "0") + ":" + e.getMinutes().toString().padStart(2, "0");
    }
    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(e) {
      const t = document.createElement("div");
      return t.textContent = e, t.innerHTML;
    }
    /**
     * Extract error message from XHR response
     */
    extractErrorMessage(e) {
      try {
        return e.responseJSON && e.responseJSON.message ? e.responseJSON.message : e.responseJSON && e.responseJSON.error ? e.responseJSON.error : e.statusText;
      } catch {
        return "Network error occurred";
      }
    }
    /**
     * Get AJAX headers including CSRF token
     */
    getAjaxHeaders() {
      const e = {
        "X-Requested-With": "XMLHttpRequest"
      }, t = $('meta[name="csrf-token"]').attr("content");
      return t && (e["X-CSRF-TOKEN"] = t), e;
    }
    /**
     * Show error message
     */
    showError(e) {
      window.KL && window.KL.notification ? window.KL.notification.show({
        type: "error",
        title: "Error",
        message: e
      }) : window.Swal && Swal.fire({
        icon: "error",
        title: "Error",
        text: e
      });
    }
    /**
     * Load more messages (pagination)
     */
    loadMoreMessages(e, t = null) {
      const i = `/chat/${e}/messages`, a = t ? { before: t } : {};
      $.ajax({
        url: i,
        type: "GET",
        data: a,
        headers: this.getAjaxHeaders(),
        success: (r) => {
          this.handleLoadMoreSuccess(r);
        },
        error: (r) => {
          this.showError("Failed to load messages");
        }
      });
    }
    /**
     * Handle load more success
     */
    handleLoadMoreSuccess(e) {
      if (e.messages && e.messages.length > 0) {
        const t = $(this.selectors.chatMessages), i = t[0].scrollHeight;
        e.messages.forEach((r) => {
          const o = this.createMessageFromData(r);
          t.prepend(o);
        });
        const a = t[0].scrollHeight;
        t.scrollTop(a - i), this.triggerEvent("chat:messages:loaded", e);
      }
    }
    /**
     * Create message HTML from server data
     */
    createMessageFromData(e) {
      const t = e.user_id == this.userInfo.currentUserId, i = t ? "justify-content-end" : "justify-content-start", a = t ? "bg-primary text-white" : "bg-light";
      return `
                <div class="chat-message mb-3" data-message-id="${e.id}">
                    <div class="d-flex ${i}">
                        <div class="message-bubble ${a} rounded p-2 max-width-75">
                            <div class="message-content">${this.escapeHtml(e.message)}</div>
                            <div class="message-meta">
                                <small class="message-time opacity-75">${this.formatTime(new Date(e.created_at))}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    }
  }
  typeof window.KL < "u" && window.KL.registerUtility("chat", l);
})();
(function() {
  class l extends KL.BaseUtility {
    constructor() {
      super("Pagelet"), this.selectors = {
        pageletContainer: ".pagelet-container",
        pageletTrigger: "[data-pagelet]",
        pageletLoader: ".pagelet-loader"
      }, this.cache = /* @__PURE__ */ new Map(), this.loadingRequests = /* @__PURE__ */ new Map();
    }
    initialize() {
      this.bindPageletTriggers(), this.bindPageletEvents(), this.autoLoadPagelets(), this.log("Pagelet utilities initialized");
    }
    /**
     * Bind pagelet triggers
     */
    bindPageletTriggers() {
      $(document).on("click", this.selectors.pageletTrigger, (e) => {
        e.preventDefault();
        const t = $(e.currentTarget);
        this.handlePageletTrigger(t);
      }), $(document).on("click", ".pagelet-clear", (e) => {
        e.preventDefault();
        const t = $(e.currentTarget);
        this.handlePageletClear(t);
      }), $(document).on("scroll", this.throttle(() => {
        this.checkLazyPagelets();
      }, 250));
    }
    /**
     * Handle pagelet trigger click
     */
    handlePageletTrigger(e) {
      const t = this.getPageletConfig(e);
      if (!t.url) {
        this.showError("Pagelet URL not specified");
        return;
      }
      this.callPagelet(t);
    }
    /**
     * Handle pagelet clear action
     */
    handlePageletClear(e) {
      const t = e.data("pagelet-target");
      if (!t) {
        this.showError("Pagelet clear target not specified");
        return;
      }
      const i = $(t);
      if (!i.length) {
        this.showError("Pagelet clear target not found");
        return;
      }
      const a = e.data("pagelet-clear-message") || '<p class="text-muted">Click a button above to load content...</p>';
      i.html(a), this.dispatchEvent("pagelet:cleared", {
        target: t,
        trigger: e[0]
      }), this.log("Pagelet cleared", { target: t });
    }
    /**
     * Get pagelet configuration from element
     */
    getPageletConfig(e) {
      return {
        url: e.data("pagelet"),
        target: e.data("pagelet-target"),
        method: e.data("pagelet-method") || "GET",
        params: e.data("pagelet-params") || {},
        cache: e.data("pagelet-cache") !== !1,
        replace: e.data("pagelet-replace") !== !1,
        loading: e.data("pagelet-loading") !== !1,
        history: e.data("pagelet-history") === !0,
        scroll: e.data("pagelet-scroll"),
        callback: e.data("pagelet-callback"),
        beforeLoad: e.data("pagelet-before"),
        afterLoad: e.data("pagelet-after"),
        onError: e.data("pagelet-error"),
        $element: e
      };
    }
    /**
     * Call pagelet - main function
     */
    callPagelet(e) {
      if (!e.url)
        return this.showError("Pagelet URL is required"), Promise.reject("URL required");
      const t = this.getTargetContainer(e);
      if (!t || !t.length)
        return this.showError("Pagelet target container not found"), Promise.reject("Target not found");
      e.$target = t;
      const i = this.getRequestKey(e);
      if (this.loadingRequests.has(i))
        return this.loadingRequests.get(i);
      if (e.cache && this.cache.has(i))
        return this.loadFromCache(e, i);
      this.executeCallback(e.beforeLoad, e), e.loading && this.showLoader(t);
      const a = this.makePageletRequest(e, i);
      return this.loadingRequests.set(i, a), a;
    }
    /**
     * Get target container for pagelet
     */
    getTargetContainer(e) {
      if (e.target)
        return $(e.target);
      if (e.$element) {
        const t = e.$element.next(".pagelet-container");
        if (t.length)
          return t;
        const i = e.$element.closest(".pagelet-wrapper").find(".pagelet-container");
        if (i.length)
          return i;
        const a = e.$element.attr("href") || e.$element.data("target");
        if (a && a !== "#")
          return $(a);
      }
      return null;
    }
    /**
     * Generate request key for caching/deduplication
     */
    getRequestKey(e) {
      const t = typeof e.params == "object" ? JSON.stringify(e.params) : e.params;
      return `${e.method}:${e.url}:${t}`;
    }
    /**
     * Load pagelet from cache
     */
    loadFromCache(e, t) {
      const i = this.cache.get(t);
      return new Promise((a) => {
        setTimeout(() => {
          this.updateTargetContent(e.$target, i.content, e), this.executeCallback(e.afterLoad, e, i), a(i);
        }, 10);
      });
    }
    /**
     * Make pagelet AJAX request
     */
    makePageletRequest(e, t) {
      const i = {
        url: e.url,
        type: e.method,
        data: e.params,
        headers: this.getAjaxHeaders(),
        success: (a) => {
          this.handlePageletSuccess(a, e, t);
        },
        error: (a) => {
          this.handlePageletError(a, e, t);
        },
        complete: () => {
          this.hideLoader(e.$target), this.loadingRequests.delete(t);
        }
      };
      return $.ajax(i);
    }
    /**
     * Handle successful pagelet response
     */
    handlePageletSuccess(e, t, i) {
      let a = e;
      typeof e == "object" && e.content !== void 0 && (a = e.content), t.cache && this.cache.set(i, {
        content: a,
        timestamp: Date.now(),
        response: e
      }), this.updateTargetContent(t.$target, a, t), t.scroll && this.scrollToTarget(t.scroll), t.history && this.updateHistory(t.url), this.executeCallback(t.afterLoad, t, e), this.triggerEvent("pagelet:loaded", {
        config: t,
        response: e,
        content: a
      }), this.log("Pagelet loaded successfully: " + t.url);
    }
    /**
     * Handle pagelet error
     */
    handlePageletError(e, t, i) {
      const a = this.extractErrorMessage(e);
      if (t.$target && t.$target.length) {
        const r = this.createErrorHtml(a);
        this.updateTargetContent(t.$target, r, t);
      }
      this.executeCallback(t.onError, t, e), this.triggerEvent("pagelet:error", {
        config: t,
        error: a,
        xhr: e
      }), this.log("Pagelet failed to load: " + a, "error");
    }
    /**
     * Update target container content
     */
    updateTargetContent(e, t, i) {
      i.replace !== !1 ? e.html(t) : e.append(t), window.KL && window.KL.initializeUtilities && window.KL.initializeUtilities(e);
    }
    /**
     * Show loading indicator
     */
    showLoader(e) {
      const t = this.createLoaderHtml();
      e.find(".pagelet-loader-overlay").length || e.css("position", "relative").append(t);
    }
    /**
     * Hide loading indicator
     */
    hideLoader(e) {
      e.find(".pagelet-loader-overlay").fadeOut(200, function() {
        $(this).remove();
      });
    }
    /**
     * Create loader HTML
     */
    createLoaderHtml() {
      return `
                <div class="pagelet-loader-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75" style="z-index: 1000;">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            `;
    }
    /**
     * Create error HTML
     */
    createErrorHtml(e) {
      return `
                <div class="alert alert-danger m-3" role="alert">
                    <h6 class="alert-heading">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        Error Loading Content
                    </h6>
                    <p class="mb-0">${this.escapeHtml(e)}</p>
                    <hr>
                    <button type="button" class="btn btn-sm btn-outline-danger" onclick="location.reload()">
                        <i class="fas fa-redo me-1"></i>
                        Retry
                    </button>
                </div>
            `;
    }
    /**
     * Auto-load pagelets on page load
     */
    autoLoadPagelets() {
      $(document).ready(() => {
        $('[data-pagelet-auto="true"]').each((e, t) => {
          const i = $(t), a = this.getPageletConfig(i);
          setTimeout(() => {
            this.callPagelet(a);
          }, e * 100);
        });
      });
    }
    /**
     * Check for lazy loading pagelets
     */
    checkLazyPagelets() {
      $('[data-pagelet-lazy="true"]:not(.pagelet-loaded)').each((e, t) => {
        const i = $(t);
        if (this.isInViewport(i[0])) {
          i.addClass("pagelet-loaded");
          const a = this.getPageletConfig(i);
          this.callPagelet(a);
        }
      });
    }
    /**
     * Check if element is in viewport
     */
    isInViewport(e) {
      const t = e.getBoundingClientRect(), i = window.innerHeight || document.documentElement.clientHeight, a = window.innerWidth || document.documentElement.clientWidth;
      return t.top >= 0 && t.left >= 0 && t.bottom <= i && t.right <= a;
    }
    /**
     * Scroll to target element
     */
    scrollToTarget(e) {
      const t = $(e);
      t.length && $("html, body").animate({
        scrollTop: t.offset().top - 100
      }, 500);
    }
    /**
     * Update browser history
     */
    updateHistory(e) {
      window.history && window.history.pushState && window.history.pushState(null, null, e);
    }
    /**
     * Execute callback function
     */
    executeCallback(e, t, i = null) {
      typeof e == "function" ? e(t, i) : typeof e == "string" && window[e] && window[e](t, i);
    }
    /**
     * Bind additional pagelet events
     */
    bindPageletEvents() {
      $(document).on("click", "[data-pagelet-refresh]", (e) => {
        e.preventDefault();
        const t = $(e.currentTarget).data("pagelet-refresh");
        this.refreshPagelet(t);
      }), $(document).on("click", "[data-pagelet-nav]", (e) => {
        e.preventDefault();
        const t = $(e.currentTarget);
        this.handlePageletNav(t);
      }), $(document).on("submit", "[data-pagelet-form]", (e) => {
        e.preventDefault(), this.handlePageletForm($(e.currentTarget));
      });
    }
    /**
     * Refresh specific pagelet
     */
    refreshPagelet(e) {
      const i = $(e).data("pagelet-url");
      if (i) {
        const a = {
          url: i,
          target: e,
          cache: !1
          // Force refresh
        };
        this.callPagelet(a);
      }
    }
    /**
     * Handle pagelet navigation
     */
    handlePageletNav(e) {
      e.data("pagelet-nav");
      const t = e.data("pagelet-url") || e.attr("href"), i = e.data("pagelet-target"), a = {
        url: t,
        target: i,
        method: "GET",
        history: !0
      };
      this.callPagelet(a);
    }
    /**
     * Handle pagelet form submission
     */
    handlePageletForm(e) {
      const t = e.data("pagelet-form"), i = {
        url: e.attr("action"),
        target: t,
        method: e.attr("method") || "POST",
        params: e.serialize()
      };
      this.callPagelet(i);
    }
    /**
     * Clear pagelet cache
     */
    clearCache(e = null) {
      if (e)
        for (const [t] of this.cache)
          t.includes(e) && this.cache.delete(t);
      else
        this.cache.clear();
      this.log("Pagelet cache cleared" + (e ? ` (pattern: ${e})` : ""));
    }
    /**
     * Preload pagelet
     */
    preloadPagelet(e, t = {}) {
      const i = {
        url: e,
        method: "GET",
        params: t,
        cache: !0,
        loading: !1
      }, a = this.getRequestKey(i);
      this.cache.has(a) || $.ajax({
        url: i.url,
        type: i.method,
        data: i.params,
        headers: this.getAjaxHeaders(),
        success: (r) => {
          this.cache.set(a, {
            content: r.content || r,
            timestamp: Date.now(),
            response: r
          }), this.log("Pagelet preloaded: " + e);
        }
      });
    }
    /**
     * Throttle function calls
     */
    throttle(e, t) {
      let i;
      return function() {
        const a = arguments, r = this;
        i || (e.apply(r, a), i = !0, setTimeout(() => i = !1, t));
      };
    }
    /**
     * Extract error message from XHR response
     */
    extractErrorMessage(e) {
      try {
        return e.responseJSON && e.responseJSON.message ? e.responseJSON.message : e.responseText ? e.responseText : e.statusText || "Unknown error occurred";
      } catch {
        return "Network error occurred";
      }
    }
    /**
     * Get AJAX headers
     */
    getAjaxHeaders() {
      const e = {
        "X-Requested-With": "XMLHttpRequest"
      }, t = $('meta[name="csrf-token"]').attr("content");
      return t && (e["X-CSRF-TOKEN"] = t), e;
    }
    /**
     * Escape HTML
     */
    escapeHtml(e) {
      const t = document.createElement("div");
      return t.textContent = e, t.innerHTML;
    }
    /**
     * Show error message
     */
    showError(e) {
      window.KL && window.KL.notification && window.KL.notification.show({
        type: "error",
        title: "Pagelet Error",
        message: e
      });
    }
  }
  typeof window.KL < "u" && window.KL.registerUtility("pagelet", l), window.call_pagelet = function(s, e, t = {}) {
    if (window.KL && window.KL.pagelet) {
      const i = Object.assign({
        url: s,
        target: e
      }, t);
      return window.KL.pagelet.callPagelet(i);
    } else
      console.error("PageletUtility not initialized");
  };
})();
/**
 * KingsLibrary v1.0.0
 * A lightweight, event-driven JavaScript utility library
 * 
 * @author KingsLibrary Team
 * @license MIT
 * @homepage https://github.com/kingkology/kingslibrary
 */
typeof document < "u" && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  window.KL && window.KL.init();
}) : window.KL && window.KL.init());
const M = window.KL;
export {
  M as default
};
//# sourceMappingURL=kingslibrary.esm.js.map
