<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DocumentationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Home page - redirect to documentation
Route::get('/', function () {
    return redirect('/docs');
});

// Documentation routes
Route::prefix('docs')->group(function () {
    Route::get('/', [DocumentationController::class, 'index'])->name('docs.index');
    Route::get('/playground', [DocumentationController::class, 'playground'])->name('docs.playground');
    Route::get('/snippets', [DocumentationController::class, 'snippets'])->name('docs.snippets');
});