/**
 * KingsLibrary v1.0.0
 * A lightweight, event-driven JavaScript utility library
 * 
 * @author KingsLibrary Team
 * @license MIT
 * @homepage https://github.com/kingkology/kingslibrary
 */

// Import core library
import './core.js';

// Import all utilities
import './utilities/form.js';
import './utilities/password.js';
import './utilities/table.js';
import './utilities/media.js';
import './utilities/notification.js';
import './utilities/action.js';
import './utilities/image.js';
import './utilities/chat.js';
import './utilities/pagelet.js';

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (window.KL) {
                window.KL.init();
            }
        });
    } else {
        // DOM is already ready
        if (window.KL) {
            window.KL.init();
        }
    }
}

// Export for module systems
export default window.KL;