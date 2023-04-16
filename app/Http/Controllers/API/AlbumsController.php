<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAlbumRequest;
use App\Http\Requests\StorePhotoRequest;
use App\Http\Requests\UpdateAlbumRequest;
use App\Http\Resources\AlbumResource;
use App\Http\Resources\PhotoResource;
use App\Models\Album;
use App\Models\Photo;
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

        return response()->noContent(Response::HTTP_CREATED);
    }

    public function destroy(Request $request, Album $album)
    {
        $this->authorize('delete', $album);

        $album->delete();
    }

    public function photos(Request $request, Album $album)
    {
        $this->authorize('viewPhotos', $album);

        $albums = $album
            ->photos()
            ->orderBy('created_at', 'DESC')
            ->orderBy('id', 'DESC')
            ->paginate(4);

        return PhotoResource::collection($albums);
    }

    public function addPhoto(StorePhotoRequest $request, Album $album)
    {
        $data = $request->validated();

        Photo::create(array_merge($data, ['album_id' => $album->id]));

        return response()->noContent(Response::HTTP_CREATED);
    }
}
