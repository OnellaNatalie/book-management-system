<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\AdminController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware(['auth:api'])->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);

});
Route::middleware(['auth:api', 'role:admin'])->group(function () {
    Route::get('/admin/authors', [AdminController::class, 'listAuthors']);
    Route::patch('/admin/authors/status/{id}', [AdminController::class, 'updateAuthorStatus']);
    Route::get('/admin/list-books', [AdminController::class, 'listBooks']);
    Route::get('/admin/authors/books/{authorId}', [AdminController::class, 'listBooksByAuthor']);
});

Route::middleware(['auth:api', 'role:author'])->group(function () {
    Route::get('/author/list-books', [AuthorController::class, 'listBooks']);
    Route::post('/author/add-book', [AuthorController::class, 'addBook']);   
    
});