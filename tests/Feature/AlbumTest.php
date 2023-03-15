<?php

namespace Tests\Feature;

use App\Models\Album;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AlbumTest extends TestCase
{
    use RefreshDatabase;

    public function test_album_belongs_to_user(): void
    {
        $user = User::factory()->create();

        $album = Album::factory()->create(['user_id' => $user->id]);

        $this->assertTrue($user->is($album->user));
    }

    public function test_albums_are_filtered_by_text(): void
    {
        $albumsData = [];
        $name = 'ABCDEFGHIJ';

        for ($i = 1; $i <= 10; $i++) {
            $albumsData[] = [
                'name' => substr($name, 0, $i),
                'description' => substr($name, strlen($name) - $i, $i),
                'cover_id' => $i
            ];
        }

        User::factory()
            ->create()
            ->albums()
            ->createMany($albumsData);

        $filters = ['search' => 'defg'];
        $filteredAlbums = Album::filter($filters)->get();
        $this->assertCount(4, $filteredAlbums);

        $filters = ['search' => 'hij'];
        $filteredAlbums = Album::filter($filters)->get();
        $this->assertCount(8, $filteredAlbums);
    }
}
