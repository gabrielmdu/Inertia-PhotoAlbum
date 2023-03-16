<?php

namespace Tests\Feature\API;

use App\Models\Album;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
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
}
