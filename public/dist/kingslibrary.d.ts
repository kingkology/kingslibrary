/**
 * KingsLibrary v3.0.0
 * Event-driven JavaScript utilities for modern web development
 * 
 * @author Kingkology
 * @license MIT
 */

declare namespace KingsLibrary {
    interface Config {
        apiBaseUrl?: string;
        csrfToken?: string;
        notifications?: NotificationConfig;
        forms?: FormConfig;
        tables?: TableConfig;
        debug?: boolean;
    }

    interface NotificationConfig {
        position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
        duration?: number;
        showProgressBar?: boolean;
    }

    interface FormConfig {
        validateOnBlur?: boolean;
        showInlineErrors?: boolean;
        resetAfterSubmit?: boolean;
    }

    interface TableConfig {
        pageLength?: number;
        responsive?: boolean;
        language?: {
            url?: string;
        };
    }

    interface ValidationRule {
        rule: string;
        message?: string;
        params?: any[];
    }

    interface FormSubmissionResult {
        success: boolean;
        data?: any;
        message?: string;
        errors?: Record<string, string[]>;
        redirect?: string;
    }

    interface NotificationOptions {
        type?: 'success' | 'error' | 'warning' | 'info';
        title?: string;
        message?: string;
        duration?: number;
        position?: string;
    }

    interface CustomEvent {
        type: string;
        detail?: any;
        bubbles?: boolean;
        cancelable?: boolean;
    }

    abstract class BaseUtility {
        protected selector: string;
        protected initialized: boolean;
        
        constructor();
        abstract init(): void;
        abstract bindEvents(): void;
        destroy(): void;
        config(options: any): void;
        log(...args: any[]): void;
        trigger(eventType: string, data?: any, element?: Element): void;
    }

    class FormUtility extends BaseUtility {
        init(): void;
        bindEvents(): void;
        handleSubmit(event: Event): void;
        validateField(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): boolean;
        showFieldError(field: Element, message: string): void;
        hideFieldError(field: Element): void;
        resetForm(form: HTMLFormElement): void;
    }

    class TableUtility extends BaseUtility {
        init(): void;
        bindEvents(): void;
        initDataTable(table: HTMLTableElement): any;
        exportTable(format: 'excel' | 'csv' | 'pdf', table: HTMLTableElement): void;
    }

    class NotificationUtility extends BaseUtility {
        init(): void;
        bindEvents(): void;
        showToast(options: NotificationOptions): void;
        showAlert(options: NotificationOptions & { 
            confirmText?: string; 
            cancelText?: string; 
            action?: string;
        }): void;
    }

    class PasswordUtility extends BaseUtility {
        init(): void;
        bindEvents(): void;
        checkStrength(password: string): {
            score: number;
            feedback: string[];
            class: string;
        };
        toggleVisibility(input: HTMLInputElement): void;
    }

    class MediaUtility extends BaseUtility {
        init(): void;
        bindEvents(): void;
        handleFileUpload(files: FileList, options: {
            maxSize?: string;
            allowedTypes?: string[];
            uploadUrl?: string;
            preview?: boolean;
        }): void;
    }

    // Main KingsLibrary interface
    interface KingsLibraryStatic {
        version: string;
        
        init(config?: Config): void;
        config(options: Config): void;
        
        registerUtility(name: string, utilityClass: typeof BaseUtility): void;
        getUtility(name: string): BaseUtility;
        getLoadedUtilities(): string[];
        
        initElement(element: Element): void;
        reinit(selector?: string): void;
        
        isInitialized(): boolean;
        trigger(eventType: string, data?: any, element?: Element): void;
        
        // Utility instances
        form: FormUtility;
        table: TableUtility;
        notification: NotificationUtility;
        password: PasswordUtility;
        media: MediaUtility;
        
        // Legacy function support
        Toastz(type: string, title: string, message: string): void;
        ExportToExcel(tableId: string, filename?: string): void;
        insert_data(url: string, formId: string): void;
        checknewpass(pass1Id: string, pass2Id: string, messageId: string): void;
    }
}

declare const KingsLibrary: KingsLibrary.KingsLibraryStatic;

// UMD module support
declare module 'kingslibrary' {
    export = KingsLibrary;
}

// Global declaration when loaded via script tag
declare global {
    interface Window {
        KingsLibrary: KingsLibrary.KingsLibraryStatic;
        KL: KingsLibrary.KingsLibraryStatic;
    }
}

export = KingsLibrary;
export as namespace KingsLibrary;