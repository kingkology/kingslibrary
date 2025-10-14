# KingsLibrary v1.0

**Event-driven JavaScript utilities that work through classes**

KingsLibrary is a lightweight utility library that automatically adds functionality to your web applications through classes. No manual initialization, no complex setup - just add classes to your HTML and watch the magic happen.

[![npm version](https://badge.fury.io/js/kingslibrary.svg)](https://www.npmjs.com/package/kingslibrary)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What KingsLibrary Does

KingsLibrary transforms static HTML into interactive experiences by detecting classes and automatically binding functionality:

- **AJAX Forms**: Add `ajax-form` class for instant form submission with validation
- **Data Tables**: Add `datatable-init` class for sortable, searchable tables with export
- **Notifications**: Add `toast-trigger` class for beautiful toast notifications
- **Password Tools**: Add `password-strength` class for password strength indicators
- **File Uploads**: Add `file-upload` class for drag-and-drop file handling
- **And much more**: All through simple classes

## Why Choose KingsLibrary

- **Zero Configuration**: No initialization code required
- **Framework Agnostic**: Works with any framework (Bootstrap, Tailwind, Bulma, etc.)
- **Event-Driven**: Uses modern event delegation for optimal performance
- **Lightweight**: Minimal footprint with modular architecture
- **Developer Friendly**: Clean API with TypeScript definitions

## Installation & Setup

### Manual Download (Recommended)

1. **Download KingsLibrary files**:
   - Download `kingslibrary.min.js` from the [GitHub repository](https://github.com/kingkology/kingslibrary/tree/master/dist)
   - Place it in your project's JavaScript folder

2. **Include in your HTML**:

```html
<!-- Required: jQuery -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js"></script>

<!-- KingsLibrary (local file) -->
<script src="path/to/your/js/kingslibrary.min.js"></script>
```

### NPM/Yarn

```bash
npm install kingslibrary
# or
yarn add kingslibrary
```

Then import in your JavaScript:

```javascript
// ES6 Modules
import 'kingslibrary';

// CommonJS
require('kingslibrary');
```

## Framework Integration

### Vanilla HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Project</title>
    <!-- Your CSS framework -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- Your content -->
    <form class="ajax-form" data-action="/api/contact">
        <input type="email" class="validate-field form-control" data-validation="required,email">
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js"></script>
    <script src="js/kingslibrary.min.js"></script>
</body>
</html>
```

### React

```jsx
import { useEffect } from 'react';

function MyComponent() {
    return (
        <div>
            <form className="ajax-form" data-action="/api/contact">
                <input 
                    type="email" 
                    className="validate-field form-control" 
                    data-validation="required,email"
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

// KingsLibrary automatically detects new elements
export default MyComponent;
```

### Vue.js

```vue
<template>
    <form class="ajax-form" :data-action="apiUrl">
        <input 
            type="email" 
            class="validate-field form-control"
            data-validation="required,email"
            v-model="email"
        />
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            apiUrl: '/api/contact'
        }
    }
}
</script>
```

### Laravel Blade

```blade
<form class="ajax-form" data-action="{{ route('api.contact') }}">
    @csrf
    <input type="email" 
           class="validate-field form-control" 
           data-validation="required,email" 
           name="email">
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### WordPress

```php
// In your theme's functions.php - Upload kingslibrary.min.js to your theme's js folder
function enqueue_kingslibrary() {
    wp_enqueue_script('jquery');
    wp_enqueue_script('kingslibrary', get_template_directory_uri() . '/js/kingslibrary.min.js', array('jquery'));
}
add_action('wp_enqueue_scripts', 'enqueue_kingslibrary');
```

```html
<!-- In your template -->
<form class="ajax-form" data-action="<?php echo admin_url('admin-ajax.php'); ?>">
    <input type="email" class="validate-field" data-validation="required,email">
    <button type="submit">Submit</button>
</form>
```

## Quick Example

Once KingsLibrary is included, just add classes to make your HTML interactive:

```html
<!-- AJAX Form with Validation -->
<form class="ajax-form" data-action="/api/contact" data-success="Message sent!">
    <input type="text" class="validate-field" data-validation="required" placeholder="Name">
    <input type="email" class="validate-field" data-validation="required,email" placeholder="Email">
    <button type="submit">Send Message</button>
</form>

<!-- Interactive Data Table -->
<table class="datatable-init" data-page-length="10">
    <thead>
        <tr><th>Name</th><th>Email</th><th>Role</th></tr>
    </thead>
    <tbody>
        <tr><td>John Doe</td><td>john@example.com</td><td>Developer</td></tr>
        <tr><td>Jane Smith</td><td>jane@example.com</td><td>Designer</td></tr>
    </tbody>
</table>

<!-- Toast Notifications -->
<button class="toast-trigger btn btn-success" 
        data-type="success" 
        data-title="Success!" 
        data-message="Operation completed">
    Show Success Message
</button>

<!-- Password Strength Checker -->
<input type="password" class="password-strength" placeholder="Enter password">
```

That's it! No initialization code, no complex setup - KingsLibrary automatically detects these classes and adds the functionality.

## Documentation & Examples

### Interactive Playground
Try KingsLibrary features live with real examples:
- **[Live Playground](http://kingslibrary.test/docs/playground)** - Interactive examples you can modify and test

### Code Snippets
Ready-to-use code examples for all utilities:
- **[Code Snippets](http://kingslibrary.test/docs/snippets)** - Copy-paste examples for every feature

### Complete Documentation
Full API reference and advanced usage:
- **[Documentation Home](http://kingslibrary.test/docs)** - Complete feature overview and tutorials

## Available Utilities

| Class | Description | Key Features |
|-----------|-------------|--------------|
| `ajax-form` | AJAX form submission with validation | Auto-validation, error handling, success messages |
| `datatable-init` | Interactive data tables | Sorting, pagination, search, export (Excel/CSV/PDF) |
| `toast-trigger` | Toast notifications | Success/error/warning/info notifications |
| `password-strength` | Password strength checker | Real-time strength meter with feedback |
| `file-upload` | File upload with drag-and-drop | Preview, validation, progress tracking |
| `validate-field` | Form field validation | Real-time validation with custom rules |
| `export-excel` | Export table data | One-click Excel/CSV export |
| `toggle-password` | Password visibility toggle | Show/hide password functionality |

## Backend Integration

KingsLibrary provides seamless integration with backend frameworks like Laravel, making it easy to display notifications based on server responses, session messages, and form submissions.

### Laravel Integration

#### Quick Setup
Add flash messages to meta tags in your Blade layout:

```php
{{-- In your layout file (e.g., app.blade.php) --}}
@if(session('success'))
    <meta name="flash-success" content="{{ session('success') }}">
@endif
@if(session('error'))
    <meta name="flash-error" content="{{ session('error') }}">
@endif
@if(session('warning'))
    <meta name="flash-warning" content="{{ session('warning') }}">
@endif
@if(session('info'))
    <meta name="flash-info" content="{{ session('info') }}">
@endif
```

#### Laravel Controller Example
```php
<?php

class UserController extends Controller
{
    public function store(Request $request)
    {
        try {
            User::create($request->validated());
            return redirect()->route('users.index')
                ->with('success', 'User created successfully!');
        } catch (Exception $e) {
            return redirect()->back()
                ->with('error', 'An error occurred. Please try again.')
                ->withInput();
        }
    }
}
```

### JavaScript API

#### Automatic Detection
KingsLibrary automatically detects and displays backend messages on page load:

```javascript
// This runs automatically - no code needed!
// But you can manually trigger it:
KingsLibrary.checkSessionMessages();
```

#### Manual Notifications
```javascript
// Show different types of notifications
KingsLibrary.showNotification('success', 'Task completed!');
KingsLibrary.showNotification('error', 'Something went wrong!');
KingsLibrary.showNotification('warning', 'Please review your input.');

// Quick toast notifications
KingsNotify.successToast('Quick success message');
KingsNotify.errorToast('Quick error message');

// Confirmation dialogs
KingsNotify.confirmDelete('this user').then(result => {
    if (result.isConfirmed) {
        // Proceed with deletion
    }
});

// Loading dialogs
KingsNotify.loading('Processing request...');
// Later...
KingsNotify.closeLoading();
```

#### Form Integration Example
```javascript
// Handle form submission with notifications
$('#user-form').on('submit', function(e) {
    e.preventDefault();
    
    KingsNotify.loading('Saving user...');
    
    $.ajax({
        url: $(this).attr('action'),
        method: 'POST',
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function(response) {
            KingsNotify.closeLoading();
            KingsNotify.successToast('User saved successfully!');
        },
        error: function(xhr) {
            KingsNotify.closeLoading();
            if (xhr.status === 422) {
                KingsNotify.showValidationErrors(xhr.responseJSON.errors);
            } else {
                KingsNotify.errorToast('An error occurred');
            }
        }
    });
});
```

### Event-Driven Integration

KingsLibrary listens for custom events:

```javascript
// Trigger notifications via events
document.dispatchEvent(new CustomEvent('kingslibrary:form:success', {
    detail: { response: { message: 'Profile updated!' } }
}));

document.dispatchEvent(new CustomEvent('kingslibrary:form:error', {
    detail: { error: { message: 'Please fix the errors.' } }
}));
```

### Data Attribute Integration

Use data attributes for zero-JavaScript solutions:

```html
<!-- Trigger events -->
<button data-event="kingslibrary:form:success"
        data-event-detail='{"response":{"message":"Form submitted!"}}'>
    Submit Form
</button>

<!-- Call notification methods -->
<button data-notification="successToast"
        data-message="Changes saved!">
    Save Changes
</button>

<!-- Confirmation dialogs -->
<button data-notification="confirmDelete"
        data-item="this user">
    Delete User
</button>
```

### Available Backend Events
- `kingslibrary:form:success` - Form submission success
- `kingslibrary:form:error` - Form submission error
- `kingslibrary:ajax:success` - AJAX request success
- `kingslibrary:ajax:error` - AJAX request error
- `kingslibrary:validation:error` - Validation errors
- `kingslibrary:data:saved` - Data save success
- `kingslibrary:data:deleted` - Data deletion success
- `kingslibrary:auth:login` - User login success
- `kingslibrary:auth:logout` - User logout
- `kingslibrary:network:offline` - Network offline
- `kingslibrary:session:expired` - Session expired

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

**Requirements:**
- jQuery 3.6+ (automatically loaded if using CDN)

## Getting Started

1. **Add KingsLibrary to your project** (see installation above)
2. **Add classes to your HTML elements**
3. **That's it!** - No initialization code needed

For detailed examples and API reference, visit the [Interactive Playground](http://kingslibrary.test/docs/playground) or browse the [Code Snippets](http://kingslibrary.test/docs/snippets).

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: [http://kingslibrary.test/docs](http://kingslibrary.test/docs)
- **Interactive Examples**: [http://kingslibrary.test/docs/playground](http://kingslibrary.test/docs/playground)
- **Code Snippets**: [http://kingslibrary.test/docs/snippets](http://kingslibrary.test/docs/snippets)
- **Issues**: [GitHub Issues](https://github.com/kingkology/kingslibrary/issues)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

**Built by [Kingkology](https://github.com/kingkology) • Version 1.0.0 • MIT License**