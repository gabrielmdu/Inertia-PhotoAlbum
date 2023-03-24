<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAlbumRequest;
use App\Http\Requests\UpdateAlbumRequest;
use App\Http\Resources\AlbumResource;
use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AlbumsController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Album::class);

        $albums = $request
            ->user()
            ->getLatestAlbumsPaginated(20, $request->only('search'));

        return AlbumResource::collection($albums);
    }

    public function show(Request $request, Album $album)
    {
        $this->authorize('view', $album);

        return new AlbumResource($album);
    }

    public function update(UpdateAlbumRequest $request, Album $album)
    {
        $data = $request->validated();

        $album->update($data);
    }

    public function store(StoreAlbumRequest $request)
    {
        $data = $request->validated();
        
        $user = $request->user();

        $user->albums()->create(array_merge(['user_id' => $user->id], $data));
    }

    public function destroy(Request $request, Album $album)
    {
        $this->authorize('delete', $album);

        $album->delete();
    }
}
