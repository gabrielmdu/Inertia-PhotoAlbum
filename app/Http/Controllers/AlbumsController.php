<?php

namespace App\Http\Controllers;

use App\Http\Resources\AlbumResource;
use App\Models\Album;
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

    public function edit(Request $request, Album $album)
    {
        $this->authorize('update', $album);

        return Inertia::render('Albums/Edit', [
            'album' => new AlbumResource($album)
        ]);
    }
}
