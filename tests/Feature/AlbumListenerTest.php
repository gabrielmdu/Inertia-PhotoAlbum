<?php

namespace Tests\Feature;

use App\Events\AlbumStored;
use App\Events\AlbumUpdated;
use App\Listeners\SendAlbumNotification;
use App\Models\Album;
use Illuminate\Support\Facades\Log;
use Mockery;
use Tests\TestCase;

class AlbumListenerTest extends TestCase
{
    public function test_send_album_updated_notification_listener()
    {
        Log::shouldReceive('write')
            ->once()
            ->with('info', 'album updated: ' . 100);

        $album = Mockery::mock(Album::class)->makePartial();
        $album->id = 100;

        $listener = new SendAlbumNotification();
        $listener->handleAlbumUpdated(new AlbumUpdated($album));
    }

    public function test_send_album_stored_notification_listener()
    {
        Log::shouldReceive('write')
            ->once()
            ->with('info', 'album stored: ' . 200);

        $album = Mockery::mock(Album::class)->makePartial();
        $album->id = 200;

        $listener = new SendAlbumNotification();
        $listener->handleAlbumStored(new AlbumStored($album));
    }
}
