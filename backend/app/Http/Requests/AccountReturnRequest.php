<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AccountReturnRequest extends FormRequest
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
            'return_price'            => ['required', 'numeric', 'min:50'],
            'is_password_changed'     => ['required', 'boolean'],
            'returned_date'           => ['required', 'date', 'date_format:Y-m-d']
        ];
    }
}
