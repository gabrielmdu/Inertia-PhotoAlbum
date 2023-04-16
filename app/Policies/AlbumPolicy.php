<?php

namespace App\Policies;

use App\Models\Album;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AlbumPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Album $album): bool
    {
        return $user->id === $album->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Album $album): bool
    {
        return $user->id === $album->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Album $album): bool
    {
        return $this->update($user, $album);
    }

    public function viewPhotos(User $user, Album $album): bool
    {
        return $this->update($user, $album);
    }

    public function createPhoto(User $user, Album $album): bool
    {
        return $this->update($user, $album);
    }

    public function addPhoto(User $user, Album $album): bool
    {
        return $this->update($user, $album);
    }
}
