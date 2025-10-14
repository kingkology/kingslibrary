<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class DemoController extends Controller
{
    public function contact(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:1000'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        // Simulate processing
        sleep(1);
        
        return response()->json([
            'success' => true,
            'message' => 'Thank you! Your message has been sent successfully.',
            'data' => $request->only(['name', 'email'])
        ]);
    }
    
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Registration failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Account created successfully! Please check your email for verification.',
            'redirect' => '/welcome'
        ]);
    }
    
    public function uploadImage(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:3072'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid image file',
                'errors' => $validator->errors()
            ], 422);
        }
        
        $path = $request->file('image')->store('uploads', 'public');
        
        return response()->json([
            'success' => true,
            'message' => 'Image uploaded successfully',
            'url' => asset('storage/' . $path)
        ]);
    }
    
    public function tableData(): JsonResponse
    {
        // Sample data for DataTables demonstration
        $users = collect([
            ['id' => 1, 'name' => 'John Doe', 'email' => 'john@example.com', 'role' => 'Admin', 'created_at' => '2024-01-15'],
            ['id' => 2, 'name' => 'Jane Smith', 'email' => 'jane@example.com', 'role' => 'User', 'created_at' => '2024-01-16'],
            ['id' => 3, 'name' => 'Bob Johnson', 'email' => 'bob@example.com', 'role' => 'User', 'created_at' => '2024-01-17'],
            ['id' => 4, 'name' => 'Alice Brown', 'email' => 'alice@example.com', 'role' => 'Editor', 'created_at' => '2024-01-18'],
            ['id' => 5, 'name' => 'Charlie Davis', 'email' => 'charlie@example.com', 'role' => 'User', 'created_at' => '2024-01-19']
        ]);
        
        return response()->json([
            'data' => $users->toArray(),
            'recordsTotal' => $users->count(),
            'recordsFiltered' => $users->count()
        ]);
    }
}