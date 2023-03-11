<?php

namespace Tests\Feature\Auth;

use App\Models\User;
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
}
