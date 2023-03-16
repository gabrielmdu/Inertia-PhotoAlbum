<?php

namespace Tests\Feature\API;

use App\Models\Album;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AlbumsRouteTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    public function setup(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

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
}
