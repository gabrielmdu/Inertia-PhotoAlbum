<?php

namespace App\Listeners;

use App\Events\AlbumUpdated;
use App\Events\AlbumStored;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Events\Dispatcher;
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
    public function handleAlbumUpdated(AlbumUpdated $event): void
    {
        Log::write('info', 'album updated: ' . $event->album->id);
    }

    public function handleAlbumStored(AlbumStored $event): void
    {
        Log::write('info', 'album stored: ' . $event->album->id);
    }

    /**
     * Register the listeners for the subscriber.
     */
    public function subscribe(Dispatcher $events): array
    {
        return [
            AlbumUpdated::class => 'handleAlbumUpdated',
            AlbumStored::class => 'handleAlbumStored',
        ];
    }
}
