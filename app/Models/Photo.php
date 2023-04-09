<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Photo extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'album_id',
        'caption',
        'api_id'
    ];

    public function album(): BelongsTo
    {
        return $this->belongsTo(Album::class);
    }

    public function scopeByAlbum(Builder $query, int $albumId = null)
    {
        $query->when(
            $albumId,
            fn (Builder $query, $albumId) => $query
                ->where('album_id', $albumId)
        );
    }
}
