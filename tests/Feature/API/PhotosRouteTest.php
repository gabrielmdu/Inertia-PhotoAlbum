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

    protected function setUp(): void
    {
        parent::setUp();

        $this->setUpUser();

        Album::unsetEventDispatcher();
    }

    public function test_user_can_list_photos()
    {
        // two albums with two photos each
        Album::factory(2)
            ->for($this->user)
            ->hasPhotos(2)
            ->create();

        Sanctum::actingAs($this->user);

        $response = $this->get(route('api.photos.index'));

        $response->assertOk();

        $response->assertJsonCount(4, 'data');
    }

    public function test_user_can_view_photo()
    {
        $album = Album::factory()
            ->for($this->user)
            ->hasPhotos(1)
            ->create();

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

    public function test_user_cant_view_not_owned_photo()
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

    public function test_user_can_update_owned_photo()
    {
        $album = Album::factory()
            ->for($this->user)
            ->hasPhotos(1)
            ->create();

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

    public function test_user_cant_update_photo_with_invalid_data()
    {
        $album = Album::factory()
            ->for($this->user)
            ->hasPhotos(1)
            ->create();

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

    public function test_user_cant_update_not_owned_photo()
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

    public function test_user_can_delete_owned_photo()
    {
        $album = Album::factory()
            ->for($this->user)
            ->hasPhotos(1)
            ->create();

        $photo = $album->photos()->first();

        Sanctum::actingAs($this->user);

        $response = $this->delete(route('api.photos.destroy', ['photo' => $photo->id]));

        $response->assertOk();

        $this->assertSoftDeleted($photo);
    }

    public function test_user_cant_delete_not_owned_photo()
    {
        $album = Album::factory()
            ->for(User::factory()->create())
            ->hasPhotos(1)
            ->create();

        $photo = $album->photos()->first();

        Sanctum::actingAs($this->user);

        $response = $this->delete(route('api.photos.destroy', ['photo' => $photo->id]));

        $response->assertForbidden();
    }
}
