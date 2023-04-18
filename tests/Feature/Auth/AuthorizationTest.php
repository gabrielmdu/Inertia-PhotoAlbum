<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_access_welcome_page(): void
    {
        $this->get('/');

        $this->assertGuest();
    }

    public function test_user_cannot_access_welcome_page(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/');
        $response->assertStatus(302);
        $response->assertRedirect('/dashboard');
    }

    public function test_user_redirected_on_unauthorized_access(): void
    {
        $users = User::factory(2)
            ->hasAlbums(1)
            ->createQuietly();

        $unaccessibleAlbum = $users[1]->albums[0];

        $response = $this->actingAs($users[0])
            ->get(route('albums.edit', ['album' => $unaccessibleAlbum]));

        $response->assertStatus(302);
        $response->assertRedirect(RouteServiceProvider::HOME);
    }

    public function test_user_can_access_dashboard_page(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('dashboard'));
        $response->assertOk();
    }
}
