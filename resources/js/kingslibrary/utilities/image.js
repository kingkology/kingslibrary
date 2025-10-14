/**
 * KingsLibrary - Image Utilities
 * Handles image preview, validation, and file upload functionality
 * 
 * @version 3.0.0
 * @author KingsLibrary
 * @requires jQuery, SweetAlert2
 */

(function() {
    'use strict';

    // Image utility class
    class ImageUtility extends KL.BaseUtility {
        constructor() {
            super('Image');
            this.selectors = {
                imagePreview: '.image-input-preview',
                fileDropZone: '.file-drop-zone',
                imageGallery: '.image-gallery'
            };
            
            this.defaultConfig = {
                maxSize: 3 * 1024 * 1024, // 3MB in bytes
                allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
                previewWidth: 200,
                previewHeight: 200,
                showFilename: true,
                showFilesize: true
            };
        }

        initialize() {
            this.bindImagePreview();
            this.bindFileDropZones();
            this.bindImageGallery();
            this.log('Image utilities initialized');
        }

        /**
         * Bind image preview functionality
         */
        bindImagePreview() {
            $(document).on('change', this.selectors.imagePreview, (e) => {
                const input = e.target;
                const $input = $(input);
                
                // Get configuration from data attributes
                const config = this.getImageConfig($input);
                
                // Validate and preview files
                this.handleFileSelection(input, config);
            });
        }

        /**
         * Get image configuration from data attributes
         */
        getImageConfig($input) {
            return {
                maxSize: parseInt($input.data('max-size')) || this.defaultConfig.maxSize,
                allowedTypes: $input.data('allowed-types')?.split(',') || this.defaultConfig.allowedTypes,
                previewTarget: $input.data('preview-target'),
                previewContainer: $input.data('preview-container'),
                showFilename: $input.data('show-filename') !== false,
                showFilesize: $input.data('show-filesize') !== false,
                multiple: $input.prop('multiple')
            };
        }

        /**
         * Handle file selection and validation
         */
        handleFileSelection(input, config) {
            const files = input.files;
            
            if (!files || files.length === 0) {
                this.clearPreview(config);
                return;
            }

            // Validate files
            const validFiles = [];
            const errors = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const validation = this.validateFile(file, config);
                
                if (validation.valid) {
                    validFiles.push(file);
                } else {
                    errors.push(`${file.name}: ${validation.error}`);
                }
            }

            // Show validation errors
            if (errors.length > 0) {
                this.showValidationErrors(errors);
                
                // Clear invalid files from input
                input.value = '';
                this.clearPreview(config);
                return;
            }

            // Preview valid files
            if (validFiles.length > 0) {
                this.createPreviews(validFiles, config);
                this.triggerEvent('image:selected', { files: validFiles, input });
            }
        }

        /**
         * Validate individual file
         */
        validateFile(file, config) {
            // Check file type
            if (!config.allowedTypes.includes(file.type)) {
                return {
                    valid: false,
                    error: `Invalid file type. Allowed: ${config.allowedTypes.join(', ')}`
                };
            }

            // Check file size
            if (file.size > config.maxSize) {
                const maxSizeMB = (config.maxSize / (1024 * 1024)).toFixed(1);
                return {
                    valid: false,
                    error: `File too large. Maximum size: ${maxSizeMB}MB`
                };
            }

            return { valid: true };
        }

        /**
         * Create image previews
         */
        createPreviews(files, config) {
            if (config.previewTarget) {
                // Single preview target (for single file uploads)
                this.createSinglePreview(files[0], config);
            } else if (config.previewContainer) {
                // Multiple previews in container
                this.createMultiplePreviews(files, config);
            }
        }

        /**
         * Create single image preview
         */
        createSinglePreview(file, config) {
            const $target = $(`#${config.previewTarget}`);
            if (!$target.length) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                if ($target.is('img')) {
                    $target.attr('src', e.target.result);
                } else {
                    $target.html(`
                        <img src="${e.target.result}" 
                             alt="Preview" 
                             style="max-width: 100%; max-height: ${config.previewHeight || 200}px; object-fit: cover;">
                    `);
                }
                
                // Add file info if enabled
                if (config.showFilename || config.showFilesize) {
                    this.addFileInfo(file, $target.parent(), config);
                }
                
                this.triggerEvent('image:preview:created', { file, target: $target });
            };
            reader.readAsDataURL(file);
        }

        /**
         * Create multiple image previews
         */
        createMultiplePreviews(files, config) {
            const $container = $(config.previewContainer);
            if (!$container.length) return;

            // Clear existing previews if not appending
            if (!config.append) {
                $container.empty();
            }

            files.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const previewHtml = this.createPreviewHtml(file, e.target.result, config, index);
                    $container.append(previewHtml);
                    
                    this.triggerEvent('image:preview:added', { file, container: $container, index });
                };
                reader.readAsDataURL(file);
            });
        }

        /**
         * Create preview HTML
         */
        createPreviewHtml(file, src, config, index) {
            const fileSize = this.formatFileSize(file.size);
            const fileName = file.name;
            
            return `
                <div class="image-preview-item" data-index="${index}">
                    <div class="image-preview-wrapper position-relative">
                        <img src="${src}" 
                             alt="${fileName}" 
                             class="img-thumbnail" 
                             style="width: ${config.previewWidth || 150}px; height: ${config.previewHeight || 150}px; object-fit: cover;">
                        <button type="button" 
                                class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 remove-preview" 
                                data-index="${index}" 
                                title="Remove">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    ${config.showFilename ? `<small class="text-muted d-block mt-1">${fileName}</small>` : ''}
                    ${config.showFilesize ? `<small class="text-muted d-block">${fileSize}</small>` : ''}
                </div>
            `;
        }

        /**
         * Add file information
         */
        addFileInfo(file, $container, config) {
            const existingInfo = $container.find('.file-info');
            existingInfo.remove();
            
            let infoHtml = '<div class="file-info mt-2">';
            
            if (config.showFilename) {
                infoHtml += `<small class="text-muted d-block"><i class="fas fa-file"></i> ${file.name}</small>`;
            }
            
            if (config.showFilesize) {
                infoHtml += `<small class="text-muted d-block"><i class="fas fa-hdd"></i> ${this.formatFileSize(file.size)}</small>`;
            }
            
            infoHtml += '</div>';
            
            $container.append(infoHtml);
        }

        /**
         * Bind file drop zones
         */
        bindFileDropZones() {
            // Prevent default drag behaviors
            $(document).on('dragenter dragover dragleave drop', this.selectors.fileDropZone, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });

            // Handle drag enter/over
            $(document).on('dragenter dragover', this.selectors.fileDropZone, (e) => {
                $(e.currentTarget).addClass('drag-over');
            });

            // Handle drag leave
            $(document).on('dragleave', this.selectors.fileDropZone, (e) => {
                $(e.currentTarget).removeClass('drag-over');
            });

            // Handle file drop
            $(document).on('drop', this.selectors.fileDropZone, (e) => {
                const $dropZone = $(e.currentTarget);
                $dropZone.removeClass('drag-over');
                
                const files = e.originalEvent.dataTransfer.files;
                const targetInput = $dropZone.data('target-input');
                
                if (files.length > 0 && targetInput) {
                    const $input = $(targetInput);
                    if ($input.length) {
                        // Create a new FileList and assign to input
                        this.assignFilesToInput($input[0], files);
                        
                        // Trigger change event to process files
                        $input.trigger('change');
                    }
                }
            });
        }

        /**
         * Assign files to input element
         */
        assignFilesToInput(input, files) {
            // Create a new DataTransfer object to hold files
            const dt = new DataTransfer();
            
            // Add files to DataTransfer
            for (let i = 0; i < files.length; i++) {
                dt.items.add(files[i]);
            }
            
            // Assign files to input
            input.files = dt.files;
        }

        /**
         * Bind image gallery functionality
         */
        bindImageGallery() {
            // Remove preview functionality
            $(document).on('click', '.remove-preview', (e) => {
                e.preventDefault();
                const $button = $(e.currentTarget);
                const index = parseInt($button.data('index'));
                const $previewItem = $button.closest('.image-preview-item');
                
                // Remove preview item
                $previewItem.fadeOut(300, () => {
                    $previewItem.remove();
                    this.triggerEvent('image:preview:removed', { index });
                });
            });

            // Image gallery lightbox (if needed)
            $(document).on('click', '.image-gallery img', (e) => {
                const $img = $(e.currentTarget);
                const src = $img.attr('src');
                const title = $img.attr('alt') || 'Image';
                
                this.showImageLightbox(src, title);
            });
        }

        /**
         * Show image in lightbox
         */
        showImageLightbox(src, title) {
            if (window.Swal) {
                Swal.fire({
                    title: title,
                    imageUrl: src,
                    imageAlt: title,
                    showConfirmButton: false,
                    showCloseButton: true,
                    customClass: {
                        popup: 'image-lightbox'
                    }
                });
            } else {
                // Fallback: open in new window
                window.open(src, '_blank');
            }
        }

        /**
         * Clear preview
         */
        clearPreview(config) {
            if (config.previewTarget) {
                const $target = $(`#${config.previewTarget}`);
                if ($target.is('img')) {
                    $target.attr('src', '');
                } else {
                    $target.empty();
                }
            }
            
            if (config.previewContainer) {
                $(config.previewContainer).empty();
            }
        }

        /**
         * Show validation errors
         */
        showValidationErrors(errors) {
            const errorMessage = errors.join('\n');
            
            if (window.Swal) {
                Swal.fire({
                    icon: 'error',
                    title: 'File Validation Error',
                    text: errorMessage,
                    customClass: {
                        popup: 'file-validation-error'
                    }
                });
            } else {
                alert('File Validation Errors:\n' + errorMessage);
            }
        }

        /**
         * Format file size
         */
        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
        }

        /**
         * Get file extension
         */
        getFileExtension(filename) {
            return filename.split('.').pop().toLowerCase();
        }

        /**
         * Create thumbnail from file
         */
        createThumbnail(file, maxWidth = 150, maxHeight = 150) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        // Calculate dimensions
                        let { width, height } = this.calculateDimensions(img.width, img.height, maxWidth, maxHeight);
                        
                        canvas.width = width;
                        canvas.height = height;
                        
                        // Draw resized image
                        ctx.drawImage(img, 0, 0, width, height);
                        
                        // Convert to blob
                        canvas.toBlob(resolve, 'image/jpeg', 0.8);
                    };
                    img.src = e.target.result;
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        /**
         * Calculate proportional dimensions
         */
        calculateDimensions(originalWidth, originalHeight, maxWidth, maxHeight) {
            let width = originalWidth;
            let height = originalHeight;
            
            // Calculate aspect ratio
            const aspectRatio = originalWidth / originalHeight;
            
            if (width > maxWidth) {
                width = maxWidth;
                height = width / aspectRatio;
            }
            
            if (height > maxHeight) {
                height = maxHeight;
                width = height * aspectRatio;
            }
            
            return { width, height };
        }
    }

    // Register utility
    if (typeof window.KL !== 'undefined') {
        window.KL.registerUtility('image', ImageUtility);
    }

})();