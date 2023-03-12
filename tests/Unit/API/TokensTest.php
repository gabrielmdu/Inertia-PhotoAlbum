<?php

namespace Tests\Unit\API;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TokensTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function test_token_creation()
    {
        $token = $this->user->createToken('ipa_token');

        $this->assertIsString($token->plainTextToken);
    }
}