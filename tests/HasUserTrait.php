<?php

namespace Tests;

use App\Models\User;

trait HasUserTrait 
{
    protected User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }
}