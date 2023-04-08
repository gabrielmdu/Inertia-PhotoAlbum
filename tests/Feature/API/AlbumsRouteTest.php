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

    public function test_can_view_own_album()
    {
        $album = Album::factory()->createQuietly(['user_id' => $this->user->id]);

        $this->user->albums()->save($album);

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.albums.show', ['album' => $album->id]));

        $response->assertOk();

        /** @var array */
        $modelData = $album->only(['id', 'name', 'description', 'cover_id']);

        $response->assertJsonFragment($modelData);
    }

    public function test_cant_view_not_owned_album()
    {
        $user = User::factory()->create();
        $album = Album::factory()->createQuietly(['user_id' => $user->id]);

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.albums.show', ['album' => $album->id]));

        $response->assertForbidden();
    }

    public function test_can_list_albums()
    {
        $this->user->albums()->saveMany(
            Album::factory(35)->createQuietly(['user_id' => $this->user->id])
        );

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.albums.index'));

        $response->assertOk();
        $response->assertJsonCount(20, 'data');
    }

    public function test_can_paginate_albums()
    {
        $this->user->albums()->saveMany(
            Album::factory(35)->createQuietly(['user_id' => $this->user->id])
        );

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.albums.index', ['page' => 2]));

        $response->assertOk();
        $response->assertJsonCount(15, 'data');
    }

    public function test_can_filter_albums_by_text()
    {
        $this->user->albums()->saveMany(
            Album::factory()
                ->count(20)
                ->sequence(
                    ['name' => 'ABC', 'description' => 'GHI'],
                    ['name' => 'DEF', 'description' => 'JKL'],
                )
                ->createQuietly(['user_id' => $this->user->id])
        );

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.albums.index', ['search' => 'abc']));
        $response->assertJsonCount(10, 'data');

        $response = $this->get(route('api.albums.index', ['search' => 'bcde']));
        $response->assertJsonCount(0, 'data');
    }

    public function test_can_create_album()
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

    public function test_can_update_album()
    {
        $album = Album::factory()->createQuietly(['user_id' => $this->user->id]);

        $this->user->albums()->save($album);

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

    public function test_can_delete_album()
    {
        $album = Album::factory()->createQuietly(['user_id' => $this->user->id]);

        Sanctum::actingAs($this->user);

        $response = $this->delete(route('api.albums.destroy', ['album' => $album->id]));

        $response->assertOk();

        $this->assertSoftDeleted($album);
    }

    public function test_cant_delete_not_owned_album()
    {
        $newUser = User::factory()->create();
        $album = Album::factory()->createQuietly(['user_id' => $newUser->id]);

        Sanctum::actingAs($this->user);

        $response = $this->deleteJson(route('api.albums.destroy', ['album' => $album->id]));

        $response->assertForbidden();
    }
}
