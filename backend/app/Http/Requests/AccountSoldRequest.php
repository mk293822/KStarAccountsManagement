<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AccountSoldRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sold_date'               => ['required', 'date', 'date_format:Y-m-d'],
            'sold_price'              => ['required', 'numeric', 'min:50'],
            'buyer_name'              => ['required', 'string', 'max:255'],
        ];
    }
}
