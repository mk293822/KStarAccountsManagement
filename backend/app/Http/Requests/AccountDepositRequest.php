<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AccountDepositRequest extends FormRequest
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
            'deposit_date'               => ['required', 'date', 'date_format:Y-m-d'],
            'deposit_amount'              => ['required', 'numeric', 'min:50'],
            'gave_account'          => ['required', 'boolean'],
            'name'              => ['required', 'string', 'max:255'],
        ];
    }
}
