<?php

namespace App\Http\Requests;

use App\Models\Photo;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePhotoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $photo = $this->route('photo');

        return $photo && $this->user()->can('update', $photo);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'api_id' => ['integer', 'between:1,' . config('ipa.max_api_id')],
            'caption' => ['string', 'max:' . Photo::LIMIT_CAPTION],
        ];
    }
}
