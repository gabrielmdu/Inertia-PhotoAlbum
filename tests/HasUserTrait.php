<?php

namespace Tests;

use App\Models\User;

trait HasUserTrait 
{
    protected User $user;

    protected function setUpUser(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        $this->actingAs($this->user);
    }
}