<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use SoftDeletes;

    public const LIMIT_NAME = '100';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function albums()
    {
        return $this->hasMany(Album::class);
    }

    public function photos()
    {
        return $this->hasManyThrough(Photo::class, Album::class);
    }

    public function latestUpdatedAlbums(int $limit = 10): HasMany
    {
        return $this
            ->albums()
            ->orderByDesc('updated_at')
            ->limit($limit)
            ->withCount('photos');
    }

    public function latestPhotos(int $limit = 10): HasManyThrough
    {
        return $this
            ->photos()
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->limit($limit);
    }

    public function getLatestAlbumsPaginated(int $perPage = 9, array $filters = [])
    {
        return $this
            ->albums()
            ->filter($filters)
            ->orderBy('id', 'DESC')
            ->withCount('photos')
            ->paginate($perPage);
    }

    public function getLatestPhotosPaginated(int $perPage = 4, int $albumId = null)
    {
        return $this
            ->latestPhotos(0)
            ->byAlbum($albumId)
            ->simplePaginate($perPage);
    }
}
