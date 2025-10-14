/**
 * Media Utility - Handles file uploads, image previews, and media management
 * Supports CSS classes: .file-upload, .image-preview, .file-drop-zone
 */

class MediaUtility extends BaseUtility {
    constructor(kingsLibrary) {
        super(kingsLibrary);
        
        this.uploadConfig = {
            maxFileSize: 10 * 1024 * 1024, // 10MB
            allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
            uploadUrl: '/api/upload',
            previewContainer: '.image-preview-container'
        };
        
        this.activeUploads = new Map();
    }
    
    bindEvents() {
        // Handle file upload inputs
        document.addEventListener('change', (e) => {
            if (e.target.matches('.file-upload')) {
                this.handleFileSelect(e.target);
            }
        });
        
        // Handle drag and drop
        document.addEventListener('dragover', (e) => {
            if (e.target.matches('.file-drop-zone') || e.target.closest('.file-drop-zone')) {
                e.preventDefault();
                const dropZone = e.target.closest('.file-drop-zone') || e.target;
                dropZone.classList.add('drag-over');
            }
        });
        
        document.addEventListener('dragleave', (e) => {
            if (e.target.matches('.file-drop-zone') || e.target.closest('.file-drop-zone')) {
                const dropZone = e.target.closest('.file-drop-zone') || e.target;
                dropZone.classList.remove('drag-over');
            }
        });
        
        document.addEventListener('drop', (e) => {
            if (e.target.matches('.file-drop-zone') || e.target.closest('.file-drop-zone')) {
                e.preventDefault();
                const dropZone = e.target.closest('.file-drop-zone') || e.target;
                dropZone.classList.remove('drag-over');
                this.handleFileDrop(e.dataTransfer.files, dropZone);
            }
        });
        
        // Handle remove preview buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.remove-preview')) {
                e.preventDefault();
                this.removePreview(e.target);
            }
        });
    }
    
    /**
     * Handle file selection from input
     * @param {HTMLInputElement} input - File input element
     */
    handleFileSelect(input) {
        const files = Array.from(input.files);
        const container = this.getPreviewContainer(input);
        
        files.forEach(file => {
            if (this.validateFile(file)) {
                this.createPreview(file, container, input);
                
                // Auto-upload if configured
                if (input.dataset.autoUpload === 'true') {
                    this.uploadFile(file, input);
                }
            }
        });
    }
    
    /**
     * Handle drag and drop files
     * @param {FileList} files - Dropped files
     * @param {HTMLElement} dropZone - Drop zone element
     */
    handleFileDrop(files, dropZone) {
        const fileArray = Array.from(files);
        const container = this.getPreviewContainer(dropZone);
        
        fileArray.forEach(file => {
            if (this.validateFile(file)) {
                this.createPreview(file, container, dropZone);
                
                // Auto-upload if configured
                if (dropZone.dataset.autoUpload === 'true') {
                    this.uploadFile(file, dropZone);
                }
            }
        });
    }
    
    /**
     * Validate file before processing
     * @param {File} file - File to validate
     * @returns {boolean} Is file valid
     */
    validateFile(file) {
        // Check file size
        if (file.size > this.uploadConfig.maxFileSize) {
            this.kl.error(`File "${file.name}" is too large. Maximum size is ${this.formatFileSize(this.uploadConfig.maxFileSize)}`);
            return false;
        }
        
        // Check file type
        if (!this.uploadConfig.allowedTypes.includes(file.type)) {
            this.kl.error(`File type "${file.type}" is not allowed.`);
            return false;
        }
        
        return true;
    }
    
    /**
     * Create image preview
     * @param {File} file - File to preview
     * @param {HTMLElement} container - Preview container
     * @param {HTMLElement} source - Source element
     */
    createPreview(file, container, source) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const previewId = 'preview-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            
            const previewHTML = `
                <div class="image-preview" data-preview-id="${previewId}">
                    <img src="${e.target.result}" alt="${file.name}" class="preview-image">
                    <div class="preview-info">
                        <span class="file-name">${file.name}</span>
                        <span class="file-size">${this.formatFileSize(file.size)}</span>
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
            
            container.insertAdjacentHTML('beforeend', previewHTML);
            
            // Store file reference
            const previewElement = container.querySelector(`[data-preview-id="${previewId}"]`);
            previewElement._file = file;
            previewElement._source = source;
        };
        
        reader.readAsDataURL(file);
    }
    
    /**
     * Upload file to server
     * @param {File} file - File to upload
     * @param {HTMLElement} source - Source element
     */
    async uploadFile(file, source) {
        const uploadUrl = source.dataset.uploadUrl || this.uploadConfig.uploadUrl;
        const previewElement = document.querySelector(`[data-preview-id] img[alt="${file.name}"]`)?.closest('.image-preview');
        
        if (!previewElement) return;
        
        const progressContainer = previewElement.querySelector('.upload-progress');
        const progressBar = previewElement.querySelector('.progress-bar');
        
        progressContainer.style.display = 'block';
        
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            // Add CSRF token if available
            if (this.kl.config.csrfToken) {
                formData.append('_token', this.kl.config.csrfToken);
            }
            
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            if (response.ok) {
                const result = await response.json();
                this.handleUploadSuccess(previewElement, result);
            } else {
                throw new Error(`Upload failed: ${response.statusText}`);
            }
        } catch (error) {
            this.handleUploadError(previewElement, error);
        }
    }
    
    /**
     * Handle successful upload
     * @param {HTMLElement} previewElement - Preview element
     * @param {Object} result - Upload result
     */
    handleUploadSuccess(previewElement, result) {
        const progressContainer = previewElement.querySelector('.upload-progress');
        progressContainer.style.display = 'none';
        
        previewElement.classList.add('upload-success');
        
        // Store upload result
        previewElement.dataset.uploadResult = JSON.stringify(result);
        
        // Emit success event
        previewElement.dispatchEvent(new CustomEvent('kingslibrary:upload:success', {
            detail: { result, element: previewElement }
        }));
        
        this.kl.success('File uploaded successfully!');
    }
    
    /**
     * Handle upload error
     * @param {HTMLElement} previewElement - Preview element
     * @param {Error} error - Upload error
     */
    handleUploadError(previewElement, error) {
        const progressContainer = previewElement.querySelector('.upload-progress');
        progressContainer.style.display = 'none';
        
        previewElement.classList.add('upload-error');
        
        // Emit error event
        previewElement.dispatchEvent(new CustomEvent('kingslibrary:upload:error', {
            detail: { error, element: previewElement }
        }));
        
        this.kl.error(`Upload failed: ${error.message}`);
    }
    
    /**
     * Remove preview
     * @param {HTMLElement} button - Remove button
     */
    removePreview(button) {
        const preview = button.closest('.image-preview');
        if (preview) {
            // Emit remove event
            preview.dispatchEvent(new CustomEvent('kingslibrary:preview:removed', {
                detail: { element: preview }
            }));
            
            preview.remove();
        }
    }
    
    /**
     * Get preview container for source element
     * @param {HTMLElement} source - Source element
     * @returns {HTMLElement} Preview container
     */
    getPreviewContainer(source) {
        const containerId = source.dataset.previewContainer;
        
        if (containerId) {
            return document.querySelector(containerId);
        }
        
        // Look for container in parent elements
        let container = source.parentNode.querySelector('.image-preview-container');
        if (!container) {
            container = source.closest('.file-upload-wrapper')?.querySelector('.image-preview-container');
        }
        
        // Create default container if none found
        if (!container) {
            container = document.createElement('div');
            container.className = 'image-preview-container';
            source.parentNode.insertBefore(container, source.nextSibling);
        }
        
        return container;
    }
    
    /**
     * Format file size in human readable format
     * @param {number} bytes - File size in bytes
     * @returns {string} Formatted size
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    /**
     * Initialize utility for dynamically added elements
     * @param {HTMLElement} element - Element to initialize
     */
    initializeElement(element) {
        // Initialize file uploads within the element
        const uploads = element.matches('.file-upload') ? 
                       [element] : 
                       element.querySelectorAll('.file-upload');
        
        uploads.forEach(upload => {
            if (!upload.dataset.initialized) {
                upload.dataset.initialized = 'true';
            }
        });
        
        // Initialize drop zones
        const dropZones = element.matches('.file-drop-zone') ? 
                         [element] : 
                         element.querySelectorAll('.file-drop-zone');
        
        dropZones.forEach(zone => {
            if (!zone.dataset.initialized) {
                zone.dataset.initialized = 'true';
            }
        });
    }
}

// Auto-register with KingsLibrary if available
if (typeof window !== 'undefined' && window.KL) {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof MediaUtility !== 'undefined') {
            window.KL.registerUtility('media', MediaUtility);
        }
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MediaUtility;
}

// Global exposure
window.MediaUtility = MediaUtility;