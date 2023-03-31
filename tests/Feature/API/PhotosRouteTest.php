<?php

namespace Tests\Feature\API;

use App\Models\Album;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\HasUserTrait;
use Tests\TestCase;

class PhotosRouteTest extends TestCase
{
    use RefreshDatabase;
    use HasUserTrait;

    public function test_can_list_photos()
    {
        $album = Album::factory()
            ->hasPhotos(4)
            ->create(['user_id' => $this->user->id]);

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.photos.index', ['album_id' => $album->id]));

        $response->assertOk();
        $response->assertJsonStructure(['data', 'meta', 'links']);
        $response->assertJsonCount(4, 'data');

        $data = $response->json('data');
        $this->assertDatabaseHas('photos', $data[0]);
    }
}
