<?php

namespace Tests\Feature\API;

use App\Events\AlbumUpdated;
use App\Models\Album;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\HasUserTrait;
use Tests\TestCase;

class AlbumsRouteTest extends TestCase
{
    use RefreshDatabase;
    use HasUserTrait;

    public function test_can_list_albums()
    {
        $this->user->albums()->saveMany(
            Album::factory(35)->create(['user_id' => $this->user->id])
        );

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.albums.index'));

        $response->assertOk();
        $response->assertJsonCount(20, 'data');
    }

    public function test_can_paginate_albums()
    {
        $this->user->albums()->saveMany(
            Album::factory(35)->create(['user_id' => $this->user->id])
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
                ->create(['user_id' => $this->user->id])
        );

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.albums.index', ['search' => 'abc']));
        $response->assertJsonCount(10, 'data');

        $response = $this->get(route('api.albums.index', ['search' => 'bcde']));
        $response->assertJsonCount(0, 'data');
    }

    public function test_can_update_album()
    {
        $album = Album::factory()->create(['user_id' => $this->user->id]);

        $this->user->albums()->save($album);

        Sanctum::actingAs($this->user);

        $newName = 'This is the new name';
        $newDescription = 'This is the new description.';
        $newCoverId = 5;

        Event::fake();

        $response = $this->json('PUT', route('api.albums.update', ['album' => $album->id]), [
            'name' => $newName,
            'description' => $newDescription,
            'cover_id' => $newCoverId, 
        ]);

        $response->assertStatus(Response::HTTP_OK);

        Event::assertDispatched(AlbumUpdated::class);

        $album->refresh();

        $this->assertEquals($newName, $album->name);
        $this->assertEquals($newDescription, $album->description);
        $this->assertEquals($newCoverId, $album->cover_id);
    }
}
