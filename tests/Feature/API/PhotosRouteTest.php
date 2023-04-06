<?php

namespace Tests\Feature\API;

use App\Models\Album;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\HasUserTrait;
use Tests\TestCase;

class PhotosRouteTest extends TestCase
{
    use RefreshDatabase;
    use HasUserTrait;

    public function test_can_list_photos()
    {
        $album = Album::factory()
            ->hasPhotos(4)
            ->create(['user_id' => $this->user->id]);

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.photos.index', ['album_id' => $album->id]));

        $response->assertOk();
        $response->assertJsonStructure(['data', 'meta', 'links']);
        $response->assertJsonCount(4, 'data');

        $data = $response->json('data');
        $this->assertDatabaseHas('photos', $data[0]);
    }

    public function test_can_view_photo()
    {
        $album = Album::factory()
            ->hasPhotos(1)
            ->create(['user_id' => $this->user->id]);

        $photo = $album->photos[0];

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.photos.show', ['photo' => $photo->id]));

        $response->assertOk();

        $response->assertJsonFragment([
            'id' => $photo->id,
            'api_id' => $photo->api_id,
            'caption' => $photo->caption,
        ]);
    }

    public function test_cant_view_not_owned_photo()
    {
        $otherUser = User::factory()
            ->has(Album::factory()
                ->hasPhotos(1))
            ->create();

        $photo = $otherUser->albums[0]->photos[0];

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.photos.show', ['photo' => $photo->id]));

        $response->assertForbidden();
    }

    public function test_can_update_owned_photo()
    {
        $album = Album::factory()
            ->hasPhotos(1)
            ->create(['user_id' => $this->user->id]);

        $photo = $album->photos[0];

        Sanctum::actingAs($this->user);

        $photoData = [
            'api_id' => 455,
            'caption' => 'This is the new caption.',
        ];

        $response = $this->putJson(route('api.photos.update', ['photo' => $photo->id]), $photoData);

        $response->assertOk();
        
        $photo->refresh();
        $this->assertEquals($photoData, $photo->only(['api_id', 'caption']));
    }

    public function test_cant_update_photo_with_invalid_data()
    {
        $album = Album::factory()
            ->hasPhotos(1)
            ->create(['user_id' => $this->user->id]);

        $photo = $album->photos[0];

        Sanctum::actingAs($this->user);

        $invalidPhotoData = [
            'api_id' => 1001,
            'caption' => str_repeat('a', 501),
        ];

        $response = $this->putJson(route('api.photos.update', ['photo' => $photo->id]), $invalidPhotoData);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors(['api_id', 'caption']);
    }

    public function test_cant_update_not_owned_photo()
    {
        $otherUser = User::factory()
            ->has(Album::factory()
                ->hasPhotos(1))
            ->create();

        $photo = $otherUser->albums[0]->photos[0];

        Sanctum::actingAs($this->user);

        $response = $this->putJson(route('api.photos.update', ['photo' => $photo->id]), [
            'api_id' => 333,
            'caption' => 'Asaçldkasçfjafjwiafnçaifhjçlsakhfsçlfhçskhfçds'
        ]);

        $response->assertForbidden();
    }
}
