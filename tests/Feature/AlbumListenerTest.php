<?php

namespace Tests\Feature;

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
        $listener->handle(new AlbumUpdated($album));
    }
}
