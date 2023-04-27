<?php

namespace Tests\Feature;

use App\Models\Album;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia;
use Tests\HasUserTrait;
use Tests\TestCase;

class DashboardRouteTest extends TestCase
{
    use RefreshDatabase;
    use HasUserTrait;

    protected function setUp(): void
    {
        parent::setUp();

        $this->setUpUser();
    }

    public function test_user_can_see_latest_albums_and_photos(): void
    {
        Album::factory(10)
            ->for($this->user)
            ->hasPhotos(10)
            ->create();

        $response = $this->get(route('dashboard'));

        $response->assertOk();

        $response->assertInertia(
            fn (AssertableInertia $page) => $page
                ->component('Dashboard')
                ->has('auth.user')
                ->has('albums', 5)
                ->has('photos', 5)
        );
    }
}
