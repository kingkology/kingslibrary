<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Snippets - KingsLibrary v3.0</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <!-- Prism.js for syntax highlighting -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet">
    
    <style>
        .snippet-card {
            transition: transform 0.2s;
        }
        .snippet-card:hover {
            transform: translateY(-2px);
        }
        .code-block {
            position: relative;
        }
        .copy-btn {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            z-index: 10;
        }
        .difficulty-badge {
            position: absolute;
            top: -8px;
            right: -8px;
        }
        .category-filter {
            cursor: pointer;
            transition: all 0.3s;
        }
        .category-filter.active {
            background: var(--bs-primary);
            color: white;
        }
        pre[class*="language-"] {
            margin: 0;
            border-radius: 0.375rem;
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="{{ route('docs.index') }}">
                <i class="fas fa-crown text-warning"></i> <strong>KingsLibrary</strong> <span class="badge bg-success">v1.0</span>
            </a>
            
            <div class="navbar-nav ms-auto">
                <a class="nav-link" href="{{ route('docs.index') }}">
                    <i class="fas fa-home"></i> Home
                </a>
                <a class="nav-link" href="{{ route('docs.playground') }}">
                    <i class="fas fa-play"></i> Playground
                </a>
                <a class="nav-link active" href="{{ route('docs.snippets') }}">
                    <i class="fas fa-code"></i> Snippets
                </a>
            </div>
        </div>
    </nav>

    <div class="container-fluid mt-4">
        <div class="row">
            <!-- Sidebar with Filters -->
            <div class="col-lg-3">
                <div class="card">
                    <div class="card-header">
                        <h5><i class="fas fa-filter"></i> Categories</h5>
                    </div>
                    <div class="list-group list-group-flush">
                        <button class="list-group-item category-filter active" data-category="all">
                            <i class="fas fa-th"></i> All Snippets <span class="badge bg-secondary ms-auto">15</span>
                        </button>
                        <button class="list-group-item category-filter" data-category="forms">
                            <i class="fas fa-wpforms"></i> Forms & Validation <span class="badge bg-secondary ms-auto">5</span>
                        </button>
                        <button class="list-group-item category-filter" data-category="tables">
                            <i class="fas fa-table"></i> Data Tables <span class="badge bg-secondary ms-auto">3</span>
                        </button>
                        <button class="list-group-item category-filter" data-category="notifications">
                            <i class="fas fa-bell"></i> Notifications <span class="badge bg-secondary ms-auto">4</span>
                        </button>
                        <button class="list-group-item category-filter" data-category="media">
                            <i class="fas fa-image"></i> File Upload <span class="badge bg-secondary ms-auto">3</span>
                        </button>
                    </div>
                </div>
                
                <div class="card mt-3">
                    <div class="card-header">
                        <h6><i class="fas fa-graduation-cap"></i> Difficulty</h6>
                    </div>
                    <div class="card-body">
                        <div class="form-check">
                            <input class="form-check-input difficulty-filter" type="checkbox" id="beginner" data-level="beginner" checked>
                            <label class="form-check-label" for="beginner">
                                <span class="badge bg-success">Beginner</span>
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input difficulty-filter" type="checkbox" id="intermediate" data-level="intermediate" checked>
                            <label class="form-check-label" for="intermediate">
                                <span class="badge bg-warning">Intermediate</span>
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input difficulty-filter" type="checkbox" id="advanced" data-level="advanced" checked>
                            <label class="form-check-label" for="advanced">
                                <span class="badge bg-danger">Advanced</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Main Content -->
            <div class="col-lg-9">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2><i class="fas fa-code text-primary"></i> Code Snippets</h2>
                        <p class="text-muted">Ready-to-use code examples for KingsLibrary features</p>
                    </div>
                    
                    <div class="input-group" style="max-width: 300px;">
                        <input type="text" class="form-control" id="search-snippets" placeholder="Search snippets...">
                        <span class="input-group-text">
                            <i class="fas fa-search"></i>
                        </span>
                    </div>
                </div>
                
                <!-- Snippets Grid -->
                <div class="row" id="snippets-container">
                    
                    <!-- AJAX Form Snippet -->
                    <div class="col-lg-6 mb-4 snippet-item" data-category="forms" data-difficulty="beginner">
                        <div class="card snippet-card h-100">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="mb-0"><i class="fas fa-paper-plane"></i> Basic AJAX Form</h6>
                                <span class="badge bg-success difficulty-badge">Beginner</span>
                            </div>
                            <div class="card-body">
                                <p class="text-muted">Simple form with automatic AJAX submission and validation</p>
                                <div class="code-block">
                                    <button class="btn btn-sm btn-outline-primary copy-btn" onclick="copyCode(this)">
                                        <i class="fas fa-copy"></i> Copy
                                    </button>
                                    <pre><code class="language-html">&lt;form class="ajax-form" data-action="/api/contact"&gt;
    &lt;input type="text" name="name" class="form-control validate-field" required&gt;
    &lt;input type="email" name="email" class="form-control validate-email" required&gt;
    &lt;button type="submit" class="btn btn-primary"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- DataTable Snippet -->
                    <div class="col-lg-6 mb-4 snippet-item" data-category="tables" data-difficulty="beginner">
                        <div class="card snippet-card h-100">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="mb-0"><i class="fas fa-table"></i> DataTable with Export</h6>
                                <span class="badge bg-success difficulty-badge">Beginner</span>
                            </div>
                            <div class="card-body">
                                <p class="text-muted">Auto-initialized table with pagination and export buttons</p>
                                <div class="code-block">
                                    <button class="btn btn-sm btn-outline-primary copy-btn" onclick="copyCode(this)">
                                        <i class="fas fa-copy"></i> Copy
                                    </button>
                                    <pre><code class="language-html">&lt;table class="datatable-init table" data-page-length="25"&gt;
    &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Name&lt;/th&gt;&lt;th&gt;Email&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;
    &lt;tbody&gt;...&lt;/tbody&gt;
&lt;/table&gt;

&lt;button class="btn btn-success export-excel" data-table="table"&gt;
    Export Excel
&lt;/button&gt;</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Password Strength -->
                    <div class="col-lg-6 mb-4 snippet-item" data-category="forms" data-difficulty="intermediate">
                        <div class="card snippet-card h-100">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="mb-0"><i class="fas fa-lock"></i> Password Strength Meter</h6>
                                <span class="badge bg-warning difficulty-badge">Intermediate</span>
                            </div>
                            <div class="card-body">
                                <p class="text-muted">Real-time password strength validation with visual feedback</p>
                                <div class="code-block">
                                    <button class="btn btn-sm btn-outline-primary copy-btn" onclick="copyCode(this)">
                                        <i class="fas fa-copy"></i> Copy
                                    </button>
                                    <pre><code class="language-html">&lt;div class="password-strength"&gt;
    &lt;input type="password" class="form-control password-strength__input"&gt;
    &lt;div class="password-strength__bar"&gt;&lt;/div&gt;
    &lt;small class="password-strength__text"&gt;&lt;/small&gt;
&lt;/div&gt;</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- SweetAlert Notification -->
                    <div class="col-lg-6 mb-4 snippet-item" data-category="notifications" data-difficulty="beginner">
                        <div class="card snippet-card h-100">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="mb-0"><i class="fas fa-bell"></i> SweetAlert Notification</h6>
                                <span class="badge bg-success difficulty-badge">Beginner</span>
                            </div>
                            <div class="card-body">
                                <p class="text-muted">Beautiful popup notifications with custom styling</p>
                                <div class="code-block">
                                    <button class="btn btn-sm btn-outline-primary copy-btn" onclick="copyCode(this)">
                                        <i class="fas fa-copy"></i> Copy
                                    </button>
                                    <pre><code class="language-html">&lt;button class="btn btn-primary notification-trigger" 
        data-type="success" 
        data-title="Success!" 
        data-message="Operation completed successfully"&gt;
    Show Notification
&lt;/button&gt;</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- File Upload -->
                    <div class="col-lg-6 mb-4 snippet-item" data-category="media" data-difficulty="intermediate">
                        <div class="card snippet-card h-100">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="mb-0"><i class="fas fa-upload"></i> Drag & Drop Upload</h6>
                                <span class="badge bg-warning difficulty-badge">Intermediate</span>
                            </div>
                            <div class="card-body">
                                <p class="text-muted">File upload with drag-drop support and image preview</p>
                                <div class="code-block">
                                    <button class="btn btn-sm btn-outline-primary copy-btn" onclick="copyCode(this)">
                                        <i class="fas fa-copy"></i> Copy
                                    </button>
                                    <pre><code class="language-html">&lt;input type="file" class="form-control file-upload" 
       data-upload-url="/api/upload" 
       data-auto-upload="true" 
       accept="image/*" multiple&gt;

&lt;div class="file-drop-zone"&gt;
    Drop files here or click to select
&lt;/div&gt;</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Advanced Form Validation -->
                    <div class="col-lg-6 mb-4 snippet-item" data-category="forms" data-difficulty="advanced">
                        <div class="card snippet-card h-100">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="mb-0"><i class="fas fa-shield-alt"></i> Advanced Validation</h6>
                                <span class="badge bg-danger difficulty-badge">Advanced</span>
                            </div>
                            <div class="card-body">
                                <p class="text-muted">Complex form with multiple validation rules and custom messages</p>
                                <div class="code-block">
                                    <button class="btn btn-sm btn-outline-primary copy-btn" onclick="copyCode(this)">
                                        <i class="fas fa-copy"></i> Copy
                                    </button>
                                    <pre><code class="language-html">&lt;form class="ajax-form" 
      data-action="/api/register" 
      data-validate-before-submit="true"&gt;
    
    &lt;input type="text" name="username" 
           class="form-control validate-field validate-username" 
           data-min-length="3" 
           data-pattern="^[a-zA-Z0-9_]+$" 
           data-error-message="Username must be 3+ chars, letters/numbers only"&gt;
           
    &lt;input type="password" name="password" 
           class="form-control password-strength__input validate-password" 
           data-min-strength="3"&gt;
           
    &lt;button type="submit"&gt;Register&lt;/button&gt;
&lt;/form&gt;</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Custom DataTable -->
                    <div class="col-lg-6 mb-4 snippet-item" data-category="tables" data-difficulty="advanced">
                        <div class="card snippet-card h-100">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="mb-0"><i class="fas fa-cogs"></i> Custom DataTable</h6>
                                <span class="badge bg-danger difficulty-badge">Advanced</span>
                            </div>
                            <div class="card-body">
                                <p class="text-muted">Highly customized table with server-side processing</p>
                                <div class="code-block">
                                    <button class="btn btn-sm btn-outline-primary copy-btn" onclick="copyCode(this)">
                                        <i class="fas fa-copy"></i> Copy
                                    </button>
                                    <pre><code class="language-html">&lt;table class="datatable-init table" 
       data-ajax-url="/api/users" 
       data-server-side="true" 
       data-page-length="50" 
       data-fixed-header="true" 
       data-responsive="true" 
       data-select="true" 
       data-buttons='["copy", "excel", "pdf"]'&gt;
       
    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th data-orderable="false"&gt;Select&lt;/th&gt;
            &lt;th&gt;Name&lt;/th&gt;
            &lt;th data-searchable="false"&gt;Actions&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
&lt;/table&gt;</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Toast Notifications -->
                    <div class="col-lg-6 mb-4 snippet-item" data-category="notifications" data-difficulty="beginner">
                        <div class="card snippet-card h-100">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="mb-0"><i class="fas fa-comment"></i> Toast Messages</h6>
                                <span class="badge bg-success difficulty-badge">Beginner</span>
                            </div>
                            <div class="card-body">
                                <p class="text-muted">Lightweight notification toasts with auto-hide</p>
                                <div class="code-block">
                                    <button class="btn btn-sm btn-outline-primary copy-btn" onclick="copyCode(this)">
                                        <i class="fas fa-copy"></i> Copy
                                    </button>
                                    <pre><code class="language-html">&lt;button class="btn btn-info toast-trigger" 
        data-type="info" 
        data-title="New Message" 
        data-message="You have a new notification" 
        data-position="top-end" 
        data-duration="5000"&gt;
    Show Toast
&lt;/button&gt;</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Confirmation Dialog -->
                    <div class="col-lg-6 mb-4 snippet-item" data-category="notifications" data-difficulty="intermediate">
                        <div class="card snippet-card h-100">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="mb-0"><i class="fas fa-question-circle"></i> Confirmation Dialog</h6>
                                <span class="badge bg-warning difficulty-badge">Intermediate</span>
                            </div>
                            <div class="card-body">
                                <p class="text-muted">Smart confirmation dialogs with custom actions</p>
                                <div class="code-block">
                                    <button class="btn btn-sm btn-outline-primary copy-btn" onclick="copyCode(this)">
                                        <i class="fas fa-copy"></i> Copy
                                    </button>
                                    <pre><code class="language-html">&lt;button class="btn btn-danger confirmation-trigger" 
        data-title="Delete Item" 
        data-message="Are you sure you want to delete this item?" 
        data-confirm-text="Yes, Delete" 
        data-cancel-text="Cancel" 
        data-action="/api/delete/123" 
        data-method="DELETE"&gt;
    Delete Item
&lt;/button&gt;</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Image Upload with Preview -->
                    <div class="col-lg-6 mb-4 snippet-item" data-category="media" data-difficulty="intermediate">
                        <div class="card snippet-card h-100">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="mb-0"><i class="fas fa-image"></i> Image Preview Upload</h6>
                                <span class="badge bg-warning difficulty-badge">Intermediate</span>
                            </div>
                            <div class="card-body">
                                <p class="text-muted">Image upload with instant preview and validation</p>
                                <div class="code-block">
                                    <button class="btn btn-sm btn-outline-primary copy-btn" onclick="copyCode(this)">
                                        <i class="fas fa-copy"></i> Copy
                                    </button>
                                    <pre><code class="language-html">&lt;input type="file" class="form-control file-upload image-preview" 
       accept="image/*" 
       data-max-size="5242880" 
       data-allowed-types="jpg,jpeg,png,gif" 
       data-preview-container=".image-preview-container"&gt;

&lt;div class="image-preview-container mt-3"&gt;&lt;/div&gt;</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Form with Real-time Validation -->
                    <div class="col-lg-6 mb-4 snippet-item" data-category="forms" data-difficulty="intermediate">
                        <div class="card snippet-card h-100">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="mb-0"><i class="fas fa-check-circle"></i> Real-time Validation</h6>
                                <span class="badge bg-warning difficulty-badge">Intermediate</span>
                            </div>
                            <div class="card-body">
                                <p class="text-muted">Form fields with instant validation feedback</p>
                                <div class="code-block">
                                    <button class="btn btn-sm btn-outline-primary copy-btn" onclick="copyCode(this)">
                                        <i class="fas fa-copy"></i> Copy
                                    </button>
                                    <pre><code class="language-html">&lt;form class="ajax-form real-time-validation"&gt;
    &lt;input type="email" name="email" 
           class="form-control validate-field validate-email real-time" 
           data-validate-on="blur"&gt;
    
    &lt;input type="tel" name="phone" 
           class="form-control validate-field validate-phone real-time" 
           data-pattern="^\+?[\d\s\-\(\)]+$"&gt;
           
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Advanced File Manager -->
                    <div class="col-lg-6 mb-4 snippet-item" data-category="media" data-difficulty="advanced">
                        <div class="card snippet-card h-100">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="mb-0"><i class="fas fa-folder-open"></i> File Manager Widget</h6>
                                <span class="badge bg-danger difficulty-badge">Advanced</span>
                            </div>
                            <div class="card-body">
                                <p class="text-muted">Complete file management with upload, delete, and organization</p>
                                <div class="code-block">
                                    <button class="btn btn-sm btn-outline-primary copy-btn" onclick="copyCode(this)">
                                        <i class="fas fa-copy"></i> Copy
                                    </button>
                                    <pre><code class="language-html">&lt;div class="file-manager" 
     data-upload-url="/api/files/upload" 
     data-delete-url="/api/files/delete" 
     data-list-url="/api/files/list" 
     data-allowed-types="jpg,jpeg,png,pdf,doc,docx" 
     data-max-files="10"&gt;
     
    &lt;div class="file-upload-zone"&gt;&lt;/div&gt;
    &lt;div class="file-list-container"&gt;&lt;/div&gt;
    &lt;div class="file-actions"&gt;
        &lt;button class="btn btn-danger bulk-delete"&gt;Delete Selected&lt;/button&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Multi-step Form -->
                    <div class="col-lg-6 mb-4 snippet-item" data-category="forms" data-difficulty="advanced">
                        <div class="card snippet-card h-100">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="mb-0"><i class="fas fa-list-ol"></i> Multi-step Form</h6>
                                <span class="badge bg-danger difficulty-badge">Advanced</span>
                            </div>
                            <div class="card-body">
                                <p class="text-muted">Wizard-style form with step validation and progress tracking</p>
                                <div class="code-block">
                                    <button class="btn btn-sm btn-outline-primary copy-btn" onclick="copyCode(this)">
                                        <i class="fas fa-copy"></i> Copy
                                    </button>
                                    <pre><code class="language-html">&lt;form class="multi-step-form ajax-form" data-current-step="1"&gt;
    &lt;div class="step-indicator"&gt;&lt;/div&gt;
    
    &lt;div class="step" data-step="1"&gt;
        &lt;input type="text" name="first_name" class="validate-field" required&gt;
        &lt;button type="button" class="btn btn-primary next-step"&gt;Next&lt;/button&gt;
    &lt;/div&gt;
    
    &lt;div class="step" data-step="2" style="display: none;"&gt;
        &lt;input type="email" name="email" class="validate-email" required&gt;
        &lt;button type="button" class="btn btn-secondary prev-step"&gt;Previous&lt;/button&gt;
        &lt;button type="submit" class="btn btn-success"&gt;Complete&lt;/button&gt;
    &lt;/div&gt;
&lt;/form&gt;</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Auto-complete Search -->
                    <div class="col-lg-6 mb-4 snippet-item" data-category="forms" data-difficulty="intermediate">
                        <div class="card snippet-card h-100">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6 class="mb-0"><i class="fas fa-search"></i> Auto-complete Search</h6>
                                <span class="badge bg-warning difficulty-badge">Intermediate</span>
                            </div>
                            <div class="card-body">
                                <p class="text-muted">Smart search input with auto-complete suggestions</p>
                                <div class="code-block">
                                    <button class="btn btn-sm btn-outline-primary copy-btn" onclick="copyCode(this)">
                                        <i class="fas fa-copy"></i> Copy
                                    </button>
                                    <pre><code class="language-html">&lt;input type="text" 
       class="form-control auto-complete" 
       data-source="/api/search" 
       data-min-length="2" 
       data-delay="300" 
       data-result-template="&lt;div&gt;@{{name}} - @{{email}}&lt;/div&gt;" 
       placeholder="Search users..."&gt;

&lt;div class="auto-complete-results"&gt;&lt;/div&gt;</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <!-- No Results Message -->
                <div id="no-results" class="text-center py-5" style="display: none;">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">No snippets found</h4>
                    <p class="text-muted">Try adjusting your search criteria or filters</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
    
    <script>
        // Copy code functionality - uses KingsLibrary notifications
        function copyCode(button) {
            const codeBlock = button.nextElementSibling.querySelector('code');
            const text = codeBlock.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                // Use KingsLibrary notification if available
                if (window.KL && window.KL.utilities && window.KL.utilities.has('notification')) {
                    const notification = window.KL.utilities.get('notification');
                    notification.success('Code copied to clipboard!', 'Success');
                } else {
                    // Fallback visual feedback
                    const originalIcon = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    button.classList.remove('btn-outline-primary');
                    button.classList.add('btn-success');
                    
                    setTimeout(() => {
                        button.innerHTML = originalIcon;
                        button.classList.remove('btn-success');
                        button.classList.add('btn-outline-primary');
                    }, 2000);
                }
            }).catch(err => {
                // Use KingsLibrary notification for error if available
                if (window.KL && window.KL.utilities && window.KL.utilities.has('notification')) {
                    const notification = window.KL.utilities.get('notification');
                    notification.error('Failed to copy code', 'Error');
                } else {
                    alert('Failed to copy code to clipboard');
                }
            });
        }
        
        // Filter functionality
        document.addEventListener('DOMContentLoaded', function() {
            const categoryFilters = document.querySelectorAll('.category-filter');
            const difficultyFilters = document.querySelectorAll('.difficulty-filter');
            const searchInput = document.getElementById('search-snippets');
            const snippetsContainer = document.getElementById('snippets-container');
            const noResults = document.getElementById('no-results');
            
            function filterSnippets() {
                const activeCategory = document.querySelector('.category-filter.active').dataset.category;
                const activeDifficulties = Array.from(document.querySelectorAll('.difficulty-filter:checked'))
                    .map(cb => cb.dataset.level);
                const searchTerm = searchInput.value.toLowerCase();
                
                const snippets = document.querySelectorAll('.snippet-item');
                let visibleCount = 0;
                
                snippets.forEach(snippet => {
                    const category = snippet.dataset.category;
                    const difficulty = snippet.dataset.difficulty;
                    const text = snippet.textContent.toLowerCase();
                    
                    const categoryMatch = activeCategory === 'all' || category === activeCategory;
                    const difficultyMatch = activeDifficulties.includes(difficulty);
                    const searchMatch = searchTerm === '' || text.includes(searchTerm);
                    
                    if (categoryMatch && difficultyMatch && searchMatch) {
                        snippet.style.display = 'block';
                        visibleCount++;
                    } else {
                        snippet.style.display = 'none';
                    }
                });
                
                // Show/hide no results message
                if (visibleCount === 0) {
                    snippetsContainer.style.display = 'none';
                    noResults.style.display = 'block';
                } else {
                    snippetsContainer.style.display = 'flex';
                    noResults.style.display = 'none';
                }
            }
            
            // Category filter event listeners
            categoryFilters.forEach(filter => {
                filter.addEventListener('click', function() {
                    categoryFilters.forEach(f => f.classList.remove('active'));
                    this.classList.add('active');
                    filterSnippets();
                });
            });
            
            // Difficulty filter event listeners
            difficultyFilters.forEach(filter => {
                filter.addEventListener('change', filterSnippets);
            });
            
            // Search input event listener
            searchInput.addEventListener('input', filterSnippets);
            
            // Initialize Prism syntax highlighting
            Prism.highlightAll();
        });
    </script>
</body>
</html>