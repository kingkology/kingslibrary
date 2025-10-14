<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DocumentationController extends Controller
{
    public function index()
    {
        return view('documentation.index');
    }
    
    public function playground()
    {
        return view('documentation.playground');
    }
    
    public function snippets()
    {
        return view('documentation.snippets');
    }
    
    /**
     * Handle AJAX code execution for playground
     */
    public function runCode(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'language' => 'required|string|in:javascript,html,css,php'
        ]);
        
        // For security reasons, we won't actually execute the code server-side
        // This would typically return sanitized results or use a sandboxed environment
        return response()->json([
            'success' => true,
            'output' => 'Code execution simulated successfully!',
            'language' => $request->language,
            'timestamp' => now()->toISOString()
        ]);
    }
    
    /**
     * Get code examples for playground
     */
    public function getExamples($type)
    {
        $examples = [
            'datatable' => [
                [
                    'title' => 'Basic DataTable',
                    'code' => '<table class="table datatable-init">\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Email</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>John Doe</td>\n      <td>john@example.com</td>\n    </tr>\n  </tbody>\n</table>',
                    'language' => 'html'
                ],
                [
                    'title' => 'DataTable with Export',
                    'code' => '<table class="table datatable-init" data-export-buttons="true">\n  <!-- table content -->\n</table>',
                    'language' => 'html'
                ]
            ],
            'forms' => [
                [
                    'title' => 'Form Validation',
                    'code' => '<form class="needs-validation" novalidate>\n  <div class="mb-3">\n    <input type="email" class="form-control" required>\n    <div class="invalid-feedback">Please enter a valid email.</div>\n  </div>\n</form>',
                    'language' => 'html'
                ]
            ],
            'notifications' => [
                [
                    'title' => 'Show Success Notification',
                    'code' => 'KL.notification.show({\n  type: "success",\n  title: "Success!",\n  message: "Operation completed successfully."\n});',
                    'language' => 'javascript'
                ]
            ]
        ];
        
        return response()->json($examples[$type] ?? []);
    }
}