<?php

use App\Http\Controllers\API\AlbumPhotosController;
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

        // ----- albums

        Route::apiResource('albums', AlbumsController::class);
        Route::get('albums/{album}/photos', [AlbumsController::class, 'photos'])->name('albums.photos.index');
        Route::post('albums/{album}/photos', [AlbumsController::class, 'addPhoto'])->name('albums.photos.store');

        // ----- photos

        Route::apiResource('photos', PhotosController::class)
            ->except(['store']);
    });

    Route::post('/tokens', [TokensController::class, 'store'])->name('tokens.store');

    // fallback route for any methods
    Route::any('{any}', fn () => response('', 404))
        ->where('any', '.*')
        ->name('404');
});
