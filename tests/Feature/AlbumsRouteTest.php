<?php

namespace Tests\Feature;

use App\Events\AlbumStored;
use App\Events\AlbumUpdated;
use App\Models\Album;
use App\Models\User;
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
            Album::factory(3)->createQuietly(['user_id' => $this->user->id])
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

    public function test_user_can_view_show_album_page()
    {
        $album = Album::factory()->createQuietly(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->get(route('albums.show', ['album' => $album->id]));

        $response->assertOk();

        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Albums/Show')
            ->has(
                'album.data',
                fn (AssertableInertia $data) => $data
                    ->whereAll([
                        'id' => $album->id,
                        'name' => $album->name,
                        'description' => $album->description,
                        'cover_id' => $album->cover_id,
                        'created_at' => $album->created_at->getTimestampMs(),
                        'updated_at' => $album->updated_at->getTimestampMs(),
                    ])
            ));
    }

    public function test_user_cant_view_not_owned_show_album_page()
    {
        $otherUser = User::factory()->create();
        $album = Album::factory()->createQuietly(['user_id' => $otherUser->id]);

        $response = $this->actingAs($this->user)
            ->get(route('albums.show', compact('album')));

        $response->assertRedirect(route('dashboard'));
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
        $album = $this->user->albums()->createQuietly([
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
                    fn (AssertableInertia $data) => $data
                        ->whereAll([
                            'id' => $album->id,
                            'name' => $album->name,
                            'description' => $album->description,
                            'cover_id' => $album->cover_id,
                            'created_at' => $album->created_at->getTimestampMs(),
                            'updated_at' => $album->updated_at->getTimestampMs(),
                        ])
                )
        );
    }

    public function test_user_can_update_album(): void
    {
        $album = $this->user->albums()->createQuietly([
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

        $response->assertRedirect(route('albums.show', ['album' => $album->id]));

        $album->refresh();

        $this->assertEquals($newName, $album->name);
        $this->assertEquals($newDescription, $album->description);
        $this->assertEquals($newCoverId, $album->cover_id);
    }

    public function test_user_can_delete_own_album()
    {
        $album = Album::factory()->createQuietly(['user_id' => $this->user->id]);

        $this->actingAs($this->user)
            ->delete(route('albums.destroy', ['album' => $album->id]));

        $this->assertSoftDeleted($album);
    }

    public function test_user_can_view_create_photo_page()
    {
        $album = Album::factory()
            ->for($this->user)
            ->create();

        $response = $this->actingAs($this->user)
            ->get(route('albums.photos.create', ['album' => $album->id]));

        $response->assertInertia(
            fn (AssertableInertia $page) => $page
                ->component('Photos/Create')
        );
    }

    public function test_can_store_photo_in_owned_album()
    {
        $album = Album::factory()
            ->for($this->user)
            ->create();

        $photoData = [
            'caption' => 'This is the caption of the new photo',
            'api_id' => 200,
        ];

        $response = $this->actingAs($this->user)
            ->postJson(route('albums.photos.store', ['album' => $album->id]), $photoData);

        $response->assertRedirect(route('albums.show', ['album' => $album->id]));

        $this->assertDatabaseHas('photos', array_merge($photoData, ['album_id' => $album->id]));
    }

    public function test_user_cant_store_photo_in_not_owned_album()
    {
        $album = Album::factory()
            ->for(User::factory()->create())
            ->create();

        $photoData = [
            'caption' => 'This is the caption of the new photo',
            'api_id' => 123,
        ];

        $response = $this->actingAs($this->user)
            ->postJson(route('albums.photos.store', ['album' => $album->id]), $photoData);

        $response->assertRedirect(route('dashboard'));

        $this->assertDatabaseMissing('photos', array_merge($photoData, ['album_id' => $album->id]));
    }
}
