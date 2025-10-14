/**
 * KingsLibrary - Chat Utilities
 * Handles real-time chat functionality with AJAX support
 * 
 * @version 3.0.0
 * @author KingsLibrary
 * @requires jQuery
 */

(function() {
    'use strict';

    // Chat utility class
    class ChatUtility extends KL.BaseUtility {
        constructor() {
            super('Chat');
            this.selectors = {
                chatForm: '.chat-send-form',
                chatMessages: '.chat-messages',
                chatInput: '.chat-input',
                chatScroll: '#chat-scroll'
            };
            
            this.userInfo = {};
        }

        initialize() {
            this.loadUserInfo();
            this.bindChatForms();
            this.bindChatEvents();
            this.log('Chat utilities initialized');
        }

        /**
         * Load user information from data attributes
         */
        loadUserInfo() {
            const $chatScroll = $(this.selectors.chatScroll);
            if ($chatScroll.length) {
                this.userInfo = {
                    currentUserId: $chatScroll.data('current-user-id'),
                    currentUserName: $chatScroll.data('current-user-name'),
                    currentUserAvatar: $chatScroll.data('current-user-avatar'),
                    otherUserName: $chatScroll.data('other-user-name'),
                    otherUserAvatar: $chatScroll.data('other-user-avatar')
                };
            }
        }

        /**
         * Bind chat form submissions
         */
        bindChatForms() {
            $(document).on('submit', this.selectors.chatForm, (e) => {
                e.preventDefault();
                this.handleChatSubmission($(e.currentTarget));
            });

            // Handle Enter key in chat inputs
            $(document).on('keypress', this.selectors.chatInput, (e) => {
                if (e.which === 13 && !e.shiftKey) {
                    e.preventDefault();
                    const $form = $(e.target).closest('form');
                    if ($form.hasClass('chat-send-form')) {
                        $form.submit();
                    }
                }
            });
        }

        /**
         * Handle chat form submission
         */
        handleChatSubmission($form) {
            const config = this.getChatConfig($form);
            const message = config.$input.val().trim();

            // Validate message
            if (!message) {
                this.showError('Please enter a message');
                return;
            }

            if (!config.actionUrl) {
                this.showError('Chat action URL not configured');
                return;
            }

            // Disable input during submission
            config.$input.prop('disabled', true);

            // Show sending indicator
            this.showSendingIndicator();

            // Add message to UI immediately (optimistic update)
            if (config.$messagesContainer.length) {
                this.addMessageToUI(message, 'sending', config);
            }

            // Send AJAX request
            this.sendChatMessage(config, message);
        }

        /**
         * Get chat configuration from form
         */
        getChatConfig($form) {
            const inputSelector = $form.data('chat-input') || '.chat-input';
            const messagesSelector = $form.data('chat-messages') || '.chat-messages';
            
            return {
                $form: $form,
                actionUrl: $form.data('action-url'),
                $input: $form.find(inputSelector),
                $messagesContainer: $(messagesSelector),
                scrollToBottom: $form.data('auto-scroll') !== false
            };
        }

        /**
         * Send chat message via AJAX
         */
        sendChatMessage(config, message) {
            const formData = config.$form.serialize();

            $.ajax({
                url: config.actionUrl,
                type: 'POST',
                data: formData,
                headers: this.getAjaxHeaders(),
                success: (response) => {
                    this.handleChatSuccess(response, config, message);
                },
                error: (xhr) => {
                    this.handleChatError(xhr, config, message);
                },
                complete: () => {
                    config.$input.prop('disabled', false);
                    this.hideSendingIndicator();
                }
            });
        }

        /**
         * Handle successful chat message
         */
        handleChatSuccess(response, config, message) {
            if (response.success !== false) {
                // Clear the input
                config.$input.val('');
                
                // Update the optimistic message or add new one
                if (config.$messagesContainer.length) {
                    this.updateOrAddMessage(response, config, message);
                }

                // Trigger success event
                this.triggerEvent('chat:message:sent', {
                    message: message,
                    response: response,
                    config: config
                });

                this.log('Message sent successfully');
            } else {
                this.handleChatError({ responseJSON: response }, config, message);
            }
        }

        /**
         * Handle chat error
         */
        handleChatError(xhr, config, message) {
            const errorMessage = this.extractErrorMessage(xhr) || 'Failed to send message';
            
            // Remove the optimistic message
            this.removeOptimisticMessage(config);
            
            // Show error
            this.showError(errorMessage);

            // Trigger error event
            this.triggerEvent('chat:message:error', {
                message: message,
                error: errorMessage,
                config: config
            });

            this.log('Failed to send message: ' + errorMessage, 'error');
        }

        /**
         * Add message to UI (optimistic update)
         */
        addMessageToUI(message, status = 'sent', config) {
            const messageHtml = this.createMessageHtml(message, status);
            config.$messagesContainer.append(messageHtml);
            
            if (config.scrollToBottom) {
                this.scrollToBottom(config.$messagesContainer);
            }
        }

        /**
         * Update or add message in UI
         */
        updateOrAddMessage(response, config, originalMessage) {
            // Find and update the optimistic message, or add new one
            const $sendingMessage = config.$messagesContainer.find('.message-sending').last();
            
            if ($sendingMessage.length) {
                // Update the existing optimistic message
                $sendingMessage
                    .removeClass('message-sending')
                    .addClass('message-sent');
                
                // Update timestamp if provided
                if (response.timestamp) {
                    $sendingMessage.find('.message-time').text(this.formatTime(new Date(response.timestamp)));
                }
            } else {
                // Add new message if optimistic update wasn't found
                this.addMessageToUI(originalMessage, 'sent', config);
            }
        }

        /**
         * Remove optimistic message
         */
        removeOptimisticMessage(config) {
            const $sendingMessage = config.$messagesContainer.find('.message-sending').last();
            if ($sendingMessage.length) {
                $sendingMessage.fadeOut(300, function() {
                    $(this).remove();
                });
            }
        }

        /**
         * Create message HTML
         */
        createMessageHtml(message, status = 'sent') {
            const time = this.formatTime(new Date());
            const statusClass = `message-${status}`;
            const statusIcon = this.getStatusIcon(status);
            
            return `
                <div class="chat-message ${statusClass} mb-3">
                    <div class="d-flex justify-content-end">
                        <div class="message-bubble bg-primary text-white rounded p-2 max-width-75">
                            <div class="message-content">${this.escapeHtml(message)}</div>
                            <div class="message-meta d-flex align-items-center justify-content-between mt-1">
                                <small class="message-time opacity-75">${time}</small>
                                <span class="message-status ms-2">${statusIcon}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        /**
         * Get status icon for message
         */
        getStatusIcon(status) {
            const icons = {
                sending: '<i class="fas fa-clock text-warning"></i>',
                sent: '<i class="fas fa-check"></i>',
                delivered: '<i class="fas fa-check-double"></i>',
                error: '<i class="fas fa-exclamation-triangle text-danger"></i>'
            };
            
            return icons[status] || icons.sent;
        }

        /**
         * Bind additional chat events
         */
        bindChatEvents() {
            // Auto-resize textarea
            $(document).on('input', this.selectors.chatInput, (e) => {
                this.autoResizeTextarea(e.target);
            });

            // Handle typing indicators (if needed)
            let typingTimer;
            $(document).on('input', this.selectors.chatInput, (e) => {
                clearTimeout(typingTimer);
                
                // Show typing indicator
                this.showTypingIndicator();
                
                // Hide after 2 seconds of no typing
                typingTimer = setTimeout(() => {
                    this.hideTypingIndicator();
                }, 2000);
            });

            // Handle message actions (edit, delete, etc.)
            $(document).on('click', '.message-action', (e) => {
                e.preventDefault();
                const action = $(e.currentTarget).data('action');
                const messageId = $(e.currentTarget).closest('.chat-message').data('message-id');
                
                this.handleMessageAction(action, messageId);
            });
        }

        /**
         * Auto-resize textarea
         */
        autoResizeTextarea(textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        }

        /**
         * Show typing indicator
         */
        showTypingIndicator() {
            // Implementation depends on your UI design
            this.triggerEvent('chat:typing:start');
        }

        /**
         * Hide typing indicator
         */
        hideTypingIndicator() {
            // Implementation depends on your UI design
            this.triggerEvent('chat:typing:stop');
        }

        /**
         * Handle message actions
         */
        handleMessageAction(action, messageId) {
            this.triggerEvent('chat:message:action', {
                action: action,
                messageId: messageId
            });
        }

        /**
         * Show sending indicator
         */
        showSendingIndicator() {
            if (window.KL && window.KL.notification) {
                // Use toast notification if available
                const toastId = 'chat-sending-' + Date.now();
                window.KL.notification.show({
                    id: toastId,
                    type: 'info',
                    title: 'Sending message...',
                    duration: 0, // Don't auto-hide
                    position: 'bottom-center'
                });
                
                this.sendingToastId = toastId;
            }
        }

        /**
         * Hide sending indicator
         */
        hideSendingIndicator() {
            if (this.sendingToastId && window.KL && window.KL.notification) {
                window.KL.notification.hide(this.sendingToastId);
                this.sendingToastId = null;
            }
        }

        /**
         * Scroll to bottom of messages container
         */
        scrollToBottom($container) {
            if ($container.length) {
                $container.animate({
                    scrollTop: $container[0].scrollHeight
                }, 300);
            }
        }

        /**
         * Format time for display
         */
        formatTime(date) {
            return date.getHours().toString().padStart(2, '0') + ':' +
                   date.getMinutes().toString().padStart(2, '0');
        }

        /**
         * Escape HTML to prevent XSS
         */
        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
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
                return 'Network error occurred';
            }
        }

        /**
         * Get AJAX headers including CSRF token
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
         * Show error message
         */
        showError(message) {
            if (window.KL && window.KL.notification) {
                window.KL.notification.show({
                    type: 'error',
                    title: 'Error',
                    message: message
                });
            } else if (window.Swal) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: message
                });
            }
        }

        /**
         * Load more messages (pagination)
         */
        loadMoreMessages(chatId, beforeMessageId = null) {
            const url = `/chat/${chatId}/messages`;
            const data = beforeMessageId ? { before: beforeMessageId } : {};

            $.ajax({
                url: url,
                type: 'GET',
                data: data,
                headers: this.getAjaxHeaders(),
                success: (response) => {
                    this.handleLoadMoreSuccess(response);
                },
                error: (xhr) => {
                    this.showError('Failed to load messages');
                }
            });
        }

        /**
         * Handle load more success
         */
        handleLoadMoreSuccess(response) {
            if (response.messages && response.messages.length > 0) {
                const $container = $(this.selectors.chatMessages);
                const scrollHeight = $container[0].scrollHeight;
                
                // Prepend messages
                response.messages.forEach(message => {
                    const messageHtml = this.createMessageFromData(message);
                    $container.prepend(messageHtml);
                });
                
                // Maintain scroll position
                const newScrollHeight = $container[0].scrollHeight;
                $container.scrollTop(newScrollHeight - scrollHeight);
                
                this.triggerEvent('chat:messages:loaded', response);
            }
        }

        /**
         * Create message HTML from server data
         */
        createMessageFromData(messageData) {
            // This would depend on your message data structure
            const isCurrentUser = messageData.user_id == this.userInfo.currentUserId;
            const alignClass = isCurrentUser ? 'justify-content-end' : 'justify-content-start';
            const bubbleClass = isCurrentUser ? 'bg-primary text-white' : 'bg-light';
            
            return `
                <div class="chat-message mb-3" data-message-id="${messageData.id}">
                    <div class="d-flex ${alignClass}">
                        <div class="message-bubble ${bubbleClass} rounded p-2 max-width-75">
                            <div class="message-content">${this.escapeHtml(messageData.message)}</div>
                            <div class="message-meta">
                                <small class="message-time opacity-75">${this.formatTime(new Date(messageData.created_at))}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Register utility
    if (typeof window.KL !== 'undefined') {
        window.KL.registerUtility('chat', ChatUtility);
    }

})();