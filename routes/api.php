<?php

use App\Http\Controllers\API\AlbumsController;
use App\Http\Controllers\API\PhotosController;
use App\Http\Controllers\API\TokensController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::name('api.')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        })->name('user');

        Route::resource('albums', AlbumsController::class)
            ->except(['create', 'edit']);

        Route::resource('photos', PhotosController::class)
            ->only(['index']);
    });

    Route::post('/tokens/create', [TokensController::class, 'create'])->name('tokens.create');

    // fallback route for any methods
    Route::any('{any}', fn () => response('', 404))
        ->where('any', '.*')
        ->name('404');
});
