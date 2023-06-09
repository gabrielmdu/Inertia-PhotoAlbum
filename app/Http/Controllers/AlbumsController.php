<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAlbumRequest;
use App\Http\Requests\StorePhotoRequest;
use App\Http\Requests\UpdateAlbumRequest;
use App\Http\Resources\AlbumResource;
use App\Models\Album;
use App\Models\Photo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlbumsController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Album::class);

        $albums = $request
            ->user()
            ->getLatestAlbumsPaginated(9, $request->only('search'));

        return Inertia::render('Albums/Index', [
            'filters' => $request->all('search'),
            'albums' => AlbumResource::collection($albums)
        ]);
    }

    public function show(Request $request, Album $album)
    {
        $this->authorize('view', $album);

        return Inertia::render('Albums/Show', [
            'album' => new AlbumResource($album->loadCount('photos'))
        ]);
    }

    public function create(Request $request)
    {
        $this->authorize('create', Album::class);

        return Inertia::render('Albums/Create');
    }

    public function store(StoreAlbumRequest $request)
    {
        $data = $request->validated();

        $user = $request->user();

        $album = new Album($data);
        $album->user_id = $user->id;
        $album->save();

        return redirect(route('albums.show', ['album' => $album]))->with('success', 'Album created');
    }

    public function edit(Request $request, Album $album)
    {
        $this->authorize('update', $album);

        return Inertia::render('Albums/Edit', [
            'album' => new AlbumResource($album)
        ]);
    }

    public function update(UpdateAlbumRequest $request, Album $album)
    {
        $data = $request->validated();

        $album->update($data);

        return redirect(route('albums.show', ['album' => $album]))->with('success', 'Album updated');
    }

    public function destroy(Request $request, Album $album)
    {
        $this->authorize('delete', $album);

        $album->delete();

        return redirect(route('albums.index'))->with('success', 'Album deleted');
    }

    public function createPhoto(Request $request, Album $album)
    {
        $this->authorize('createPhoto', $album);

        return Inertia::render('Photos/Create', [
            'album' => new AlbumResource($album)
        ]);
    }

    public function addPhoto(StorePhotoRequest $request, Album $album)
    {
        $data = $request->validated();

        Photo::create(array_merge($data, ['album_id' => $album->id]));

        return redirect(route('albums.show', ['album' => $album]))->with('success', 'Photo added');
    }
}
