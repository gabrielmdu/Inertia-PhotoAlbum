<?php

namespace App\Http\Requests;

use App\Models\Album;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAlbumRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $album = $this->route('album');

        return $album && $this->user()->can('update', $album);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'min:1', 'max:' . Album::LIMIT_NAME],
            'description' => ['string', 'max:' . Album::LIMIT_DESCRIPTION],
            'cover_id' => ['int', 'between:1,' . config('ipa.max_api_id')],
        ];
    }
}
