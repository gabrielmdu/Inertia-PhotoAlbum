<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePhotoRequest;
use App\Http\Resources\AlbumResource;
use App\Models\Album;
use App\Models\Photo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PhotosController extends Controller
{
    public function create(Request $request, Album $album)
    {
        $this->authorize('create', Photo::class);

        return Inertia::render('Photos/Create', ['album' => new AlbumResource($album)]);
    }

    public function store(StorePhotoRequest $request, Album $album)
    {
        $data = $request->validated();

        Photo::create($data);

        return redirect(route('albums.show', ['album' => $album]))->with('success', 'Photo added');
    }
}
