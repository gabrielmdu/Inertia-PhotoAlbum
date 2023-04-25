<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $albums = $request
            ->user()
            ->latestUpdatedAlbums(5)
            ->get();

        $photos = $request
            ->user()
            ->latestPhotos(5)
            ->get();

        return Inertia::render('Dashboard', compact('albums', 'photos'));
    }
}
