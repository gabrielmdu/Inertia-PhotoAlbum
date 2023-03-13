<?php

namespace Tests\Feature;

use App\Models\Album;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class AlbumsRouteTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function test_user_can_see_albums(): void
    {
        $this->user->albums()->saveMany(
            Album::factory(3)->create(['user_id' => $this->user->id])
        );

        $response = $this
            ->actingAs($this->user)
            ->get(route('albums.index'));

        $response->assertInertia(
            fn (AssertableInertia $page) => $page
                ->component('Albums/Index')
                ->has('albums', 3)
        );
    }

    public function user_can_view_own_album_edit_page()
    {
        $album = $this->user->albums()->create([
            'name' => 'My Album 1',
            'description' => fake()->text(),
            'cover_id' => 123,
        ]);

        $response = $this->actingAs($this->user)
            ->get(route('albums.edit', ['album' => $album->id]));

        $response->assertInertia(
            fn (AssertableInertia $page) => $page
                ->component('Albums/Edit')
                ->has(
                    'album',
                    fn (AssertableInertia $a) => $a
                        ->where('id', $album->id)
                        ->where('name', $album->name)
                        ->where('description', $album->description)
                )
        );
    }
}
