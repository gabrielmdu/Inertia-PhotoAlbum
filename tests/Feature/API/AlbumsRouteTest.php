<?php

namespace Tests\Feature\API;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AlbumsRouteTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    public function setup(): void
    {
        parent::setUp();

        $this->user = User::factory()
            ->hasAlbums(35)
            ->create();
    }

    public function test_can_list_albums()
    {
        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.albums.index'));

        $response->assertOk();
        $response->assertJsonCount(20, 'data');
    }
}
