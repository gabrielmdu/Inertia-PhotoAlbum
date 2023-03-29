<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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

    public function getLatestAlbumsPaginated(int $perPage = 9, array $filters = [])
    {
        return $this
            ->albums()
            ->filter($filters)
            ->orderBy('id', 'DESC')
            ->withCount('photos')
            ->paginate($perPage);
    }
}
