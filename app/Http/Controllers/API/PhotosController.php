<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePhotoRequest;
use App\Http\Requests\UpdatePhotoRequest;
use App\Http\Resources\PhotoResource;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PhotosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Photo::class);

        $photos = $request
            ->user()
            ->getLatestPhotosPaginated(4, $request->get('album_id'))
            ->appends(request()->query());

        return PhotoResource::collection($photos);
    }

    public function show(Request $request, Photo $photo)
    {
        $this->authorize('view', $photo);

        return new PhotoResource($photo);
    }

    public function update(UpdatePhotoRequest $request, Photo $photo)
    {
        $data = $request->validated();

        $photo->update($data);
    }
}
