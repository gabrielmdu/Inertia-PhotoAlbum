<?php

namespace Tests\Feature\API;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TokensRouteTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_token()
    {
        $user = User::factory()->create();

        $response = $this->json('POST', route('api.tokens.create'), [
            'email' => $user->email,
            'password' => 'password'
        ]);

        $response->assertCreated();
        $response->assertJsonStructure(['token', 'expiration']);
    }

    public function test_cant_create_token_with_invalid_credentials()
    {
        $response = $this->json('POST', route('api.tokens.create'), [
            'email' => 'email@email.com',
            'password' => 'password'
        ]);

        $response->assertUnprocessable();
        $response->assertJsonStructure(['message', 'errors' => ['email']]);
    }
}
