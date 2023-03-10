<?php

namespace App\Http\Controllers;

use App\Http\Resources\AlbumResource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlbumsController extends Controller
{
    public function index(Request $request)
    {
        $albums = $request
            ->user()
            ->getLatestAlbumsPaginated();

        return Inertia::render('Albums/Index', [
            'albums' => AlbumResource::collection($albums)
        ]);
    }
}
