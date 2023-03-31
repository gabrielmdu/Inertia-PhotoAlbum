<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PhotoResource;
use App\Models\Photo;
use Illuminate\Http\Request;

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
}
