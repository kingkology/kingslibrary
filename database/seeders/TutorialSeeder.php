<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tutorial;
use App\Models\Snippet;

class TutorialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Getting Started tutorial
        $gettingStarted = Tutorial::create([
            'title' => 'Getting Started with KingsLibrary',
            'slug' => 'getting-started',
            'description' => 'Learn how to install and set up KingsLibrary in your projects',
            'content' => 'This tutorial covers the basic installation and setup of KingsLibrary, including CDN setup, NPM installation, and basic configuration.',
            'status' => 'published',
            'order' => 1,
            'category' => 'basics'
        ]);

        // Create snippets for Getting Started
        Snippet::create([
            'tutorial_id' => $gettingStarted->id,
            'title' => 'CDN Installation',
            'slug' => 'cdn-installation',
            'description' => 'Include KingsLibrary via CDN',
            'code' => '<!-- Include KingsLibrary CSS -->
<link rel="stylesheet" href="https://cdn.kingslibrary.com/v3/css/kingslibrary.min.css">

<!-- Include KingsLibrary JavaScript -->
<script src="https://cdn.kingslibrary.com/v3/js/kingslibrary.min.js"></script>

<!-- Initialize KingsLibrary -->
<script>
document.addEventListener("DOMContentLoaded", function() {
    KL.init();
});
</script>',
            'language' => 'html',
            'order' => 1
        ]);

        Snippet::create([
            'tutorial_id' => $gettingStarted->id,
            'title' => 'NPM Installation',
            'slug' => 'npm-installation',
            'description' => 'Install KingsLibrary via NPM',
            'code' => '# Install KingsLibrary
npm install kingslibrary

# Or with Yarn
yarn add kingslibrary',
            'language' => 'bash',
            'order' => 2
        ]);

        // Create DataTables tutorial
        $dataTables = Tutorial::create([
            'title' => 'Working with DataTables',
            'slug' => 'datatables',
            'description' => 'Learn how to use the enhanced DataTables functionality',
            'content' => 'KingsLibrary provides enhanced DataTables with export capabilities, custom configurations, and automatic initialization.',
            'status' => 'published',
            'order' => 2,
            'category' => 'components'
        ]);

        Snippet::create([
            'tutorial_id' => $dataTables->id,
            'title' => 'Basic DataTable',
            'slug' => 'basic-datatable',
            'description' => 'Create a basic DataTable with automatic initialization',
            'code' => '<table class="table table-striped datatable-init">
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>Engineering</td>
            <td><button class="btn btn-sm btn-primary">Edit</button></td>
        </tr>
    </tbody>
</table>',
            'language' => 'html',
            'order' => 1
        ]);

        Snippet::create([
            'tutorial_id' => $dataTables->id,
            'title' => 'DataTable with Custom Options',
            'slug' => 'custom-datatable',
            'description' => 'Configure DataTable with custom options',
            'code' => '<table class="table datatable-init" 
       data-page-length="25"
       data-searching="true"
       data-ordering="true"
       data-export-buttons="true">
    <!-- Table content -->
</table>',
            'language' => 'html',
            'order' => 2
        ]);

        // Create Forms tutorial
        $forms = Tutorial::create([
            'title' => 'Form Utilities and Validation',
            'slug' => 'forms',
            'description' => 'Learn about form handling, validation, and utilities',
            'content' => 'KingsLibrary provides comprehensive form utilities including validation, password strength checking, and AJAX form submission.',
            'status' => 'published',
            'order' => 3,
            'category' => 'forms'
        ]);

        Snippet::create([
            'tutorial_id' => $forms->id,
            'title' => 'Password Strength Validation',
            'slug' => 'password-validation',
            'description' => 'Add password strength validation to your forms',
            'code' => '<div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" 
           class="form-control password-strength" 
           id="password" 
           data-strength-meter="#password-strength"
           data-min-length="8">
    <div id="password-strength" class="password-strength-meter mt-2"></div>
</div>',
            'language' => 'html',
            'order' => 1
        ]);

        // Create Notifications tutorial
        $notifications = Tutorial::create([
            'title' => 'Notification System',
            'slug' => 'notifications',
            'description' => 'Display toast notifications and alerts',
            'content' => 'Learn how to use the KingsLibrary notification system for user feedback, alerts, and status messages.',
            'status' => 'published',
            'order' => 4,
            'category' => 'ui'
        ]);

        Snippet::create([
            'tutorial_id' => $notifications->id,
            'title' => 'Show Success Notification',
            'slug' => 'success-notification',
            'description' => 'Display a success notification',
            'code' => 'KL.notification.show({
    type: "success",
    title: "Success!",
    message: "Your changes have been saved successfully.",
    duration: 4000
});',
            'language' => 'javascript',
            'order' => 1
        ]);

        Snippet::create([
            'tutorial_id' => $notifications->id,
            'title' => 'Show Error Notification',
            'slug' => 'error-notification',
            'description' => 'Display an error notification',
            'code' => 'KL.notification.show({
    type: "error",
    title: "Error!",
    message: "Something went wrong. Please try again.",
    duration: 5000
});',
            'language' => 'javascript',
            'order' => 2
        ]);

        // Create Chat tutorial
        $chat = Tutorial::create([
            'title' => 'Chat System Implementation',
            'slug' => 'chat-system',
            'description' => 'Build real-time chat functionality',
            'content' => 'Implement real-time chat features using KingsLibrary chat utilities with AJAX support and message handling.',
            'status' => 'published',
            'order' => 5,
            'category' => 'advanced'
        ]);

        Snippet::create([
            'tutorial_id' => $chat->id,
            'title' => 'Chat Form Setup',
            'slug' => 'chat-form',
            'description' => 'Set up a basic chat form',
            'code' => '<div class="chat-messages" style="height: 300px; overflow-y: auto;">
    <!-- Messages will appear here -->
</div>

<form class="chat-send-form mt-3" 
      data-action-url="/chat/send" 
      data-chat-input=".chat-input" 
      data-chat-messages=".chat-messages">
    <div class="input-group">
        <textarea class="form-control chat-input" 
                  placeholder="Type your message..." 
                  rows="1"></textarea>
        <button type="submit" class="btn btn-primary">
            <i class="fas fa-paper-plane"></i>
        </button>
    </div>
</form>',
            'language' => 'html',
            'order' => 1
        ]);
    }
}
