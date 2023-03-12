<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\AlbumResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AlbumsController extends Controller
{
    public function index(Request $request)
    {
        $albums = $request
            ->user()
            ->getLatestAlbumsPaginated(20);

        return AlbumResource::collection($albums);
    }
}
