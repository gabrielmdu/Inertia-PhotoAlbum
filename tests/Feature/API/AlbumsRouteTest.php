<?php

namespace Tests\Feature\API;

use App\Events\AlbumStored;
use App\Events\AlbumUpdated;
use App\Models\Album;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Laravel\Sanctum\Sanctum;
use Tests\HasUserTrait;
use Tests\TestCase;

class AlbumsRouteTest extends TestCase
{
    use RefreshDatabase;
    use HasUserTrait;

    protected function setUp(): void
    {
        parent::setUp();

        $this->setUpUser();

        Album::unsetEventDispatcher();
    }

    public function test_user_can_view_own_album()
    {
        $album = Album::factory()
            ->for($this->user)
            ->create();

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.albums.show', ['album' => $album->id]));

        $response->assertOk();

        /** @var array */
        $modelData = $album->only(['id', 'name', 'description', 'cover_id']);

        $response->assertJsonFragment($modelData);
    }

    public function test_user_cant_view_not_owned_album()
    {
        $otherUser = User::factory()->create();
        $album = Album::factory()
            ->for($otherUser)
            ->create();

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.albums.show', ['album' => $album->id]));

        $response->assertForbidden();
    }

    public function test_user_can_list_albums()
    {
        Album::factory(35)
            ->for($this->user)
            ->create();

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.albums.index'));

        $response->assertOk();
        $response->assertJsonCount(20, 'data');
    }

    public function test_user_can_paginate_albums()
    {
        Album::factory(35)
            ->for($this->user)
            ->create();

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.albums.index', ['page' => 2]));

        $response->assertOk();
        $response->assertJsonCount(15, 'data');
    }

    public function test_user_can_filter_albums_by_text()
    {
        Album::factory(20)
            ->for($this->user)
            ->sequence(
                ['name' => 'ABC', 'description' => 'GHI'],
                ['name' => 'DEF', 'description' => 'JKL'],
            )
            ->create();

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.albums.index', ['search' => 'abc']));
        $response->assertJsonCount(10, 'data');

        $response = $this->get(route('api.albums.index', ['search' => 'bcde']));
        $response->assertJsonCount(0, 'data');
    }

    public function test_user_can_create_album()
    {
        Sanctum::actingAs($this->user);

        $albumData = [
            'name' => 'ABC',
            'description' => 'this is my description',
            'cover_id' => 200,
        ];

        Event::fake([AlbumStored::class]);

        $response = $this->postJson(route('api.albums.store'), $albumData);

        Event::assertDispatched(AlbumStored::class);

        $response->assertCreated();

        $this->assertDatabaseHas('albums', $albumData);
    }

    public function test_user_can_update_album()
    {
        $album = Album::factory()
            ->for($this->user)
            ->create();

        Sanctum::actingAs($this->user);

        $albumData = [
            'name' => 'This is the new name',
            'description' => 'This is the new description.',
            'cover_id' => 5,
        ];

        Event::fake([AlbumUpdated::class]);

        $response = $this->putJson(route('api.albums.update', ['album' => $album->id]), $albumData);

        $response->assertOk();

        Event::assertDispatched(AlbumUpdated::class);

        $this->assertDatabaseHas('albums', $albumData);
    }

    public function test_user_can_delete_album()
    {
        $album = Album::factory()
            ->for($this->user)
            ->create();

        Sanctum::actingAs($this->user);

        $response = $this->delete(route('api.albums.destroy', ['album' => $album->id]));

        $response->assertOk();

        $this->assertSoftDeleted($album);
    }

    public function test_user_cant_delete_not_owned_album()
    {
        $otherUser = User::factory()->create();
        $album = Album::factory()
            ->for($otherUser)
            ->create();

        Sanctum::actingAs($this->user);

        $response = $this->deleteJson(route('api.albums.destroy', ['album' => $album->id]));

        $response->assertForbidden();
    }

    public function test_user_can_view_album_photos()
    {
        $album = Album::factory()
            ->for($this->user)
            ->hasPhotos(20)
            ->create();

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.albums.photos.index', ['album' => $album->id]));

        $response->assertOk();
        $response->assertJsonStructure(['data', 'meta', 'links']);
        $response->assertJsonCount(4, 'data');

        $data = $response->json('data');
        $this->assertDatabaseHas('photos', $data[0]);
    }

    public function test_user_can_store_photo_in_owned_album()
    {
        $album = Album::factory()
            ->for($this->user)
            ->create();

        Sanctum::actingAs($this->user);

        $photoData = [
            'caption' => 'This is the caption of the new photo',
            'api_id' => 200,
        ];

        $response = $this->postJson(route('api.albums.photos.store', ['album' => $album->id]), $photoData);

        $response->assertCreated();
    }

    public function test_user_cant_store_photo_in_not_owned_album()
    {
        $otherUser = User::factory()->create();
        $album = Album::factory()
            ->for($otherUser)
            ->create();

        Sanctum::actingAs($this->user);

        $photoData = [
            'caption' => 'This is the caption of the new photo',
            'api_id' => 200,
        ];

        $response = $this->postJson(route('api.albums.photos.store', ['album' => $album->id]), $photoData);

        $response->assertForbidden();
    }

    public function test_user_cant_store_photo_with_wrong_data()
    {
        $album = Album::factory()
            ->for($this->user)
            ->create();

        Sanctum::actingAs($this->user);

        $photoData = [
            'caption' => str_repeat('0123456789', 50) . '1',
            'api_id' => 1001,
        ];

        $response = $this->postJson(route('api.albums.photos.store', ['album' => $album->id]), $photoData);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors(['caption', 'api_id']);
    }
}
