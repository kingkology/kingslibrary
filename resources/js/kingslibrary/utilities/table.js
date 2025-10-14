/**
 * Table Utility - Handles DataTables initialization with configurable features
 * Supports CSS classes: .datatable-init, .export-excel, .export-pdf, .export-csv
 */

class TableUtility extends BaseUtility {
    constructor(kingsLibrary) {
        super(kingsLibrary);
        
        // Default DataTable configuration
        this.defaultConfig = {
            // Core features
            paging: true,
            pageLength: 10,
            searching: true,
            ordering: true,
            info: true,
            lengthChange: true,
            
            // Advanced features
            responsive: true,
            scrollX: false,
            scrollY: false,
            fixedHeader: false,
            fixedColumns: false,
            
            // UI options
            lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
            language: {
                search: "Search:",
                lengthMenu: "Show _MENU_ entries",
                info: "Showing _START_ to _END_ of _TOTAL_ entries",
                infoEmpty: "Showing 0 to 0 of 0 entries",
                infoFiltered: "(filtered from _MAX_ total entries)",
                zeroRecords: "No matching records found",
                emptyTable: "No data available in table",
                paginate: {
                    first: "First",
                    last: "Last",
                    next: "Next",
                    previous: "Previous"
                }
            },
            
            // Export buttons (requires DataTables Buttons extension)
            buttons: [
                {
                    extend: 'excelHtml5',
                    text: '<i class="fas fa-file-excel me-1"></i> Excel',
                    className: 'btn btn-success btn-sm me-1',
                    exportOptions: {
                        columns: ':visible:not(.no-export)'
                    }
                },
                {
                    extend: 'pdfHtml5',
                    text: '<i class="fas fa-file-pdf me-1"></i> PDF',
                    className: 'btn btn-danger btn-sm me-1',
                    exportOptions: {
                        columns: ':visible:not(.no-export)'
                    },
                    customize: function(doc) {
                        doc.defaultStyle.fontSize = 9;
                        doc.styles.tableHeader.fontSize = 10;
                        doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                    }
                },
                {
                    extend: 'csvHtml5',
                    text: '<i class="fas fa-file-csv me-1"></i> CSV',
                    className: 'btn btn-info btn-sm me-1',
                    exportOptions: {
                        columns: ':visible:not(.no-export)'
                    }
                },
                {
                    extend: 'print',
                    text: '<i class="fas fa-print me-1"></i> Print',
                    className: 'btn btn-secondary btn-sm',
                    exportOptions: {
                        columns: ':visible:not(.no-export)'
                    }
                }
            ],
            
            // Server-side processing
            serverSide: false,
            processing: false,
            ajax: null
        };
        
        this.initializedTables = new Map();
    }
    
    bindEvents() {
        // Initialize tables with datatable-init class
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeTables();
            });
        } else {
            // DOM is already ready, initialize immediately
            this.initializeTables();
        }
        
        // Watch for dynamically added tables
        this.bindAutoInit();
        
        // Handle export button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.export-excel') || e.target.closest('.export-excel')) {
                e.preventDefault();
                const button = e.target.closest('.export-excel') || e.target;
                this.exportToExcel(button);
            }
            
            if (e.target.matches('.export-pdf') || e.target.closest('.export-pdf')) {
                e.preventDefault();
                const button = e.target.closest('.export-pdf') || e.target;
                this.exportToPdf(button);
            }
            
            if (e.target.matches('.export-csv') || e.target.closest('.export-csv')) {
                e.preventDefault();
                const button = e.target.closest('.export-csv') || e.target;
                this.exportToCsv(button);
            }
        });
    }

    /**
     * Bind auto-initialization for new tables
     */
    bindAutoInit() {
        // Watch for dynamically added tables
        if (window.MutationObserver) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === 1) { // Element node
                                const element = node.querySelector ? node : null;
                                
                                if (element) {
                                    // Skip auto-init for manually managed containers
                                    const manualContainer = element.closest('[data-manual-init="true"]');
                                    if (manualContainer) {
                                        return; // Skip auto-initialization
                                    }
                                    
                                    // Check if the added node has datatable-init class
                                    if (element.classList && element.classList.contains('datatable-init') && 
                                        !element.classList.contains('dt-initialized')) {
                                        this.initializeTable(element);
                                    }
                                    
                                    // Check for datatable-init elements within the added node
                                    const tables = element.querySelectorAll('.datatable-init:not(.dt-initialized)');
                                    tables.forEach(table => {
                                        // Skip if in manually managed container
                                        if (!table.closest('[data-manual-init="true"]')) {
                                            this.initializeTable(table);
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    
    /**
     * Initialize all tables with .datatable-init class
     */
    initializeTables() {
        const tables = document.querySelectorAll('.datatable-init');
        tables.forEach(table => {
            // Skip tables in manually managed containers
            if (!table.closest('[data-manual-init="true"]')) {
                this.initializeTable(table);
            }
        });
    }
    
    /**
     * Initialize a specific table with DataTables
     * @param {HTMLTableElement} table - Table element
     */
    initializeTable(table) {
        if (this.initializedTables.has(table)) {
            return; // Already initialized
        }
        
        // Check if DataTables is available
        if (typeof $ === 'undefined' || !$.fn.DataTable) {
            console.warn('DataTables library not found. Please include it to use table utilities.');
            return;
        }

        // Check if table is already a DataTable
        if ($.fn.dataTable.isDataTable(table)) {
            console.log('Table already initialized as DataTable, skipping...');
            return;
        }
        
        try {
            const config = this.buildTableConfig(table);
            const dataTable = $(table).DataTable(config);
            
            this.initializedTables.set(table, dataTable);
            
            // Add export buttons if specified
            this.addExportButtons(table, dataTable);
            
            // Emit initialization event
            table.dispatchEvent(new CustomEvent('kingslibrary:table:initialized', {
                detail: { dataTable, config }
            }));
            
            this.kl.log(`DataTable initialized for table: ${table.id || 'unnamed'}`);
        } catch (error) {
            console.error('Failed to initialize DataTable:', error);
        }
    }
    
    /**
     * Build DataTable configuration from table data attributes
     * @param {HTMLTableElement} table - Table element
     * @returns {Object} DataTable configuration
     */
    buildTableConfig(table) {
        const config = { ...this.defaultConfig };
        const dataset = table.dataset;
        
        // Basic pagination settings
        if (dataset.paging !== undefined) {
            config.paging = dataset.paging === 'true';
        }
        if (dataset.pageLength !== undefined) {
            config.pageLength = parseInt(dataset.pageLength);
        }
        
        // Search and ordering
        if (dataset.searching !== undefined) {
            config.searching = dataset.searching === 'true';
        }
        if (dataset.ordering !== undefined) {
            config.ordering = dataset.ordering === 'true';
        }
        
        // Info and length change
        if (dataset.info !== undefined) {
            config.info = dataset.info === 'true';
        }
        if (dataset.lengthChange !== undefined) {
            config.lengthChange = dataset.lengthChange === 'true';
        }
        
        // Responsive and scrolling
        if (dataset.responsive !== undefined) {
            config.responsive = dataset.responsive === 'true';
        }
        if (dataset.scrollX !== undefined) {
            config.scrollX = dataset.scrollX === 'true' ? true : dataset.scrollX;
        }
        if (dataset.scrollY !== undefined) {
            config.scrollY = dataset.scrollY === 'true' ? true : dataset.scrollY;
        }
        
        // Fixed header and columns
        if (dataset.fixedHeader !== undefined) {
            config.fixedHeader = dataset.fixedHeader === 'true';
        }
        if (dataset.fixedColumns !== undefined) {
            const fixedCols = dataset.fixedColumns;
            if (fixedCols === 'true') {
                config.fixedColumns = true;
            } else if (!isNaN(fixedCols)) {
                config.fixedColumns = { leftColumns: parseInt(fixedCols) };
            }
        }
        
        // Length menu customization
        if (dataset.lengthMenu !== undefined) {
            try {
                const lengths = JSON.parse(dataset.lengthMenu);
                config.lengthMenu = lengths;
            } catch (e) {
                console.warn('Invalid lengthMenu format, using default');
            }
        }
        
        // Server-side processing
        if (dataset.serverSide !== undefined) {
            config.serverSide = dataset.serverSide === 'true';
            config.processing = true; // Enable processing indicator
        }
        if (dataset.ajaxUrl !== undefined) {
            config.ajax = {
                url: dataset.ajaxUrl,
                type: dataset.ajaxMethod || 'POST',
                data: function(d) {
                    // Add CSRF token for Laravel
                    if (window.KL && window.KL.config.csrfToken) {
                        d._token = window.KL.config.csrfToken;
                    }
                    return d;
                }
            };
        }
        
        // Column definitions
        if (dataset.columnDefs !== undefined) {
            try {
                config.columnDefs = JSON.parse(dataset.columnDefs);
            } catch (e) {
                console.warn('Invalid columnDefs format, ignoring');
            }
        }
        
        // Order (default sorting)
        if (dataset.order !== undefined) {
            try {
                config.order = JSON.parse(dataset.order);
            } catch (e) {
                console.warn('Invalid order format, using default');
            }
        }
        
        // Export buttons
        const exportTypes = [];
        if (dataset.exportExcel === 'true') exportTypes.push('excel');
        if (dataset.exportPdf === 'true') exportTypes.push('pdf');
        if (dataset.exportCsv === 'true') exportTypes.push('csv');
        if (dataset.exportPrint === 'true') exportTypes.push('print');
        
        if (exportTypes.length > 0) {
            config.dom = 'Bfrtip'; // Add buttons to DOM
            config.buttons = exportTypes.map(type => ({
                extend: type,
                className: 'btn btn-sm btn-outline-primary me-1'
            }));
        }
        
        return config;
    }
    
    /**
     * Add export buttons for tables without DataTables Buttons extension
     * @param {HTMLTableElement} table - Table element
     * @param {Object} dataTable - DataTable instance
     */
    addExportButtons(table, dataTable) {
        const exportContainer = table.parentNode.querySelector('.table-export-buttons');
        if (!exportContainer) return;
        
        // Excel export
        if (table.dataset.exportExcel === 'true') {
            const excelBtn = document.createElement('button');
            excelBtn.className = 'btn btn-sm btn-success export-excel me-1';
            excelBtn.innerHTML = '<i class="fa fa-file-excel-o"></i> Excel';
            excelBtn.dataset.table = `#${table.id}`;
            exportContainer.appendChild(excelBtn);
        }
        
        // CSV export
        if (table.dataset.exportCsv === 'true') {
            const csvBtn = document.createElement('button');
            csvBtn.className = 'btn btn-sm btn-info export-csv me-1';
            csvBtn.innerHTML = '<i class="fa fa-file-text-o"></i> CSV';
            csvBtn.dataset.table = `#${table.id}`;
            exportContainer.appendChild(csvBtn);
        }
        
        // PDF export
        if (table.dataset.exportPdf === 'true') {
            const pdfBtn = document.createElement('button');
            pdfBtn.className = 'btn btn-sm btn-danger export-pdf me-1';
            pdfBtn.innerHTML = '<i class="fa fa-file-pdf-o"></i> PDF';
            pdfBtn.dataset.table = `#${table.id}`;
            exportContainer.appendChild(pdfBtn);
        }
    }
    
    /**
     * Export table to Excel
     * @param {HTMLElement} button - Export button
     */
    exportToExcel(button) {
        const tableSelector = button.dataset.table;
        const table = tableSelector ? document.querySelector(tableSelector) : 
                     button.closest('.table-container')?.querySelector('table') ||
                     button.parentNode.querySelector('table');
        
        if (!table) {
            console.error('Table not found for Excel export');
            return;
        }
        
        this.exportTableData(table, 'excel');
    }
    
    /**
     * Export table to CSV
     * @param {HTMLElement} button - Export button
     */
    exportToCsv(button) {
        const tableSelector = button.dataset.table;
        const table = tableSelector ? document.querySelector(tableSelector) : 
                     button.closest('.table-container')?.querySelector('table') ||
                     button.parentNode.querySelector('table');
        
        if (!table) {
            console.error('Table not found for CSV export');
            return;
        }
        
        this.exportTableData(table, 'csv');
    }
    
    /**
     * Export table to PDF
     * @param {HTMLElement} button - Export button
     */
    exportToPdf(button) {
        const tableSelector = button.dataset.table;
        const table = tableSelector ? document.querySelector(tableSelector) : 
                     button.closest('.table-container')?.querySelector('table') ||
                     button.parentNode.querySelector('table');
        
        if (!table) {
            console.error('Table not found for PDF export');
            return;
        }
        
        this.exportTableData(table, 'pdf');
    }
    
    /**
     * Export table data in specified format
     * @param {HTMLTableElement} table - Table element
     * @param {string} format - Export format (excel, csv, pdf)
     */
    exportTableData(table, format) {
        const dataTable = this.initializedTables.get(table);
        
        if (dataTable && dataTable.buttons) {
            // Use DataTables Buttons if available
            dataTable.button(`.buttons-${format}`).trigger();
        } else {
            // Fallback to basic export
            this.basicExport(table, format);
        }
    }
    
    /**
     * Basic export functionality (fallback)
     * @param {HTMLTableElement} table - Table element
     * @param {string} format - Export format
     */
    basicExport(table, format) {
        const filename = table.dataset.exportFilename || 'table-export';
        
        switch (format) {
            case 'csv':
                this.exportToCsvBasic(table, filename);
                break;
            case 'excel':
                // For Excel, fall back to CSV
                this.exportToCsvBasic(table, filename);
                break;
            default:
                console.warn(`Basic export for format '${format}' not implemented`);
        }
    }
    
    /**
     * Basic CSV export
     * @param {HTMLTableElement} table - Table element
     * @param {string} filename - File name
     */
    exportToCsvBasic(table, filename) {
        const rows = Array.from(table.querySelectorAll('tr'));
        const csvContent = rows.map(row => {
            const cells = Array.from(row.querySelectorAll('th, td'));
            return cells.map(cell => {
                let text = cell.textContent.trim();
                // Escape quotes and wrap in quotes if necessary
                if (text.includes(',') || text.includes('"') || text.includes('\n')) {
                    text = `"${text.replace(/"/g, '""')}"`;
                }
                return text;
            }).join(',');
        }).join('\n');
        
        // Download file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }
    
    /**
     * Get DataTable instance for a table
     * @param {HTMLTableElement} table - Table element
     * @returns {Object|null} DataTable instance
     */
    getDataTable(table) {
        return this.initializedTables.get(table) || null;
    }
    
    /**
     * Destroy and reinitialize a table
     * @param {HTMLTableElement} table - Table element
     */
    reinitializeTable(table) {
        const dataTable = this.initializedTables.get(table);
        if (dataTable) {
            dataTable.destroy();
            this.initializedTables.delete(table);
        }
        this.initializeTable(table);
    }
    
    /**
     * Initialize utility for dynamically added elements
     * @param {HTMLElement} element - Element to initialize
     */
    initializeElement(element) {
        // Initialize tables within the element
        const tables = element.matches('.datatable-init') ? 
                      [element] : 
                      element.querySelectorAll('.datatable-init');
        
        tables.forEach(table => {
            if (!table.dataset.initialized) {
                table.dataset.initialized = 'true';
                this.initializeTable(table);
            }
        });
    }
    
    /**
     * Legacy support for ExportToExcel function
     * @param {string} tableId - Table ID or selector
     */
    exportToExcelLegacy(tableId) {
        const table = document.querySelector(tableId.startsWith('#') ? tableId : `#${tableId}`);
        if (table) {
            this.exportTableData(table, 'excel');
        } else {
            console.error(`Table with selector '${tableId}' not found`);
        }
    }
}

// Legacy function support
if (typeof window !== 'undefined') {
    window.ExportToExcel = function(tableId) {
        if (window.KL && window.KL.getUtility) {
            const tableUtility = window.KL.getUtility('table');
            if (tableUtility && tableUtility.exportToExcelLegacy) {
                return tableUtility.exportToExcelLegacy(tableId);
            }
        }
        console.warn('TableUtility not available');
    };
}

// Auto-register with KingsLibrary if available
if (typeof window !== 'undefined' && window.KL) {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof TableUtility !== 'undefined') {
            window.KL.registerUtility('table', TableUtility);
        }
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TableUtility;
}

// Global exposure
window.TableUtility = TableUtility;