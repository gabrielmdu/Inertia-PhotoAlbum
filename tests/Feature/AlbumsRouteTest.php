<?php

namespace Tests\Feature;

use App\Events\AlbumStored;
use App\Events\AlbumUpdated;
use App\Models\Album;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Inertia\Testing\AssertableInertia;
use Tests\HasUserTrait;
use Tests\TestCase;

class AlbumsRouteTest extends TestCase
{
    use RefreshDatabase;
    use HasUserTrait;

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
                ->has('albums.data', 3)
        );
    }

    public function test_user_cant_see_any_albums(): void
    {
        $response = $this->actingAs($this->user)
            ->get(route('albums.index'));

        $response->assertInertia(
            fn (AssertableInertia $page) => $page
                ->component('Albums/Index')
                ->has('albums.data', 0)
        );
    }

    public function test_user_can_view_create_album_page()
    {
        $response = $this->actingAs($this->user)
            ->get(route('albums.create'));

        $response->assertInertia(
            fn (AssertableInertia $page) => $page
                ->component('Albums/Create')
        );
    }

    public function test_user_can_store_album()
    {
        $albumData = [
            'name' => 'ABC',
            'description' => 'this is my description',
            'cover_id' => 200,
        ];

        Event::fake([AlbumStored::class]);

        $this->actingAs($this->user)
            ->postJson(route('albums.store'), $albumData);

        Event::assertDispatched(AlbumStored::class);

        $this->assertDatabaseHas('albums', $albumData);
    }

    public function test_user_cannot_store_album_with_wrong_params()
    {
        $response = $this->actingAs($this->user)
            ->postJson(route('albums.store', [
                'name' => 'AB',
                'description' => 'this is my description',
                'cover_id' => -1,
            ]));

        $response->assertJsonStructure(['errors' => ['name', 'cover_id']]);
    }

    public function test_user_can_view_own_album_edit_page()
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
                    'album.data',
                    fn (AssertableInertia $a) => $a
                        ->where('id', $album->id)
                        ->where('name', $album->name)
                        ->where('description', $album->description)
                        ->where('cover_id', $album->cover_id)
                )
        );
    }

    public function test_user_can_update_album(): void
    {
        $album = $this->user->albums()->create([
            'name' => 'My Album 1',
            'description' => 'My description 1',
            'cover_id' => 1,
        ]);

        $newName = 'My Album Edited';
        $newDescription = 'Description edited.';
        $newCoverId = 2;

        Event::fake([AlbumUpdated::class]);

        $response = $this->actingAs($this->user)
            ->put(route('albums.update', [
                'album' => $album->id,
                'name' => $newName,
                'description' => $newDescription,
                'cover_id' => $newCoverId,
            ]));

        Event::assertDispatched(AlbumUpdated::class);

        $response->assertRedirect(route('albums.index'));

        $album->refresh();

        $this->assertEquals($newName, $album->name);
        $this->assertEquals($newDescription, $album->description);
        $this->assertEquals($newCoverId, $album->cover_id);
    }

    public function test_user_can_delete_own_album()
    {
        $album = Album::factory()->create(['user_id' => $this->user->id]);

        $this->actingAs($this->user)
            ->delete(route('albums.destroy', ['album' => $album->id]));

        $this->assertSoftDeleted($album);
    }
}
