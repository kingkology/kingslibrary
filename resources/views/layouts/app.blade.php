<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>@yield('title', 'KingsLibrary v1.0')</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- DataTables CSS -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.2/css/buttons.bootstrap5.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.bootstrap5.min.css">
    
    <!-- SweetAlert2 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.min.css">
    
    <!-- CodeMirror for code editing -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/theme/dracula.min.css">
    
    <!-- Prism.js for syntax highlighting -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
    
    <!-- KingsLibrary Styles -->
    @vite(['resources/sass/app.scss'])
    
    @stack('styles')
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand fw-bold" href="{{ route('docs.index') }}">
                <i class="fas fa-crown text-warning me-2"></i>
                KingsLibrary v1.0
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('docs.index') ? 'active' : '' }}" 
                           href="{{ route('docs.index') }}">
                            <i class="fas fa-home me-1"></i> Documentation
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('docs.playground') ? 'active' : '' }}" 
                           href="{{ route('docs.playground') }}">
                            <i class="fas fa-code me-1"></i> Playground
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('docs.snippets') ? 'active' : '' }}" 
                           href="{{ route('docs.snippets') }}">
                            <i class="fas fa-code-branch me-1"></i> Snippets
                        </a>
                    </li>
                </ul>
                
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="fas fa-cog me-1"></i> Tools
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/debug" target="_blank">
                                <i class="fas fa-bug me-2"></i> Debug Info
                            </a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="https://github.com/kingkology/kingslibrary" target="_blank">
                                <i class="fab fa-github me-2"></i> GitHub
                            </a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow-1">
        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-light py-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5 class="text-warning">
                        <i class="fas fa-crown me-2"></i>
                        KingsLibrary v1.0
                    </h5>
                    <p class="mb-2">A modern JavaScript utility library for enhanced web development.</p>
                    <p class="text-muted small mb-0">
                        Built with <i class="fas fa-heart text-danger"></i> by the KingsLibrary team
                    </p>
                </div>
                <div class="col-md-3">
                    <h6 class="text-warning">Quick Links</h6>
                    <ul class="list-unstyled">
                        <li><a href="{{ route('docs.index') }}" class="text-light text-decoration-none">Documentation</a></li>
                        <li><a href="{{ route('docs.playground') }}" class="text-light text-decoration-none">Playground</a></li>
                        <li><a href="{{ route('docs.snippets') }}" class="text-light text-decoration-none">Code Snippets</a></li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <h6 class="text-warning">Features</h6>
                    <ul class="list-unstyled">
                        <li><span class="text-light">✓ Enhanced DataTables</span></li>
                        <li><span class="text-light">✓ Form Validation</span></li>
                        <li><span class="text-light">✓ Notification System</span></li>
                        <li><span class="text-light">✓ Chat Utilities</span></li>
                        <li><span class="text-light">✓ Image Handling</span></li>
                        <li><span class="text-light">✓ Pagelet System</span></li>
                    </ul>
                </div>
            </div>
            <hr class="my-3 border-secondary">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <p class="mb-0 text-muted small">
                        © {{ date('Y') }} KingsLibrary. All rights reserved.
                    </p>
                </div>
                <div class="col-md-6 text-md-end">
                    <a href="https://github.com/kingkology/kingslibrary" class="text-light me-3" target="_blank">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="#" class="text-light me-3">
                        <i class="fas fa-book"></i> Docs
                    </a>
                    <a href="#" class="text-light">
                        <i class="fas fa-question-circle"></i> Support
                    </a>
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
    
    <!-- CodeMirror -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/javascript/javascript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/xml/xml.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/css/css.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/php/php.min.js"></script>
    
    <!-- Prism.js for syntax highlighting -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"></script>
    
    <!-- KingsLibrary JavaScript -->
    <script src="{{ asset('dist/kingslibrary.min.js') }}"></script>
    @vite(['resources/sass/app.scss'])
    
    @stack('scripts')
    
    <!-- Page-specific scripts -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize tooltips
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
            
            // Initialize popovers
            var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
            var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
                return new bootstrap.Popover(popoverTriggerEl);
            });
            
            console.log('KingsLibrary Layout: Page fully loaded and initialized');
        });
    </script>
</body>
</html>