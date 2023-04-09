<?php

namespace App\Http\Requests;

use App\Models\Photo;
use Illuminate\Database\Query\Builder as Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePhotoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Photo::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'api_id' => ['required', 'integer', 'between:1,1000'],
            'album_id' => [
                'required',
                Rule::exists('albums', 'id')->where(
                    fn (Builder $query) => $query->where('user_id', $this->user()->id)
                )
            ],
            'caption' => ['string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'album_id.exists' => 'The selected album does not belong to the user.'
        ];
    }
}
