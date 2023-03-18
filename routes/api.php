<?php

use App\Http\Controllers\API\AlbumsController;
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
        });

        Route::get('/albums', [AlbumsController::class, 'index'])->name('albums.index');
        Route::put('/albums/{album}', [AlbumsController::class, 'update'])->name('albums.update');
    });

    Route::post('/tokens/create', [TokensController::class, 'create'])->name('tokens.create');
});
