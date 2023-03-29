<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AlbumResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'cover_id' => $this->cover_id,
            'created_at' => $this->created_at->getTimestampMs(),
            'updated_at' => $this->updated_at->getTimestampMs(),
            'photos_count' => $this->whenCounted('photos'),
        ];
    }
}
