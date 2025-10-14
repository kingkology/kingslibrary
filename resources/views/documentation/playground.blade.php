@extends('layouts.app')

@section('title', 'Interactive Playground - KingsLibrary v1.0')

@push('styles')
<style>
    /* Playground specific styles */
    .playground-container {
        min-height: calc(100vh - 200px);
    }
    
    .playground-row {
        min-height: 600px;
    }
    

    

    

    
    /* Code editor improvements */
    #html-code {
        border-radius: 0 !important;
        border: none !important;
        outline: none !important;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace !important;
        font-size: 14px;
        line-height: 1.5;
        resize: none;
        min-height: 500px !important;
    }
    
    #html-code:focus {
        box-shadow: none !important;
    }
    
    /* Preview area improvements */
    #preview-area {
        border-radius: 0;
        min-height: 500px !important;
        padding: 20px !important;
        background: #ffffff !important;
        overflow-y: auto;
        border-left: 1px solid #dee2e6;
    }
    
    /* Sidebar improvements */
    .list-group-item-action {
        border: none;
        border-radius: 0;
    }
    
    .list-group-item-action:hover {
        background-color: rgba(13, 110, 253, 0.1);
    }
    
    .list-group-item-action.active {
        background-color: #0d6efd;
        border-color: #0d6efd;
        color: white;
    }
    
    /* Console improvements */
    #console-output {
        background-color: #1e1e1e !important;
        border: 1px solid #333;
        color: #ffffff;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 13px;
        line-height: 1.4;
    }
    
    /* Card improvements */
    .playground-card {
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    }
    
    .playground-card .card-header {
        background-color: #f8f9fa;
        border-bottom: 1px solid #dee2e6;
    }
    
    /* Responsive improvements */
    @media (max-width: 991.98px) {
        #preview-area {
            border-left: none;
            border-top: 1px solid #dee2e6;
            margin-top: 10px;
        }
        
        .playground-row {
            min-height: auto;
        }
        
        #html-code {
            min-height: 300px !important;
        }
        
        #preview-area {
            min-height: 300px !important;
        }
    }
    
    /* Form improvements in preview */
    #preview-area .form-control {
        margin-bottom: 10px;
    }
    
    #preview-area .btn {
        margin: 5px 5px 5px 0;
    }
    
    /* Input group improvements */
    .position-relative .form-control {
        padding-right: 50px;
    }
    

</style>
@endpush

@section('content')
<div class="container-fluid">
    <div class="row">
        <!-- Sidebar with Examples -->
        <div class="col-lg-3">
            <div class="card">
                <div class="card-header">
                    <h5><i class="fas fa-play-circle"></i> Live Examples</h5>
                </div>
                <div class="list-group list-group-flush">
                    <button class="list-group-item list-group-item-action active" onclick="loadExample('notifications')">
                        <i class="fas fa-bell"></i> Notifications
                    </button>
                    <button class="list-group-item list-group-item-action" onclick="loadExample('ajax-form')">
                        <i class="fas fa-paper-plane"></i> AJAX Form
                    </button>
                    <button class="list-group-item list-group-item-action" onclick="loadExample('data-table')">
                        <i class="fas fa-table"></i> Data Table
                    </button>
                    <button class="list-group-item list-group-item-action" onclick="loadExample('password-strength')">
                        <i class="fas fa-lock"></i> Password Strength
                    </button>
                    <button class="list-group-item list-group-item-action" onclick="loadExample('file-upload')">
                        <i class="fas fa-upload"></i> File Upload
                    </button>
                    <button class="list-group-item list-group-item-action" onclick="loadExample('backend-integration')">
                        <i class="fas fa-server"></i> Backend Integration
                    </button>
                </div>
            </div>
            
            <div class="card mt-3">
                <div class="card-header">
                    <h6><i class="fas fa-info-circle"></i> Instructions</h6>
                </div>
                <div class="card-body">
                    <ol class="small">
                        <li>Select an example from the list</li>
                        <li>Modify the HTML code if desired</li>
                        <li>Click "Run Code" to see results</li>
                        <li>All functionality uses KingsLibrary CSS classes</li>
                    </ol>
                    <div class="alert alert-info small">
                        <strong>Note:</strong> KingsLibrary uses event delegation - all CSS classes are automatically bound!
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="col-lg-9">
            <div class="card playground-card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h4 class="mb-0"><i class="fas fa-code"></i> Interactive Playground</h4>
                    <div>
                        <button class="btn btn-success btn-sm me-2" onclick="runCode()">
                            <i class="fas fa-play"></i> Run Code
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="resetPlayground()">
                            <i class="fas fa-undo"></i> Reset
                        </button>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="row g-0 playground-row">
                        <!-- HTML Code Editor -->
                        <div class="col-lg-6">
                            <div class="h-100">
                                <div class="bg-light p-3 border-bottom d-flex justify-content-between align-items-center">
                                    <strong><i class="fas fa-code me-2"></i>HTML Code</strong>
                                    <small class="text-muted">Edit the code below</small>
                                </div>
                                <textarea id="html-code" class="form-control" placeholder="Write your HTML code here using KingsLibrary CSS classes..."></textarea>
                            </div>
                        </div>
                        
                        <!-- Live Preview -->
                        <div class="col-lg-6">
                            <div class="h-100">
                                <div class="bg-light p-3 border-bottom d-flex justify-content-between align-items-center">
                                    <strong><i class="fas fa-eye me-2"></i>Live Preview</strong>
                                    <small class="text-muted">Interactive result</small>
                                </div>
                                <div id="preview-area">
                                    <div class="text-center text-muted py-5">
                                        <i class="fas fa-rocket fa-3x mb-3 text-primary"></i>
                                        <h5>Welcome to KingsLibrary Playground!</h5>
                                        <p class="mb-3">Select an example from the sidebar to get started, or write your own HTML using KingsLibrary classes.</p>
                                        <button class="btn btn-primary" onclick="loadExample('notifications')">
                                            <i class="fas fa-play me-1"></i>Try Me!
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Console Output -->
            <div class="card mt-3">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h6 class="mb-0"><i class="fas fa-terminal"></i> Console Output</h6>
                    <button class="btn btn-outline-secondary btn-sm" onclick="clearConsole()">
                        <i class="fas fa-trash"></i> Clear
                    </button>
                </div>
                <div class="card-body">
                    <div id="console-output" class="bg-dark text-light p-3 rounded" style="font-family: monospace; font-size: 12px; height: 150px; overflow-y: auto;"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    // Playground Examples - Using only KingsLibrary CSS classes
    const examples = {
        'notifications': `<div class="row">
    <div class="col-md-6">
        <h5 class="mb-3">Basic Notification Triggers</h5>
        <p class="small text-muted mb-3">Use <code>data-*</code> attributes for automatic notifications:</p>
        <div class="d-grid gap-2">
            <button class="btn btn-success notification-trigger" 
                    data-type="success" 
                    data-title="Success!" 
                    data-message="Operation completed successfully!">
                <i class="fas fa-check-circle"></i> Success Notification
            </button>
            <button class="btn btn-danger notification-trigger" 
                    data-type="error" 
                    data-title="Error!" 
                    data-message="Something went wrong. Please try again.">
                <i class="fas fa-exclamation-circle"></i> Error Notification
            </button>
            <button class="btn btn-warning notification-trigger" 
                    data-type="warning" 
                    data-title="Warning!" 
                    data-message="Please review your input before continuing.">
                <i class="fas fa-exclamation-triangle"></i> Warning Notification
            </button>
            <button class="btn btn-info notification-trigger" 
                    data-type="info" 
                    data-title="Information" 
                    data-message="Here's some helpful information for you.">
                <i class="fas fa-info-circle"></i> Info Notification
            </button>
        </div>
        
        <div class="mt-4">
            <h6>Usage Example:</h6>
            <pre class="bg-light p-2 small"><code>&lt;button class="notification-trigger"
        data-type="success"
        data-title="Success!"
        data-message="Task completed!"&gt;
    Show Success
&lt;/button&gt;</code></pre>
        </div>
    </div>
    
    <div class="col-md-6">
        <h5 class="mb-3">Advanced Features</h5>
        <p class="small text-muted mb-3">Events and convenience methods built into KingsLibrary:</p>
        <div class="d-grid gap-2">
            <button class="btn btn-outline-success" 
                    data-event="kingslibrary:form:success"
                    data-event-detail='{"response":{"message":"Your profile has been updated successfully!"}}'>
                <i class="fas fa-save"></i> Form Success Event
            </button>
            <button class="btn btn-outline-danger" 
                    data-event="kingslibrary:form:error"
                    data-event-detail='{"error":{"message":"Please fill in all required fields correctly."}}'>
                <i class="fas fa-times"></i> Form Error Event
            </button>
            <button class="btn btn-outline-warning" 
                    data-notification="warning"
                    data-message="Request timeout. Please check your connection."
                    data-title="Connection Warning"
                    data-timer="6000">
                <i class="fas fa-clock"></i> Network Warning
            </button>
            <button class="btn btn-outline-info" 
                    data-event="kingslibrary:data:saved"
                    data-event-detail='{"message":"Your data has been synchronized."}'>
                <i class="fas fa-sync"></i> Data Update Event
            </button>
            <button class="btn btn-outline-primary" 
                    data-notification="confirmDelete"
                    data-item="this user">
                <i class="fas fa-trash"></i> Delete Confirmation
            </button>
            <button class="btn btn-outline-secondary" 
                    data-notification="successToast"
                    data-message="Changes saved automatically!">
                <i class="fas fa-bell"></i> Quick Toast
            </button>
            <button class="btn btn-outline-dark" 
                    data-notification="loading"
                    data-message="Processing your request..."
                    data-duration="3000">
                <i class="fas fa-spinner"></i> Loading Dialog
            </button>
            <button class="btn btn-outline-success" 
                    data-notification="autoSave">
                <i class="fas fa-save"></i> Auto-Save Toast
            </button>
        </div>
        
        <div class="mt-4">
            <h6>Event Trigger Example:</h6>
            <pre class="bg-light p-2 small"><code>&lt;button data-event="kingslibrary:form:success"
        data-event-detail='{"response":{"message":"Saved!"}}'&gt;
    Trigger Event
&lt;/button&gt;</code></pre>
            
            <h6 class="mt-3">Method Call Example:</h6>
            <pre class="bg-light p-2 small"><code>&lt;button data-notification="successToast"
        data-message="Quick success message"&gt;
    Show Toast
&lt;/button&gt;</code></pre>
        </div>
    </div>
</div>

<div class="row mt-4">
    <div class="col-12">
        <div class="alert alert-info">
            <h6><i class="fas fa-lightbulb me-2"></i>KingsLibrary Notification Features:</h6>
            <ul class="mb-0 small">
                <li><strong>Event-Driven:</strong> Automatically listens for <code>kingslibrary:*</code> events</li>
                <li><strong>Data Attributes:</strong> Use <code>data-event</code> or <code>data-notification</code> for zero-JavaScript solutions</li>
                <li><strong>Convenience Methods:</strong> Built-in <code>successToast()</code>, <code>confirmDelete()</code>, <code>loading()</code>, etc.</li>
                <li><strong>Auto-Integration:</strong> Works with forms, AJAX, validation, authentication out of the box</li>
                <li><strong>SweetAlert2 Integration:</strong> Falls back to native alerts if SweetAlert2 not available</li>
            </ul>
        </div>
    </div>
</div>`,
        
        'ajax-form': `<form class="ajax-form" data-action="#" data-success-message="Form submitted successfully!">
    <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="text" name="name" class="form-control validate-field" required>
    </div>
    <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" name="email" class="form-control validate-field validate-email" required>
    </div>
    <div class="mb-3">
        <label class="form-label">Message</label>
        <textarea name="message" class="form-control validate-field" rows="3" required></textarea>
    </div>
    <button type="submit" class="btn btn-primary">
        <i class="fas fa-paper-plane"></i> Submit Form
    </button>
</form>`,
        
        'data-table': `<table class="datatable-init table table-striped" 
       data-page-length="5" 
       data-searching="true" 
       data-ordering="true">
    <thead>
        <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Office</th>
            <th>Salary</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>John Doe</td><td>Developer</td><td>New York</td><td>$75,000</td></tr>
        <tr><td>Jane Smith</td><td>Designer</td><td>London</td><td>$65,000</td></tr>
        <tr><td>Bob Wilson</td><td>Manager</td><td>Tokyo</td><td>$85,000</td></tr>
        <tr><td>Alice Brown</td><td>Analyst</td><td>Sydney</td><td>$70,000</td></tr>
        <tr><td>Charlie Davis</td><td>Engineer</td><td>Berlin</td><td>$80,000</td></tr>
        <tr><td>Eva Martinez</td><td>Consultant</td><td>Paris</td><td>$72,000</td></tr>
    </tbody>
</table>

<div class="mt-3">
    <button class="btn btn-success export-excel me-2" data-table="table">
        <i class="fas fa-file-excel"></i> Export Excel
    </button>
    <button class="btn btn-info export-csv" data-table="table">
        <i class="fas fa-file-csv"></i> Export CSV
    </button>
</div>`,
        
        'password-strength': `<div class="container-fluid p-4">
    <h5 class="mb-4 text-primary">
        <i class="fas fa-lock me-2"></i>Password Strength Demo
    </h5>
    
    <div class="row">
        <div class="col-md-12">
            <div class="password-strength mb-4">
                <label class="form-label fw-semibold">Create Password</label>
                <div class="input-group">
                    <input type="password" 
                           class="form-control password-strength__input password_input" 
                           placeholder="Enter a strong password"
                           id="demo-password">
                    <button class="btn btn-outline-secondary toggle-password" 
                            type="button" 
                            data-target="#demo-password">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                
                <div class="password-strength__bar-block mt-3" style="display: none;">
                    <div class="progress" style="height: 10px;">
                        <div class="password-strength__bar progress-bar bg-danger" 
                             role="progressbar" 
                             style="width: 0%; transition: width 0.3s ease;">
                        </div>
                    </div>
                    <small class="password-strength__text mt-1 d-block text-danger" 
                           style="display: none;"></small>
                </div>
                
                <div class="mt-3">
                    <small class="text-muted d-block">
                        <i class="fas fa-info-circle me-1 text-info"></i>
                        Type a password to see the strength meter and validation in action
                    </small>
                </div>
            </div>
            
            <div class="mb-3">
                <label class="form-label fw-semibold">Confirm Password</label>
                <div class="input-group">
                    <input type="password" 
                           class="form-control confirm_password_input" 
                           placeholder="Confirm your password"
                           id="demo-confirm">
                    <button class="btn btn-outline-secondary toggle-password" 
                            type="button" 
                            data-target="#demo-confirm">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                <div class="invalid-feedback">
                    Passwords do not match
                </div>
            </div>
            
            <div class="alert alert-light border">
                <i class="fas fa-keyboard me-2 text-success"></i>
                <strong>Interactive Demo:</strong> Start typing to see the password strength indicator and validation in real-time!
            </div>
        </div>
        
        
    </div>
</div>`,
        
        'file-upload': `<div class="file-upload-demo">
    <div class="mb-3">
        <label class="form-label">File Upload</label>
        <input type="file" class="form-control file-upload" 
               data-auto-upload="false" 
               data-upload-url="/api/demo/upload" 
               accept="image/*" 
               multiple>
    </div>
    
    <div class="file-drop-zone border-2 border-dashed border-primary rounded p-4 text-center" 
         style="background: #f8f9ff;">
        <i class="fas fa-cloud-upload-alt fa-2x text-primary mb-2"></i>
        <p class="mb-0">Drag and drop files here or click the input above</p>
        <small class="text-muted">Supports: JPG, PNG, GIF (Max: 10MB)</small>
    </div>
    
    <div class="image-preview-container mt-3"></div>
</div>`,
        
        'backend-integration': `<div class="container-fluid">
    <div class="row">
        <div class="col-md-6">
            <h5 class="mb-3">Laravel Integration Examples</h5>
            
            <!-- Simulate Laravel flash messages -->
            <div class="card mb-3">
                <div class="card-header">
                    <strong>Session Flash Messages</strong>
                </div>
                <div class="card-body">
                    <p class="small text-muted">Click to simulate Laravel session messages:</p>
                    <div class="d-grid gap-2">
                        <button class="btn btn-success btn-sm" onclick="simulateLaravelSuccess()">
                            Success Flash Message
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="simulateLaravelError()">
                            Error Flash Message
                        </button>
                        <button class="btn btn-warning btn-sm" onclick="simulateLaravelValidation()">
                            Validation Errors
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Direct API calls -->
            <div class="card">
                <div class="card-header">
                    <strong>Direct API Usage</strong>
                </div>
                <div class="card-body">
                    <p class="small text-muted">Call KingsLibrary functions directly:</p>
                    <div class="d-grid gap-2">
                        <button class="btn btn-outline-success btn-sm" onclick="directApiSuccess()">
                            KingsLibrary.showNotification()
                        </button>
                        <button class="btn btn-outline-info btn-sm" onclick="directApiToast()">
                            KingsNotify.successToast()
                        </button>
                        <button class="btn btn-outline-primary btn-sm" onclick="directApiConfirm()">
                            KingsNotify.confirmDelete()
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-md-6">
            <h5 class="mb-3">Implementation Guide</h5>
            
            <div class="alert alert-info">
                <h6><i class="fas fa-code me-2"></i>Laravel Blade Template</h6>
                <pre class="mb-2"><code>&lt;!-- Add flash messages to meta tags --&gt;
@if(session('success'))
    &lt;meta name="flash-success" content="{{ session('success') }}"&gt;
@endif
@if(session('error'))
    &lt;meta name="flash-error" content="{{ session('error') }}"&gt;
@endif

&lt;!-- Or use data attributes on body --&gt;
&lt;body data-flash-success="{{ session('success') }}"
      data-flash-error="{{ session('error') }}"&gt;</code></pre>
            </div>
            
            <div class="alert alert-success">
                <h6><i class="fas fa-js me-2"></i>JavaScript Usage</h6>
                <pre class="mb-2"><code>// Auto-check (runs on page load)
KingsLibrary.checkSessionMessages();

// Manual calls
KingsLibrary.showNotification('success', 'Task completed!');

// Direct utility access
KingsNotify.successToast('Quick message');
KingsNotify.confirmDelete('this item').then(result => {
    if (result.isConfirmed) {
        // Proceed with deletion
    }
});

// Form integration
if (formSuccess) {
    KingsNotify.showFormResult(true, 'Profile updated!');
} else {
    KingsNotify.showFormResult(false, 'Error occurred', errors);
}</code></pre>
            </div>
            
            <div class="alert alert-warning">
                <h6><i class="fas fa-php me-2"></i>Laravel Controller</h6>
                <pre class="mb-0"><code>// In your controller
public function store(Request $request) {
    try {
        // Process form...
        return redirect()->back()
            ->with('success', 'Data saved successfully!');
    } catch (Exception $e) {
        return redirect()->back()
            ->with('error', 'Failed to save data.')
            ->withInput();
    }
}</code></pre>
            </div>
        </div>
    </div>
</div>

<script>
// Simulate Laravel flash messages
function simulateLaravelSuccess() {
    // Add meta tag to simulate Laravel flash message
    const meta = document.createElement('meta');
    meta.name = 'flash-success';
    meta.content = 'Profile updated successfully! This message came from Laravel session.';
    document.head.appendChild(meta);
    
    // Trigger the check
    KingsLibrary.checkSessionMessages();
}

function simulateLaravelError() {
    const meta = document.createElement('meta');
    meta.name = 'flash-error';
    meta.content = 'Database connection failed. Please contact administrator.';
    document.head.appendChild(meta);
    
    KingsLibrary.checkSessionMessages();
}

function simulateLaravelValidation() {
    // Simulate Laravel validation errors
    const errors = {
        'name': ['The name field is required.'],
        'email': ['The email must be a valid email address.', 'The email has already been taken.'],
        'password': ['The password must be at least 8 characters.']
    };
    
    if (window.KingsNotify) {
        KingsNotify.showValidationErrors(errors);
    }
}

// Direct API usage examples
function directApiSuccess() {
    KingsLibrary.showNotification('success', 'This is a direct API call using KingsLibrary.showNotification()', 'Direct API');
}

function directApiToast() {
    if (window.KingsNotify) {
        KingsNotify.successToast('Quick toast using KingsNotify.successToast()');
    }
}

function directApiConfirm() {
    if (window.KingsNotify) {
        KingsNotify.confirmDelete('this user account').then(result => {
            if (result.isConfirmed) {
                KingsNotify.successToast('User deleted successfully!');
            }
        });
    }
}
</sc` + `ript></div>`
    };
    
    function loadExample(type) {
        const code = examples[type];
        if (code) {
            document.getElementById('html-code').value = code;
            runCode();
            
            // Update active sidebar item
            document.querySelectorAll('.list-group-item-action').forEach(item => {
                item.classList.remove('active');
            });
            
            // Find and activate the correct sidebar item
            const buttons = document.querySelectorAll('.list-group-item-action');
            buttons.forEach(button => {
                const onclick = button.getAttribute('onclick');
                if (onclick && onclick.includes(`'${type}'`)) {
                    button.classList.add('active');
                }
            });
            
            logToConsole(`📂 Loaded example: ${type}`);
        } else {
            logToConsole(`❌ Example '${type}' not found`);
        }
    }
    
    // Debounce to prevent rapid successive calls
    let runCodeTimeout;
    
    function runCode() {
        // Clear any pending execution
        if (runCodeTimeout) {
            clearTimeout(runCodeTimeout);
        }
        
        // Debounce the execution by 100ms
        runCodeTimeout = setTimeout(executeRunCode, 100);
    }
    
    function executeRunCode() {
        const htmlCode = document.getElementById('html-code').value;
        
        if (!htmlCode.trim()) {
            logToConsole('⚠️ No code to run. Please enter some HTML code first.');
            return;
        }
        
        logToConsole('▶️ Running code...');
        
        const previewArea = document.getElementById('preview-area');
        
        try {
            // Properly cleanup existing DataTables
            const existingTables = previewArea.querySelectorAll('table');
            existingTables.forEach(table => {
                if ($.fn.DataTable && $.fn.DataTable.isDataTable(table)) {
                    try {
                        $(table).DataTable().destroy(true); // true = remove from DOM
                        logToConsole('🔄 Destroyed existing DataTable instance');
                    } catch (e) {
                        // Ignore errors if table already destroyed
                        console.log('DataTable already destroyed or error:', e.message);
                    }
                }
            });
            
            // Clear KingsLibrary's internal table tracking if accessible
            if (window.KingsLibrary && window.KingsLibrary.utilities && window.KingsLibrary.utilities.table) {
                const tableUtility = window.KingsLibrary.utilities.table;
                if (tableUtility.initializedTables) {
                    // Clear only tables that are in the preview area
                    existingTables.forEach(table => {
                        if (tableUtility.initializedTables.has(table)) {
                            tableUtility.initializedTables.delete(table);
                        }
                    });
                    logToConsole('🧹 Cleared KingsLibrary table tracking');
                }
            }
            
            // Mark preview area to prevent auto-initialization
            previewArea.setAttribute('data-manual-init', 'true');
            
            // Clear previous content
            previewArea.innerHTML = '';
            
            // Update HTML - KingsLibrary will automatically handle all CSS classes
            previewArea.innerHTML = htmlCode;
            
            // Manually initialize DataTables in the playground to prevent multiple auto-inits
            const newTables = previewArea.querySelectorAll('.datatable-init');
            if (newTables.length > 0 && window.KingsLibrary && window.KingsLibrary.utilities && window.KingsLibrary.utilities.table) {
                const tableUtility = window.KingsLibrary.utilities.table;
                
                // Small delay to ensure DOM is settled
                setTimeout(() => {
                    newTables.forEach(table => {
                        // Only initialize if not already done
                        if (!tableUtility.initializedTables.has(table) && !$.fn.DataTable.isDataTable(table)) {
                            tableUtility.initializeTable(table);
                            logToConsole('📊 Manually initialized DataTable');
                        }
                    });
                }, 50);
            }
            
            // Count elements that KingsLibrary will handle
            const elements = {
                notifications: previewArea.querySelectorAll('.notification-trigger').length,
                forms: previewArea.querySelectorAll('.ajax-form').length,
                tables: previewArea.querySelectorAll('.datatable-init').length,
                passwords: previewArea.querySelectorAll('.password-strength').length,
                toggles: previewArea.querySelectorAll('.toggle-password').length,
                uploads: previewArea.querySelectorAll('.file-upload').length,
                validations: previewArea.querySelectorAll('.validate-field').length
            };
            
            logToConsole('✅ Preview updated successfully!');
            
            // Log what KingsLibrary found and will handle
            let foundElements = false;
            Object.entries(elements).forEach(([type, count]) => {
                if (count > 0) {
                    logToConsole(`  📋 Found ${count} ${type} element(s)`);
                    foundElements = true;
                }
            });
            
            if (!foundElements) {
                logToConsole('  ℹ️ No KingsLibrary CSS classes detected');
                logToConsole('  💡 Try adding classes like .notification-trigger, .datatable-init, etc.');
            } else {
                logToConsole('  🔄 KingsLibrary auto-binding active via event delegation');
            }
            
        } catch (error) {
            logToConsole('❌ Error: ' + error.message);
            previewArea.innerHTML = `<div class="alert alert-danger"><strong>Error:</strong> ${error.message}</div>`;
            console.error('Playground error:', error);
        }
    }
    
    function resetPlayground() {
        loadExample('notifications');
        logToConsole('🔄 Playground reset');
    }
    
    function logToConsole(message) {
        const console = document.getElementById('console-output');
        const timestamp = new Date().toLocaleTimeString();
        console.innerHTML += `<div class="text-info">[${timestamp}] ${message}</div>`;
        console.scrollTop = console.scrollHeight;
    }
    
    function clearConsole() {
        document.getElementById('console-output').innerHTML = '';
        logToConsole('🧹 Console cleared');
    }
    
    // Initialize playground - relies entirely on KingsLibrary
    document.addEventListener('DOMContentLoaded', function() {
        // Override console.log to show in our console
        const originalLog = console.log;
        console.log = function(...args) {
            originalLog.apply(console, args);
            logToConsole(args.join(' '));
        };
        
        // Immediate debug info
        logToConsole('🚀 Playground initialization started...');
        logToConsole('📊 DOM ready state: ' + document.readyState);
        
        // Wait for KingsLibrary to be fully loaded
        let initAttempts = 0;
        const maxAttempts = 50;
        
        function waitForKingsLibrary() {
            initAttempts++;
            
            // Debug information
            logToConsole(`🔍 Check ${initAttempts}/${maxAttempts}: window.KL = ${typeof window.KL}`);
            if (window.KL) {
                logToConsole(`🔍 KL.isInitialized = ${window.KL.isInitialized}`);
                logToConsole(`🔍 KL utilities: ${window.KL.utilities ? window.KL.utilities.size : 'undefined'}`);
            }
            
            if (window.KL && window.KL.isInitialized) {
                logToConsole('✅ KingsLibrary is ready and initialized!');
                logToConsole('✅ Event-driven CSS class binding is active');
                logToConsole('✅ All utilities loaded and ready');
                
                // Load initial example to demonstrate functionality
                setTimeout(() => {
                    logToConsole('🎯 Loading notifications example...');
                    loadExample('notifications');
                }, 300);
                
                logToConsole('🎮 Playground ready - Try the examples!');
            } else if (initAttempts < maxAttempts) {
                setTimeout(waitForKingsLibrary, 100);
            } else {
                logToConsole('⚠️ KingsLibrary not detected after 5 seconds');
                logToConsole('🔧 jQuery available: ' + (typeof $ !== 'undefined'));
                logToConsole('🔧 SweetAlert2 available: ' + (typeof Swal !== 'undefined'));
                logToConsole('🔧 DataTables available: ' + (typeof $.fn.DataTable !== 'undefined'));
                logToConsole('📝 Loading default example anyway...');
                loadExample('notifications');
            }
        }
        
        // Start waiting for KingsLibrary
        waitForKingsLibrary();
        
        logToConsole('KingsLibrary Playground initializing...');
    });
</script>
@endsection