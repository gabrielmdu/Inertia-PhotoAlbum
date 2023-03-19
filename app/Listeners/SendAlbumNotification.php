<?php

namespace App\Listeners;

use App\Events\AlbumUpdated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendAlbumNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(AlbumUpdated $event): void
    {
        Log::write('info', 'album updated: ' . $event->album->id);
    }
}
