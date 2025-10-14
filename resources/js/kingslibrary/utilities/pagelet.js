/**
 * KingsLibrary - Pagelet Utilities
 * Handles dynamic content loading and pagelet functionality
 * 
 * @version 3.0.0
 * @author KingsLibrary
 * @requires jQuery
 */

(function() {
    'use strict';

    // Pagelet utility class
    class PageletUtility extends KL.BaseUtility {
        constructor() {
            super('Pagelet');
            this.selectors = {
                pageletContainer: '.pagelet-container',
                pageletTrigger: '[data-pagelet]',
                pageletLoader: '.pagelet-loader'
            };
            
            this.cache = new Map();
            this.loadingRequests = new Map();
        }

        initialize() {
            this.bindPageletTriggers();
            this.bindPageletEvents();
            this.autoLoadPagelets();
            this.log('Pagelet utilities initialized');
        }

        /**
         * Bind pagelet triggers
         */
        bindPageletTriggers() {
            $(document).on('click', this.selectors.pageletTrigger, (e) => {
                e.preventDefault();
                const $trigger = $(e.currentTarget);
                this.handlePageletTrigger($trigger);
            });

            // Handle pagelet clear buttons
            $(document).on('click', '.pagelet-clear', (e) => {
                e.preventDefault();
                const $trigger = $(e.currentTarget);
                this.handlePageletClear($trigger);
            });

            // Auto-load on scroll for lazy loading
            $(document).on('scroll', this.throttle(() => {
                this.checkLazyPagelets();
            }, 250));
        }

        /**
         * Handle pagelet trigger click
         */
        handlePageletTrigger($trigger) {
            const config = this.getPageletConfig($trigger);
            
            if (!config.url) {
                this.showError('Pagelet URL not specified');
                return;
            }

            this.callPagelet(config);
        }

        /**
         * Handle pagelet clear action
         */
        handlePageletClear($trigger) {
            const target = $trigger.data('pagelet-target');
            if (!target) {
                this.showError('Pagelet clear target not specified');
                return;
            }

            const $target = $(target);
            if (!$target.length) {
                this.showError('Pagelet clear target not found');
                return;
            }

            // Clear the content with optional default message
            const defaultContent = $trigger.data('pagelet-clear-message') || 
                                 '<p class="text-muted">Click a button above to load content...</p>';
            
            $target.html(defaultContent);
            
            // Dispatch clear event
            this.dispatchEvent('pagelet:cleared', {
                target: target,
                trigger: $trigger[0]
            });
            
            this.log('Pagelet cleared', { target });
        }

        /**
         * Get pagelet configuration from element
         */
        getPageletConfig($element) {
            return {
                url: $element.data('pagelet'),
                target: $element.data('pagelet-target'),
                method: $element.data('pagelet-method') || 'GET',
                params: $element.data('pagelet-params') || {},
                cache: $element.data('pagelet-cache') !== false,
                replace: $element.data('pagelet-replace') !== false,
                loading: $element.data('pagelet-loading') !== false,
                history: $element.data('pagelet-history') === true,
                scroll: $element.data('pagelet-scroll'),
                callback: $element.data('pagelet-callback'),
                beforeLoad: $element.data('pagelet-before'),
                afterLoad: $element.data('pagelet-after'),
                onError: $element.data('pagelet-error'),
                $element: $element
            };
        }

        /**
         * Call pagelet - main function
         */
        callPagelet(config) {
            // Validate configuration
            if (!config.url) {
                this.showError('Pagelet URL is required');
                return Promise.reject('URL required');
            }

            // Determine target container
            const $target = this.getTargetContainer(config);
            if (!$target || !$target.length) {
                this.showError('Pagelet target container not found');
                return Promise.reject('Target not found');
            }

            config.$target = $target;

            // Check if already loading
            const requestKey = this.getRequestKey(config);
            if (this.loadingRequests.has(requestKey)) {
                return this.loadingRequests.get(requestKey);
            }

            // Check cache first
            if (config.cache && this.cache.has(requestKey)) {
                return this.loadFromCache(config, requestKey);
            }

            // Execute before load callback
            this.executeCallback(config.beforeLoad, config);

            // Show loading indicator
            if (config.loading) {
                this.showLoader($target);
            }

            // Make the request
            const promise = this.makePageletRequest(config, requestKey);
            
            // Store promise for deduplication
            this.loadingRequests.set(requestKey, promise);

            return promise;
        }

        /**
         * Get target container for pagelet
         */
        getTargetContainer(config) {
            if (config.target) {
                return $(config.target);
            }
            
            if (config.$element) {
                // Try common patterns
                const $next = config.$element.next('.pagelet-container');
                if ($next.length) return $next;
                
                const $parent = config.$element.closest('.pagelet-wrapper').find('.pagelet-container');
                if ($parent.length) return $parent;
                
                // Use data-target attribute or closest container
                const target = config.$element.attr('href') || config.$element.data('target');
                if (target && target !== '#') {
                    return $(target);
                }
            }
            
            return null;
        }

        /**
         * Generate request key for caching/deduplication
         */
        getRequestKey(config) {
            const params = typeof config.params === 'object' ? JSON.stringify(config.params) : config.params;
            return `${config.method}:${config.url}:${params}`;
        }

        /**
         * Load pagelet from cache
         */
        loadFromCache(config, requestKey) {
            const cachedData = this.cache.get(requestKey);
            
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.updateTargetContent(config.$target, cachedData.content, config);
                    this.executeCallback(config.afterLoad, config, cachedData);
                    resolve(cachedData);
                }, 10); // Small delay to show loading state
            });
        }

        /**
         * Make pagelet AJAX request
         */
        makePageletRequest(config, requestKey) {
            const ajaxOptions = {
                url: config.url,
                type: config.method,
                data: config.params,
                headers: this.getAjaxHeaders(),
                success: (response) => {
                    this.handlePageletSuccess(response, config, requestKey);
                },
                error: (xhr) => {
                    this.handlePageletError(xhr, config, requestKey);
                },
                complete: () => {
                    this.hideLoader(config.$target);
                    this.loadingRequests.delete(requestKey);
                }
            };

            return $.ajax(ajaxOptions);
        }

        /**
         * Handle successful pagelet response
         */
        handlePageletSuccess(response, config, requestKey) {
            let content = response;
            
            // If response is JSON, extract content
            if (typeof response === 'object' && response.content !== undefined) {
                content = response.content;
            }

            // Cache the response
            if (config.cache) {
                this.cache.set(requestKey, {
                    content: content,
                    timestamp: Date.now(),
                    response: response
                });
            }

            // Update target content
            this.updateTargetContent(config.$target, content, config);

            // Handle scroll
            if (config.scroll) {
                this.scrollToTarget(config.scroll);
            }

            // Update browser history
            if (config.history) {
                this.updateHistory(config.url);
            }

            // Execute callback
            this.executeCallback(config.afterLoad, config, response);

            // Trigger success event
            this.triggerEvent('pagelet:loaded', {
                config: config,
                response: response,
                content: content
            });

            this.log('Pagelet loaded successfully: ' + config.url);
        }

        /**
         * Handle pagelet error
         */
        handlePageletError(xhr, config, requestKey) {
            const error = this.extractErrorMessage(xhr);
            
            // Show error in target if configured
            if (config.$target && config.$target.length) {
                const errorHtml = this.createErrorHtml(error);
                this.updateTargetContent(config.$target, errorHtml, config);
            }

            // Execute error callback
            this.executeCallback(config.onError, config, xhr);

            // Trigger error event
            this.triggerEvent('pagelet:error', {
                config: config,
                error: error,
                xhr: xhr
            });

            this.log('Pagelet failed to load: ' + error, 'error');
        }

        /**
         * Update target container content
         */
        updateTargetContent($target, content, config) {
            if (config.replace !== false) {
                $target.html(content);
            } else {
                $target.append(content);
            }

            // Reinitialize utilities in the new content
            if (window.KL && window.KL.initializeUtilities) {
                window.KL.initializeUtilities($target);
            }
        }

        /**
         * Show loading indicator
         */
        showLoader($target) {
            const loaderHtml = this.createLoaderHtml();
            
            // Add loader overlay
            if (!$target.find('.pagelet-loader-overlay').length) {
                $target.css('position', 'relative').append(loaderHtml);
            }
        }

        /**
         * Hide loading indicator
         */
        hideLoader($target) {
            $target.find('.pagelet-loader-overlay').fadeOut(200, function() {
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
        createErrorHtml(error) {
            return `
                <div class="alert alert-danger m-3" role="alert">
                    <h6 class="alert-heading">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        Error Loading Content
                    </h6>
                    <p class="mb-0">${this.escapeHtml(error)}</p>
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
                $('[data-pagelet-auto="true"]').each((index, element) => {
                    const $element = $(element);
                    const config = this.getPageletConfig($element);
                    
                    // Delay auto-loading to prevent overwhelming the server
                    setTimeout(() => {
                        this.callPagelet(config);
                    }, index * 100);
                });
            });
        }

        /**
         * Check for lazy loading pagelets
         */
        checkLazyPagelets() {
            $('[data-pagelet-lazy="true"]:not(.pagelet-loaded)').each((index, element) => {
                const $element = $(element);
                
                if (this.isInViewport($element[0])) {
                    $element.addClass('pagelet-loaded');
                    const config = this.getPageletConfig($element);
                    this.callPagelet(config);
                }
            });
        }

        /**
         * Check if element is in viewport
         */
        isInViewport(element) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;
            
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= windowHeight &&
                rect.right <= windowWidth
            );
        }

        /**
         * Scroll to target element
         */
        scrollToTarget(target) {
            const $target = $(target);
            if ($target.length) {
                $('html, body').animate({
                    scrollTop: $target.offset().top - 100
                }, 500);
            }
        }

        /**
         * Update browser history
         */
        updateHistory(url) {
            if (window.history && window.history.pushState) {
                window.history.pushState(null, null, url);
            }
        }

        /**
         * Execute callback function
         */
        executeCallback(callback, config, data = null) {
            if (typeof callback === 'function') {
                callback(config, data);
            } else if (typeof callback === 'string' && window[callback]) {
                window[callback](config, data);
            }
        }

        /**
         * Bind additional pagelet events
         */
        bindPageletEvents() {
            // Handle pagelet refresh buttons
            $(document).on('click', '[data-pagelet-refresh]', (e) => {
                e.preventDefault();
                const target = $(e.currentTarget).data('pagelet-refresh');
                this.refreshPagelet(target);
            });

            // Handle pagelet navigation (prev/next)
            $(document).on('click', '[data-pagelet-nav]', (e) => {
                e.preventDefault();
                const $trigger = $(e.currentTarget);
                this.handlePageletNav($trigger);
            });

            // Handle form submissions that should load pagelets
            $(document).on('submit', '[data-pagelet-form]', (e) => {
                e.preventDefault();
                this.handlePageletForm($(e.currentTarget));
            });
        }

        /**
         * Refresh specific pagelet
         */
        refreshPagelet(target) {
            const $target = $(target);
            const originalUrl = $target.data('pagelet-url');
            
            if (originalUrl) {
                const config = {
                    url: originalUrl,
                    target: target,
                    cache: false // Force refresh
                };
                
                this.callPagelet(config);
            }
        }

        /**
         * Handle pagelet navigation
         */
        handlePageletNav($trigger) {
            const direction = $trigger.data('pagelet-nav');
            const url = $trigger.data('pagelet-url') || $trigger.attr('href');
            const target = $trigger.data('pagelet-target');
            
            const config = {
                url: url,
                target: target,
                method: 'GET',
                history: true
            };
            
            this.callPagelet(config);
        }

        /**
         * Handle pagelet form submission
         */
        handlePageletForm($form) {
            const target = $form.data('pagelet-form');
            const config = {
                url: $form.attr('action'),
                target: target,
                method: $form.attr('method') || 'POST',
                params: $form.serialize()
            };
            
            this.callPagelet(config);
        }

        /**
         * Clear pagelet cache
         */
        clearCache(pattern = null) {
            if (pattern) {
                // Clear specific cache entries matching pattern
                for (const [key] of this.cache) {
                    if (key.includes(pattern)) {
                        this.cache.delete(key);
                    }
                }
            } else {
                // Clear all cache
                this.cache.clear();
            }
            
            this.log('Pagelet cache cleared' + (pattern ? ` (pattern: ${pattern})` : ''));
        }

        /**
         * Preload pagelet
         */
        preloadPagelet(url, params = {}) {
            const config = {
                url: url,
                method: 'GET',
                params: params,
                cache: true,
                loading: false
            };
            
            const requestKey = this.getRequestKey(config);
            
            // Only preload if not already cached
            if (!this.cache.has(requestKey)) {
                $.ajax({
                    url: config.url,
                    type: config.method,
                    data: config.params,
                    headers: this.getAjaxHeaders(),
                    success: (response) => {
                        this.cache.set(requestKey, {
                            content: response.content || response,
                            timestamp: Date.now(),
                            response: response
                        });
                        
                        this.log('Pagelet preloaded: ' + url);
                    }
                });
            }
        }

        /**
         * Throttle function calls
         */
        throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        }

        /**
         * Extract error message from XHR response
         */
        extractErrorMessage(xhr) {
            try {
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    return xhr.responseJSON.message;
                }
                if (xhr.responseText) {
                    return xhr.responseText;
                }
                return xhr.statusText || 'Unknown error occurred';
            } catch (e) {
                return 'Network error occurred';
            }
        }

        /**
         * Get AJAX headers
         */
        getAjaxHeaders() {
            const headers = {
                'X-Requested-With': 'XMLHttpRequest'
            };

            const token = $('meta[name="csrf-token"]').attr('content');
            if (token) {
                headers['X-CSRF-TOKEN'] = token;
            }

            return headers;
        }

        /**
         * Escape HTML
         */
        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        /**
         * Show error message
         */
        showError(message) {
            if (window.KL && window.KL.notification) {
                window.KL.notification.show({
                    type: 'error',
                    title: 'Pagelet Error',
                    message: message
                });
            }
        }
    }

    // Register utility
    if (typeof window.KL !== 'undefined') {
        window.KL.registerUtility('pagelet', PageletUtility);
    }

    // Export for use with call_pagelet function
    window.call_pagelet = function(url, target, options = {}) {
        if (window.KL && window.KL.pagelet) {
            const config = Object.assign({
                url: url,
                target: target
            }, options);
            
            return window.KL.pagelet.callPagelet(config);
        } else {
            console.error('PageletUtility not initialized');
        }
    };

})();