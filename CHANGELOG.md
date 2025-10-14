# Changelog

All notable changes to KingsLibrary will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-05

### Initial Release

KingsLibrary v1.0 provides modern, event-driven JavaScript utilities through CSS classes with automatic functionality binding.

### Core Features

- **Event-Driven Design**: All utilities work through CSS classes with automatic event delegation
- **Framework Agnostic**: Works with Bootstrap, Tailwind, Bulma, or any CSS framework  
- **Zero Configuration**: Works out of the box with sensible defaults
- **TypeScript Definitions**: Full TypeScript support with detailed type definitions
- **Multiple Build Formats**: UMD, ES Module, and IIFE builds for maximum compatibility

### Utilities Included

- **FormUtility**: AJAX forms with validation (`.ajax-form`, `.validate-field`)
- **TableUtility**: DataTables integration with export (`.datatable-init`, `.export-excel`)
- **NotificationUtility**: Toast notifications and alerts (`.toast-trigger`, `.alert-trigger`)
- **PasswordUtility**: Password strength and visibility (`.password-strength`, `.password-toggle`)
- **MediaUtility**: File uploads and drag-drop (`.file-upload`, `.file-drop-zone`)
- **ActionUtility**: Generic AJAX actions (`.ajax-action`, `.confirm-action`)
- **ImageUtility**: Image previews and galleries (`.image-preview`, `.image-gallery`)
- **ChatUtility**: Real-time messaging interface (`.chat-container`, `.chat-send`)
- **PageletUtility**: Dynamic content loading (`.pagelet-trigger`, `.pagelet-clear`)

### Build System

- **Vite Configuration**: Modern build system with multiple output formats
- **UMD Build**: `kingslibrary.umd.js` for AMD/CommonJS/Global usage
- **ES Module Build**: `kingslibrary.esm.js` for modern bundlers
- **IIFE Build**: `kingslibrary.min.js` for direct browser usage
- **Source Maps**: Full source map support for debugging
- **Minification**: Optimized builds with Terser

### Distribution

- **NPM**: Available as `kingslibrary` package
- **CDN (GitHub)**: `https://cdn.jsdelivr.net/gh/kingkology/kingslibrary@1/dist/kingslibrary.min.js`

### Technical Specifications

- **Dependencies**: jQuery 3.6+ (external)
- **Browser Support**: Modern browsers (ES6+)
- **Bundle Size**: ~62KB minified, ~17KB gzipped
- **License**: MIT

### Basic Usage

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/kingkology/kingslibrary@1/dist/kingslibrary.min.js"></script>

<form class="ajax-form" data-action="/api/contact">
    <input type="email" class="validate-field" data-validation="required,email">
    <button type="submit">Submit</button>
</form>
```

### Configuration (Optional)

```javascript
KingsLibrary.config({
    apiBaseUrl: '/api',
    notifications: { position: 'top-right' },
    forms: { validateOnBlur: true },
    tables: { pageLength: 25 },
    debug: false
});
```