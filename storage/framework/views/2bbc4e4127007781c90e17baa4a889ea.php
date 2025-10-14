<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KingsLibrary v1.0 - Interactive Documentation</title>
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- DataTables CSS -->
    <link href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/buttons/2.4.2/css/buttons.bootstrap5.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.bootstrap5.min.css" rel="stylesheet">

    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">

    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.min.css" rel="stylesheet">

    <!-- Prism.js for code highlighting -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" rel="stylesheet">

    <style>
        .hero-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 4rem 0;
        }

        .feature-card {
            transition: transform 0.3s;
        }

        .feature-card:hover {
            transform: translateY(-5px);
        }

        .code-example {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 1rem;
            margin: 1rem 0;
        }

        .nav-pills .nav-link.active {
            background-color: #667eea;
        }
    </style>
</head>

<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="<?php echo e(route('docs.index')); ?>">
                <i class="fas fa-crown text-warning"></i> <strong>KingsLibrary</strong> <span
                    class="badge bg-success">v1.0</span>
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="<?php echo e(route('docs.index')); ?>">
                            <i class="fas fa-home"></i> Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo e(route('docs.playground')); ?>">
                            <i class="fas fa-play"></i> Playground
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo e(route('docs.snippets')); ?>">
                            <i class="fas fa-code"></i> Code Snippets
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container text-center">
            <h1 class="display-4 mb-4">
                <i class="fas fa-crown text-warning"></i> KingsLibrary v1.0
            </h1>
            <p class="lead mb-4">
                Transform your web development workflow with class-based auto-binding.
                No more manual JavaScript calls - just add classes and watch the magic happen!
            </p>
            <div class="row mt-5">
                <div class="col-md-4">
                    <h5><i class="fas fa-bolt text-warning"></i> Event-Driven</h5>
                    <p>Automatic functionality binding through classes</p>
                </div>
                <div class="col-md-4">
                    <h5><i class="fas fa-layer-group text-success"></i> Framework Agnostic</h5>
                    <p>Works with Bootstrap, Tailwind, Vue, React, or any framework</p>
                </div>
                <div class="col-md-4">
                    <h5><i class="fas fa-feather-alt text-info"></i> Lightweight</h5>
                    <p>Minimal footprint with maximum functionality</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <div class="container my-5">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-lg-3">
                <div class="card">
                    <div class="card-header">
                        <h6 class="mb-0"><i class="fas fa-list"></i> Quick Navigation</h6>
                    </div>
                    <div class="card-body p-0">
                        <nav class="nav nav-pills flex-column">
                            <a class="nav-link" href="#getting-started">
                                <i class="fas fa-rocket"></i> Getting Started
                            </a>
                            <a class="nav-link" href="#dependencies">
                                <i class="fas fa-cubes"></i> Dependencies
                            </a>
                            <a class="nav-link" href="#core-features">
                                <i class="fas fa-star"></i> Core Features
                            </a>
                            <a class="nav-link" href="#examples">
                                <i class="fas fa-code"></i> Quick Examples
                            </a>
                            <a class="nav-link" href="#backend-integration">
                                <i class="fas fa-server"></i> Backend Integration
                            </a>
                        </nav>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="col-lg-9">
                <!-- Getting Started Section -->
                <section id="getting-started" class="mb-5">
                    <h2><i class="fas fa-rocket text-primary"></i> Getting Started</h2>
                    <p class="lead">Get up and running with KingsLibrary in minutes!</p>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="card feature-card h-100">
                                <div class="card-body">
                                    <h5><i class="fas fa-download text-success"></i> Download</h5>
                                    <div class="code-example">
                                        <pre><code class="language-bash">Download kingslibrary.min.js from GitHub</code></pre>
                                    </div>
                                    <small class="text-muted">Get the latest version from our repository</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card feature-card h-100">
                                <div class="card-body">
                                    <h5><i class="fas fa-download text-info"></i> Manual Setup</h5>
                                    <div class="code-example">
                                        <pre><code class="language-html">&lt;script src="js/kingslibrary.min.js"&gt;&lt;/script&gt;</code></pre>
                                    </div>
                                    <small class="text-muted">Download from GitHub and include in your project</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Dependencies Section -->
                <section id="dependencies" class="mb-5">
                    <h2><i class="fas fa-cubes text-primary"></i> Dependencies</h2>
                    <p class="lead">KingsLibrary requires these external libraries to function properly.</p>

                    <div class="alert alert-info">
                        <i class="fas fa-info-circle"></i>
                        <strong>Important:</strong> All dependencies must be loaded before KingsLibrary for proper
                        functionality.
                    </div>

                    <div class="row">
                        <!-- Required Dependencies -->
                        <div class="col-lg-6 mb-4">
                            <div class="card">
                                <div class="card-header bg-danger text-white">
                                    <h5 class="mb-0"><i class="fas fa-exclamation-triangle"></i> Required Dependencies
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div class="dependency-item mb-3">
                                        <h6><i class="fab fa-js-square text-warning"></i> jQuery 3.6+</h6>
                                        <p class="small text-muted mb-2">Core JavaScript library for DOM manipulation
                                            and AJAX</p>
                                        <div class="code-example">
                                            <pre><code class="language-html">&lt;script src="https://code.jquery.com/jquery-3.6.4.min.js"&gt;&lt;/script&gt;</code></pre>
                                        </div>
                                    </div>

                                    <div class="dependency-item mb-3">
                                        <h6><i class="fab fa-bootstrap text-primary"></i> Bootstrap 5.3+</h6>
                                        <p class="small text-muted mb-2">CSS framework for responsive design and
                                            components</p>
                                        <div class="code-example">
                                            <pre><code class="language-html">&lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"&gt;
&lt;script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"&gt;&lt;/script&gt;</code></pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Optional Dependencies -->
                        <div class="col-lg-6 mb-4">
                            <div class="card">
                                <div class="card-header bg-warning text-dark">
                                    <h5 class="mb-0"><i class="fas fa-plus-circle"></i> Feature Dependencies</h5>
                                </div>
                                <div class="card-body">
                                    <div class="dependency-item mb-3">
                                        <h6><i class="fas fa-bell text-success"></i> SweetAlert2 (Notifications)</h6>
                                        <p class="small text-muted mb-2">Required for .notification-trigger
                                            functionality</p>
                                        <div class="code-example">
                                            <pre><code class="language-html">&lt;script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"&gt;&lt;/script&gt;</code></pre>
                                        </div>
                                    </div>

                                    <div class="dependency-item mb-3">
                                        <h6><i class="fas fa-table text-info"></i> DataTables (Tables)</h6>
                                        <p class="small text-muted mb-2">Required for .datatable-init functionality</p>
                                        <div class="code-example">
                                            <pre><code class="language-html">&lt;link href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css" rel="stylesheet"&gt;
&lt;script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"&gt;&lt;/script&gt;
&lt;script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"&gt;&lt;/script&gt;</code></pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Complete Setup Example -->
                    <div class="card">
                        <div class="card-header bg-success text-white">
                            <h5 class="mb-0"><i class="fas fa-code"></i> Complete Setup Example</h5>
                        </div>
                        <div class="card-body">
                            <p>Here's a complete HTML template with all dependencies properly loaded:</p>
                            <div class="code-example">
                                <pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;KingsLibrary Setup&lt;/title&gt;
    
    &lt;!-- Bootstrap CSS --&gt;
    &lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"&gt;
    
    &lt;!-- DataTables CSS (Optional) --&gt;
    &lt;link href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css" rel="stylesheet"&gt;
    
    &lt;!-- Font Awesome (Optional) --&gt;
    &lt;link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;!-- Your content here --&gt;
    
    &lt;!-- jQuery (Required) --&gt;
    &lt;script src="https://code.jquery.com/jquery-3.6.4.min.js"&gt;&lt;/script&gt;
    
    &lt;!-- Bootstrap JS (Required) --&gt;
    &lt;script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"&gt;&lt;/script&gt;
    
    &lt;!-- DataTables JS (Optional) --&gt;
    &lt;script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"&gt;&lt;/script&gt;
    &lt;script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"&gt;&lt;/script&gt;
    
    &lt;!-- SweetAlert2 (Optional) --&gt;
    &lt;script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"&gt;&lt;/script&gt;
    
    &lt;!-- KingsLibrary (Must be last) --&gt;
    &lt;script src="js/kingslibrary.min.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
                            </div>
                        </div>
                    </div>

                    <!-- Feature Matrix -->
                    <div class="card mt-4">
                        <div class="card-header">
                            <h5 class="mb-0"><i class="fas fa-matrix"></i> Feature Dependency Matrix</h5>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>KingsLibrary Feature</th>
                                            <th>CSS Class</th>
                                            <th>Required Dependency</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Form Validation</td>
                                            <td><code>.ajax-form</code>, <code>.validate-field</code></td>
                                            <td>jQuery + Bootstrap</td>
                                            <td><span class="badge bg-success">Core</span></td>
                                        </tr>
                                        <tr>
                                            <td>Notifications</td>
                                            <td><code>.notification-trigger</code></td>
                                            <td>SweetAlert2</td>
                                            <td><span class="badge bg-warning">Optional</span></td>
                                        </tr>
                                        <tr>
                                            <td>Data Tables</td>
                                            <td><code>.datatable-init</code></td>
                                            <td>DataTables</td>
                                            <td><span class="badge bg-warning">Optional</span></td>
                                        </tr>
                                        <tr>
                                            <td>Password Strength</td>
                                            <td><code>.password-strength</code></td>
                                            <td>jQuery + Bootstrap</td>
                                            <td><span class="badge bg-success">Core</span></td>
                                        </tr>
                                        <tr>
                                            <td>File Uploads</td>
                                            <td><code>.file-upload</code></td>
                                            <td>jQuery + Bootstrap</td>
                                            <td><span class="badge bg-success">Core</span></td>
                                        </tr>
                                        <tr>
                                            <td>Media Controls</td>
                                            <td><code>.media-*</code></td>
                                            <td>jQuery + Bootstrap</td>
                                            <td><span class="badge bg-success">Core</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="text-muted small mt-2">
                                <strong>Core:</strong> Works with basic jQuery + Bootstrap setup<br>
                                <strong>Optional:</strong> Requires additional library for full functionality
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Core Features Section -->
                <section id="core-features" class="mb-5">
                    <h2><i class="fas fa-star text-primary"></i> Core Features</h2>

                    <div class="row">
                        <div class="col-lg-4 mb-4">
                            <div class="card feature-card h-100">
                                <div class="card-body">
                                    <h5><i class="fas fa-paper-plane text-primary"></i> AJAX Forms</h5>
                                    <p>Automatic form submission with validation and error handling.</p>
                                    <div class="code-example">
                                        <pre><code class="language-html">&lt;form class="ajax-form" data-action="/api/contact"&gt;
    &lt;input class="validate-field" required&gt;
    &lt;button type="submit"&gt;Send&lt;/button&gt;
&lt;/form&gt;</code></pre>
                                    </div>
                                    <a href="<?php echo e(route('docs.playground')); ?>#forms"
                                        class="btn btn-sm btn-outline-primary">
                                        Try It Live <i class="fas fa-external-link-alt"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 mb-4">
                            <div class="card feature-card h-100">
                                <div class="card-body">
                                    <h5><i class="fas fa-table text-success"></i> Data Tables</h5>
                                    <p>Interactive tables with sorting, pagination, and export features.</p>
                                    <div class="code-example">
                                        <pre><code class="language-html">&lt;table class="datatable-init" 
       data-page-length="25"
       data-export-excel="true"&gt;
    &lt;!-- Table content --&gt;
&lt;/table&gt;</code></pre>
                                    </div>
                                    <a href="/examples/simple" class="btn btn-sm btn-outline-success">
                                        View Examples <i class="fas fa-external-link-alt"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 mb-4">
                            <div class="card feature-card h-100">
                                <div class="card-body">
                                    <h5><i class="fas fa-lock text-warning"></i> Password Tools</h5>
                                    <p>Password strength checking and visibility toggle functionality.</p>
                                    <div class="code-example">
                                        <pre><code class="language-html">&lt;input type="password" 
       class="password-strength__input"&gt;
&lt;span class="toggle-password"&gt;&lt;i class="fas fa-eye"&gt;&lt;/i&gt;&lt;/span&gt;</code></pre>
                                    </div>
                                    <a href="<?php echo e(route('docs.playground')); ?>#passwords"
                                        class="btn btn-sm btn-outline-warning">
                                        Test It <i class="fas fa-external-link-alt"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Quick Examples Section -->
                <section id="examples" class="mb-5">
                    <h2><i class="fas fa-code text-primary"></i> Quick Examples</h2>
                    <p class="mb-3"><i class="fas fa-play-circle text-success"></i> <strong>Try these live
                            examples!</strong> All functionality is powered by KingsLibrary v1.0 - click the buttons to
                        see it in action.</p>

                    <div class="card">
                        <div class="card-header">
                            <ul class="nav nav-tabs card-header-tabs" id="exampleTabs" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="forms-tab" data-bs-toggle="tab"
                                        data-bs-target="#forms" type="button">
                                        <i class="fas fa-paper-plane"></i> Forms
                                    </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="tables-tab" data-bs-toggle="tab"
                                        data-bs-target="#tables" type="button">
                                        <i class="fas fa-table"></i> Tables
                                    </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="notifications-tab" data-bs-toggle="tab"
                                        data-bs-target="#notifications" type="button">
                                        <i class="fas fa-bell"></i> Notifications
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="card-body">
                            <div class="tab-content" id="exampleTabContent">
                                <div class="tab-pane fade show active" id="forms" role="tabpanel">
                                    <h5>Contact Form Example</h5>
                                    <form class="ajax-form" data-action="/api/contact"
                                        data-success-message="Message sent successfully!">
                                        <div class="mb-3">
                                            <label class="form-label">Name</label>
                                            <input type="text" name="name" class="form-control validate-field" required>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Email</label>
                                            <input type="email" name="email"
                                                class="form-control validate-field validate-email" required>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Message</label>
                                            <textarea name="message" class="form-control validate-field" rows="3"
                                                required></textarea>
                                        </div>
                                        <button type="submit" class="btn btn-primary">
                                            <i class="fas fa-paper-plane"></i> Send Message
                                        </button>
                                    </form>
                                </div>
                                <div class="tab-pane fade" id="tables" role="tabpanel">
                                    <h5>Sample Data Table</h5>
                                    <table class="datatable-init table table-striped" data-page-length="5">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Salary</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>John Doe</td>
                                                <td>Developer</td>
                                                <td>$75,000</td>
                                            </tr>
                                            <tr>
                                                <td>Jane Smith</td>
                                                <td>Designer</td>
                                                <td>$65,000</td>
                                            </tr>
                                            <tr>
                                                <td>Bob Wilson</td>
                                                <td>Manager</td>
                                                <td>$85,000</td>
                                            </tr>
                                            <tr>
                                                <td>Alice Brown</td>
                                                <td>Analyst</td>
                                                <td>$70,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="notifications" role="tabpanel">
                                    <h5>Notification Examples</h5>
                                    <div class="d-flex gap-2 flex-wrap">
                                        <button class="btn btn-success notification-trigger" data-type="success"
                                            data-title="Success!" data-message="This is a success notification">
                                            <i class="fas fa-check"></i> Success
                                        </button>
                                        <button class="btn btn-danger notification-trigger" data-type="error"
                                            data-title="Error!" data-message="This is an error notification">
                                            <i class="fas fa-times"></i> Error
                                        </button>
                                        <button class="btn btn-warning notification-trigger" data-type="warning"
                                            data-title="Warning!" data-message="This is a warning notification">
                                            <i class="fas fa-exclamation-triangle"></i> Warning
                                        </button>
                                        <button class="btn btn-info notification-trigger" data-type="info"
                                            data-title="Info" data-message="This is an info notification">
                                            <i class="fas fa-info-circle"></i> Info
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Documentation Links -->
                <section id="documentation-links" class="mb-5">
                    <h2><i class="fas fa-book text-primary"></i> Learn & Explore</h2>

                    <div class="row">
                        <div class="col-md-6 mb-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5><i class="fas fa-play text-primary"></i> Interactive Playground</h5>
                                    <p>Test KingsLibrary features in real-time with live, editable examples. See
                                        immediate results as you modify code and experiment with different classes and
                                        configurations.</p>
                                    <ul class="text-muted small">
                                        <li>Live HTML editor with instant preview</li>
                                        <li>Pre-built examples for all utilities</li>
                                        <li>Real-time console output</li>
                                        <li>Modify and test your own code</li>
                                    </ul>
                                    <a href="<?php echo e(route('docs.playground')); ?>" class="btn btn-primary">
                                        <i class="fas fa-play"></i> Try Live Examples
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 mb-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5><i class="fas fa-code text-secondary"></i> Code Snippets</h5>
                                    <p>Ready-to-use code examples that you can copy and paste directly into your
                                        projects. Each snippet includes complete HTML, required classes, and
                                        implementation notes.</p>
                                    <ul class="text-muted small">
                                        <li>Copy-paste ready examples</li>
                                        <li>Framework-specific implementations</li>
                                        <li>Complete working code blocks</li>
                                        <li>Implementation tips and notes</li>
                                    </ul>
                                    <a href="<?php echo e(route('docs.snippets')); ?>" class="btn btn-secondary">
                                        <i class="fas fa-code"></i> Browse Code Snippets
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Backend Integration Section -->
                <section id="backend-integration" class="mb-5">
                    <h2 class="mb-4">
                        <i class="fas fa-server text-primary me-2"></i>Backend Integration
                    </h2>
                    <p class="lead">
                        KingsLibrary provides seamless integration with backend frameworks like Laravel, making it easy
                        to display notifications based on server responses, session messages, and form submissions.
                    </p>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card mb-4">
                                <div class="card-header">
                                    <h5><i class="fab fa-laravel text-danger me-2"></i>Laravel Integration</h5>
                                </div>
                                <div class="card-body">
                                    <h6>Quick Setup</h6>
                                    <p>Add flash messages to meta tags in your Blade layout:</p>
                                    <p>NB: Make sure to include the meta tags in the <head> section of your layout.</p>
                                    <P>This example needs to be modified to meet the laravel coding structure. </P>
                                    <pre class="bg-light p-3 rounded">
                                        <code class="language-php">
In your layout file (e.g., app.blade.php)
if(session('success'))
    '<'meta name="flash-success" content="session('success')" '/>'
endif
if(session('error'))
    '<'meta name="flash-error" content="session('error')" '/>'
endif
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="card mb-4">
                                <div class="card-header">
                                    <h5><i class="fab fa-js-square text-warning me-2"></i>JavaScript API</h5>
                                </div>
                                <div class="card-body">
                                    <h6>Automatic Detection</h6>
                                    <p>KingsLibrary automatically detects and displays backend messages:</p>
                                    <pre class="bg-light p-3 rounded"><code class="language-javascript">// Runs automatically on page load!
KingsLibrary.checkSessionMessages();</code></pre>

                                    <h6 class="mt-3">Manual Notifications</h6>
                                    <pre class="bg-light p-3 rounded"><code class="language-javascript">// Show notifications
KingsLibrary.showNotification('success', 'Task completed!');

// Quick toasts
KingsNotify.successToast('Quick message');

// Confirmations
KingsNotify.confirmDelete('this user').then(result => {
    if (result.isConfirmed) {
        // Proceed with deletion
    }
});</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mb-4">
                        <div class="card-header">
                            <h5><i class="fas fa-bolt text-primary me-2"></i>Event-Driven Integration Made Simple</h5>
                        </div>
                        <div class="card-body">
                            <!-- What is Event-Driven Integration? -->
                            <div class="alert alert-primary">
                                <h6><i class="fas fa-question-circle me-2"></i>What is Event-Driven Integration?</h6>
                                <p class="mb-2">Think of events like <strong>automatic notifications</strong> that KingsLibrary sends when something happens:</p>
                                <ul class="mb-0">
                                    <li>📝 When a form is submitted successfully</li>
                                    <li>❌ When a form has errors</li>
                                    <li>✅ When data is saved to your database</li>
                                    <li>👤 When a user logs in</li>
                                </ul>
                            </div>

                            <!-- Step-by-Step Guide -->
                            <div class="row">
                                <div class="col-12">
                                    <h6><i class="fas fa-list-ol text-primary me-2"></i>Step-by-Step Integration Guide</h6>
                                    
                                    <!-- Step 1 -->
                                    <div class="card mb-3 border-success">
                                        <div class="card-header bg-success text-white">
                                            <h6 class="mb-0"><i class="fas fa-step-forward me-2"></i>Step 1: Understanding the Events</h6>
                                        </div>
                                        <div class="card-body">
                                            <p>KingsLibrary automatically sends these "notifications" (events) when things happen:</p>
                                            <div class="table-responsive">
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th width="25%">Event Name</th>
                                                            <th width="35%">When It Happens</th>
                                                            <th width="40%">Real-World Example</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><code class="text-success">form:success</code></td>
                                                            <td>Form submitted successfully</td>
                                                            <td>Contact form sent → Show "Message sent!" notification</td>
                                                        </tr>
                                                        <tr>
                                                            <td><code class="text-danger">form:error</code></td>
                                                            <td>Form has validation errors</td>
                                                            <td>Email field empty → Show "Email is required" error</td>
                                                        </tr>
                                                        <tr>
                                                            <td><code class="text-info">ajax:success</code></td>
                                                            <td>Any data request succeeds</td>
                                                            <td>Loading dashboard data → Update charts and counters</td>
                                                        </tr>
                                                        <tr>
                                                            <td><code class="text-primary">data:saved</code></td>
                                                            <td>Data saved to database</td>
                                                            <td>User profile updated → Refresh user menu</td>
                                                        </tr>
                                                        <tr>
                                                            <td><code class="text-warning">auth:login</code></td>
                                                            <td>User logs in successfully</td>
                                                            <td>Login successful → Redirect to dashboard</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Step 2 -->
                                    <div class="card mb-3 border-info">
                                        <div class="card-header bg-info text-white">
                                            <h6 class="mb-0"><i class="fas fa-step-forward me-2"></i>Step 2: Choose Your Integration Method</h6>
                                        </div>
                                        <div class="card-body">
                                            <p>You have 3 ways to "listen" for these events. Pick the one that fits your skill level:</p>
                                            
                                            <div class="row">
                                                <div class="col-lg-4 mb-3">
                                                    <div class="card h-100 border-success">
                                                        <div class="card-header bg-light">
                                                            <h6 class="text-success mb-0">
                                                                <i class="fas fa-tags me-1"></i> Method 1: HTML Only
                                                                <span class="badge bg-success ms-2">Easiest</span>
                                                            </h6>
                                                        </div>
                                                        <div class="card-body">
                                                            <p class="small"><strong>Best for:</strong> Beginners, no JavaScript knowledge needed</p>
                                                            <p class="small"><strong>How it works:</strong> KingsLibrary automatically detects and handles <code>data-event</code> attributes on any element</p>
                                                            <div class="bg-light p-2 rounded">
                                                                <code class="small">
                                                                    &lt;button data-event="kingslibrary:form:success"<br>
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data-event-detail='{"response":{"message":"Saved!"}}'&gt;<br>
                                                                    &nbsp;&nbsp;Save Data<br>
                                                                    &lt;/button&gt;
                                                                </code>
                                                            </div>
                                                            <p class="small text-muted mt-1"><strong>✨ Magic:</strong> KingsLibrary sees this button and automatically adds a click handler that triggers the event - no JavaScript needed!</p>
                                                            <button class="btn btn-sm btn-success mt-2 w-100" 
                                                                    data-event="kingslibrary:form:success" 
                                                                    data-event-detail='{"response":{"message":"HTML-only event triggered! No JavaScript needed!"}}'>
                                                                <i class="fas fa-play me-1"></i> Try This Method
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-4 mb-3">
                                                    <div class="card h-100 border-warning">
                                                        <div class="card-header bg-light">
                                                            <h6 class="text-warning mb-0">
                                                                <i class="fab fa-js-square me-1"></i> Method 2: JavaScript
                                                                <span class="badge bg-warning ms-2">Medium</span>
                                                            </h6>
                                                        </div>
                                                        <div class="card-body">
                                                            <p class="small"><strong>Best for:</strong> Custom logic, complex interactions</p>
                                                            <p class="small"><strong>How it works:</strong> Listen for events with JavaScript code</p>
                                                            <div class="bg-light p-2 rounded">
                                                                <code class="small">
                                                                    document.addEventListener('kingslibrary:form:success', function(e) {<br>
                                                                    &nbsp;&nbsp;alert('Form saved: ' + e.detail.response.message);<br>
                                                                    });
                                                                </code>
                                                            </div>
                                                            <button class="btn btn-sm btn-warning mt-2 w-100" onclick="
                                                                document.dispatchEvent(new CustomEvent('kingslibrary:form:success', {
                                                                    detail: { response: { message: 'JavaScript event triggered!' } }
                                                                }));">
                                                                <i class="fas fa-play me-1"></i> Try This Method
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-4 mb-3">
                                                    <div class="card h-100 border-danger">
                                                        <div class="card-header bg-light">
                                                            <h6 class="text-danger mb-0">
                                                                <i class="fab fa-laravel me-1"></i> Method 3: Backend
                                                                <span class="badge bg-danger ms-2">Advanced</span>
                                                            </h6>
                                                        </div>
                                                        <div class="card-body">
                                                            <p class="small"><strong>Best for:</strong> Server integration, database operations</p>
                                                            <p class="small"><strong>How it works:</strong> Your server tells the browser to trigger events</p>
                                                            <div class="bg-light p-2 rounded">
                                                                <code class="small">
                                                                    // In your Laravel controller (AJAX form response)<br>
                                                                    return response()-&gt;json([<br>
                                                                    &nbsp;&nbsp;'success' =&gt; true,<br>
                                                                    &nbsp;&nbsp;'message' =&gt; 'Data saved successfully!'<br>
                                                                    ]);
                                                                </code>
                                                            </div>
                                                            <p class="small text-muted mt-1">✨ KingsLibrary automatically triggers events when forms with class <code>ajax-form</code> receive responses!</p>
                                                            <div class="text-center mt-2">
                                                                <span class="badge bg-secondary">Server-Side</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Step 3 -->
                                    <div class="card mb-3 border-primary">
                                        <div class="card-header bg-primary text-white">
                                            <h6 class="mb-0"><i class="fas fa-step-forward me-2"></i>Step 3: Practical Examples You Can Copy</h6>
                                        </div>
                                        <div class="card-body">
                                            
                                            <!-- Example 1: Form Success -->
                                            <div class="mb-4">
                                                <h6 class="text-success"><i class="fas fa-check-circle me-2"></i>Example 1: Show Success Message When Form Submits</h6>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <p class="small mb-2"><strong>What you want:</strong> When user submits contact form, show "Message sent!" notification</p>
                                                        <p class="small mb-2"><strong>The HTML:</strong></p>
                                                        <div class="bg-light p-2 rounded small">
                                                            <code>
                                                                &lt;form class="ajax-form" data-action="/contact"&gt;<br>
                                                                &nbsp;&nbsp;&lt;input name="email" required&gt;<br>
                                                                &nbsp;&nbsp;&lt;button type="submit"&gt;Send&lt;/button&gt;<br>
                                                                &lt;/form&gt;
                                                            </code>
                                                        </div>
                                                        <p class="small text-muted mt-1">✨ KingsLibrary automatically handles this form and shows notifications!</p>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p class="small mb-2"><strong>Optional custom JavaScript:</strong></p>
                                                        <div class="bg-light p-2 rounded small">
                                                            <code>
                                                                document.addEventListener('kingslibrary:form:success', function(e) {<br>
                                                                &nbsp;&nbsp;// Custom success action (optional - KingsLibrary handles basic notifications)<br>
                                                                &nbsp;&nbsp;console.log('Form submitted:', e.detail.response);<br>
                                                                });
                                                            </code>
                                                        </div>
                                                        <p class="small mt-2 text-muted">That's it! KingsLibrary handles the rest automatically.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Example 2: Form Error -->
                                            <div class="mb-4">
                                                <h6 class="text-danger"><i class="fas fa-exclamation-triangle me-2"></i>Example 2: Handle Form Validation Errors</h6>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <p class="small mb-2"><strong>What you want:</strong> When form has errors, show specific error messages</p>
                                                        <p class="small mb-2"><strong>The JavaScript listener:</strong></p>
                                                        <div class="bg-light p-2 rounded small">
                                                            <code>
                                                                document.addEventListener('kingslibrary:form:error', function(e) {<br>
                                                                &nbsp;&nbsp;// Get error details<br>
                                                                &nbsp;&nbsp;const errors = e.detail.errors;<br>
                                                                &nbsp;&nbsp;console.log('Form errors:', errors);<br>
                                                                });
                                                            </code>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p class="small mb-2"><strong>What you get in the event:</strong></p>
                                                        <div class="bg-light p-2 rounded small">
                                                            <code>
                                                                {<br>
                                                                &nbsp;&nbsp;"errors": {<br>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;"email": ["Email is required"],<br>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;"name": ["Name must be at least 3 characters"]<br>
                                                                &nbsp;&nbsp;}<br>
                                                                }
                                                            </code>
                                                        </div>
                                                        <button class="btn btn-sm btn-danger mt-2" onclick="
                                                            document.dispatchEvent(new CustomEvent('kingslibrary:form:error', {
                                                                detail: { errors: { email: ['Email is required'], name: ['Name too short'] } }
                                                            }));
                                                        ">
                                                            <i class="fas fa-play me-1"></i> Try Error Example
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Example 3: Data Saved -->
                                            <div class="mb-4">
                                                <h6 class="text-info"><i class="fas fa-database me-2"></i>Example 3: Update UI When Data Changes</h6>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <p class="small mb-2"><strong>What you want:</strong> When user profile is updated, refresh the user menu</p>
                                                        <p class="small mb-2"><strong>The JavaScript listener:</strong></p>
                                                        <div class="bg-light p-2 rounded small">
                                                            <code>
                                                                document.addEventListener('kingslibrary:data:saved', function(e) {<br>
                                                                &nbsp;&nbsp;// Refresh user menu<br>
                                                                &nbsp;&nbsp;location.reload(); // Simple refresh<br>
                                                                &nbsp;&nbsp;// OR update specific elements<br>
                                                                &nbsp;&nbsp;$('#user-menu').load('/api/user-menu');<br>
                                                                });
                                                            </code>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p class="small mb-2"><strong>When this happens:</strong></p>
                                                        <ul class="small">
                                                            <li>User updates their profile</li>
                                                            <li>Admin creates a new record</li>
                                                            <li>Any database save operation</li>
                                                        </ul>
                                                        <button class="btn btn-sm btn-info mt-2" onclick="
                                                            document.dispatchEvent(new CustomEvent('kingslibrary:data:saved', {
                                                                detail: { data: { id: 123, name: 'John Updated' }, operation: 'update' }
                                                            }));
                                                        ">
                                                            <i class="fas fa-play me-1"></i> Try Data Saved Event
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Step 4 -->
                                    <div class="card mb-3 border-warning">
                                        <div class="card-header bg-warning text-dark">
                                            <h6 class="mb-0"><i class="fas fa-step-forward me-2"></i>Step 4: Testing Your Setup</h6>
                                        </div>
                                        <div class="card-body">
                                            <p>Use the browser console to see events in action:</p>
                                            <ol class="small">
                                                <li>Press <kbd>F12</kbd> to open browser developer tools</li>
                                                <li>Go to the "Console" tab</li>
                                                <li>Add this code to see all events:</li>
                                            </ol>
                                            <div class="bg-dark text-light p-3 rounded">
                                                <code>
// Listen to ALL KingsLibrary events
['form:success', 'form:error', 'ajax:success', 'data:saved', 'auth:login'].forEach(event => {
  document.addEventListener('kingslibrary:' + event, function(e) {
    console.log('🎉 Event triggered:', event, e.detail);
  });
});

console.log('✅ Event listeners added! Now click the demo buttons above to see events.');
                                                </code>
                                            </div>
                                            
                                            <!-- Copy Button -->
                                            <button class="btn btn-sm btn-success mt-2" onclick="
                                                const code = `// Listen to ALL KingsLibrary events
['form:success', 'form:error', 'ajax:success', 'data:saved', 'auth:login'].forEach(event => {
  document.addEventListener('kingslibrary:' + event, function(e) {
    console.log('🎉 Event triggered:', event, e.detail);
  });
});

console.log('✅ Event listeners added! Now click the demo buttons above to see events.');`;
                                                
                                                // Try modern clipboard API first, fallback to legacy method
                                                if (navigator.clipboard && navigator.clipboard.writeText) {
                                                    navigator.clipboard.writeText(code).then(() => {
                                                        alert('✅ Code copied to clipboard! Now paste it in your browser console (F12 → Console tab)');
                                                    }).catch(() => {
                                                        copyFallback(code);
                                                    });
                                                } else {
                                                    copyFallback(code);
                                                }
                                                
                                                function copyFallback(text) {
                                                    const textArea = document.createElement('textarea');
                                                    textArea.value = text;
                                                    textArea.style.position = 'fixed';
                                                    textArea.style.left = '-999999px';
                                                    textArea.style.top = '-999999px';
                                                    document.body.appendChild(textArea);
                                                    textArea.focus();
                                                    textArea.select();
                                                    try {
                                                        const successful = document.execCommand('copy');
                                                        if (successful) {
                                                            alert('✅ Code copied to clipboard! Now paste it in your browser console (F12 → Console tab)');
                                                        } else {
                                                            showManualCopy(text);
                                                        }
                                                    } catch (err) {
                                                        showManualCopy(text);
                                                    } finally {
                                                        document.body.removeChild(textArea);
                                                    }
                                                }
                                                
                                                function showManualCopy(text) {
                                                    const modal = document.createElement('div');
                                                    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;';
                                                    modal.innerHTML = `
                                                        <div style='background:white;padding:20px;border-radius:8px;max-width:600px;margin:20px;'>
                                                            <h5>📋 Manual Copy Required</h5>
                                                            <p>Please manually copy this code and paste it in your browser console:</p>
                                                            <textarea readonly style='width:100%;height:200px;font-family:monospace;font-size:12px;'>${text}</textarea>
                                                            <div style='margin-top:15px;text-align:center;'>
                                                                <button onclick='this.parentElement.parentElement.parentElement.remove()' class='btn btn-primary'>Close</button>
                                                            </div>
                                                        </div>
                                                    `;
                                                    document.body.appendChild(modal);
                                                    modal.querySelector('textarea').select();
                                                }
                                            ">
                                                <i class="fas fa-copy me-1"></i> Copy Code to Clipboard
                                            </button>
                                            <p class="mt-2 small">Now click any of the demo buttons above and watch the console!</p>
                                        </div>
                                    </div>

                                    <!-- Quick Reference -->
                                    <div class="alert alert-success">
                                        <h6><i class="fas fa-bookmark me-2"></i>Quick Reference - Copy These Event Names</h6>
                                        <div class="row small">
                                            <div class="col-md-6">
                                                <ul class="mb-0">
                                                    <li><code>kingslibrary:form:success</code> - Form submitted successfully</li>
                                                    <li><code>kingslibrary:form:error</code> - Form has validation errors</li>
                                                    <li><code>kingslibrary:ajax:success</code> - AJAX request completed</li>
                                                </ul>
                                            </div>
                                            <div class="col-md-6">
                                                <ul class="mb-0">
                                                    <li><code>kingslibrary:data:saved</code> - Data saved to database</li>
                                                    <li><code>kingslibrary:auth:login</code> - User logged in successfully</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                
                </section>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>KingsLibrary v1.0</h5>
                    <p class="mb-0">Transform your web development workflow today!</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <p class="mb-0">Made with <i class="fas fa-heart text-danger"></i> by <strong>Kingkology</strong>
                    </p>
                    <small class="text-muted">
                        <a href="https://github.com/kingkology/kingslibrary" class="text-muted">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                    </small>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <!-- jQuery (required for KingsLibrary) -->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

    <!-- DataTables JS -->
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.5.0/js/dataTables.responsive.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.5.0/js/responsive.bootstrap5.min.js"></script>

    <!-- Export libraries for DataTables -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>

    <!-- SweetAlert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.all.min.js"></script>

    <!-- Prism.js for syntax highlighting -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js">
    </script>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js">
    </script>

    <!-- KingsLibrary JavaScript -->
    <script src="<?php echo e(asset('dist/kingslibrary.min.js')); ?>"></script>

    <!-- Initialize KingsLibrary -->
    <script>
        // Initialize KingsLibrary when DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            if (window.KL) {
                window.KL.init({
                    debug: true
                });
                console.log('🏛️ KingsLibrary initialized successfully!');
            } else {
                console.error('❌ KingsLibrary not found!');
            }
        });

        // Debug KingsLibrary initialization
        window.addEventListener('load', function () {
            console.log('🔍 Checking KingsLibrary initialization...');

            // Check dependencies
            console.log('📚 Dependencies Status:');
            console.log('  ✅ jQuery:', typeof $ !== 'undefined' ? `v${$.fn.jquery || 'unknown'}` : '❌ Missing');
            console.log('  ✅ Bootstrap:', typeof bootstrap !== 'undefined' ? 'Available' : '❌ Missing');
            console.log('  ✅ DataTables:', typeof $.fn.DataTable !== 'undefined' ? 'Available' : '❌ Missing');
            console.log('  ✅ SweetAlert2:', typeof Swal !== 'undefined' ? 'Available' : '❌ Missing');

            // Check KingsLibrary
            console.log('🏛️ KingsLibrary Status:');
            console.log('  ✅ KL Object:', window.KL ? 'Available' : '❌ Missing');
            if (window.KL) {
                console.log('  ✅ Initialized:', window.KL.isInitialized || false);
                console.log('  ✅ Utilities:', window.KL.utilities ? window.KL.utilities.size : 'Unknown');
            }

            // Check if tables are initialized
            const tables = document.querySelectorAll('.datatable-init');
            console.log(`📊 Found ${tables.length} table(s) with .datatable-init class`);

            tables.forEach((table, index) => {
                if (typeof $.fn.DataTable !== 'undefined') {
                    const isInitialized = $.fn.dataTable.isDataTable(table);
                    console.log(`  📋 Table ${index + 1} initialized: ${isInitialized ? '✅' : '❌'}`);
                }
            });

            // Check notification buttons
            const notificationButtons = document.querySelectorAll('.notification-trigger');
            console.log(`🔔 Found ${notificationButtons.length} notification trigger(s)`);

            // Check data-event buttons
            const dataEventButtons = document.querySelectorAll('[data-event]');
            console.log(`⚡ Found ${dataEventButtons.length} data-event button(s)`);

            dataEventButtons.forEach((button, index) => {
                console.log(`  🎯 Button ${index + 1}: ${button.dataset.event}`);
            });

            console.log('🎯 Ready to test! Try clicking notification buttons or data-event buttons!');
        });
    </script>
</body>

</html><?php /**PATH C:\Users\user\Herd\kingslibrary\resources\views/documentation/index.blade.php ENDPATH**/ ?>