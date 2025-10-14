import './bootstrap';
import './kingslibrary/core';
import './kingslibrary/utilities/form';
import './kingslibrary/utilities/password';
import './kingslibrary/utilities/table';
import './kingslibrary/utilities/media';
import './kingslibrary/utilities/notification';
import './kingslibrary/utilities/action';
import './kingslibrary/utilities/image';
import './kingslibrary/utilities/chat';
import './kingslibrary/utilities/pagelet';

// Initialize KingsLibrary when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Auto-initialize KingsLibrary with default configuration
    KL.init({
        debug: true,
        notifications: {
            position: 'top-right',
            duration: 4000
        }
    });
    
    console.log('KingsLibrary initialized successfully!');
});