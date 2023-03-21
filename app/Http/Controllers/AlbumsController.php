<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAlbumRequest;
use App\Http\Requests\UpdateAlbumRequest;
use App\Http\Resources\AlbumResource;
use App\Models\Album;
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

    public function create(Request $request)
    {
        $this->authorize('create', Album::class);

        return Inertia::render('Albums/Create');
    }

    public function store(StoreAlbumRequest $request)
    {
        $data = $request->validated();

        $user = $request->user();

        $user->albums()->create(array_merge(['user_id' => $user->id], $data));

        return redirect(route('albums.index'))->with('success', 'Album created');
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

        return redirect(route('albums.index'))->with('success', 'Album updated');
    }
}
