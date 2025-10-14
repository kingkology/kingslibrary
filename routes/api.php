<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DemoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('api')->group(function () {
    // Demo endpoints for KingsLibrary examples
    Route::post('/demo/contact', [DemoController::class, 'contact']);
    Route::post('/demo/upload', [DemoController::class, 'uploadImage']);
    Route::post('/contact', [DemoController::class, 'contact']);
    Route::post('/register', [DemoController::class, 'register']);
    Route::post('/upload-image', [DemoController::class, 'uploadImage']);
    Route::get('/table-data', [DemoController::class, 'tableData']);
    
    // Legacy compatibility endpoints
    Route::post('/add-user', [DemoController::class, 'register']);
    Route::any('/users/create', [DemoController::class, 'register']);
});