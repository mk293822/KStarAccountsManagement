<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AccountCreateRequest extends FormRequest
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
            'account_name'              => ['required', 'string', 'max:255'],
            'seller_name'               => ['required', 'string', 'max:255'],
            'account_email'             => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                'unique:accounts,account_email'
            ],
            'th_level'                  => ['required', 'integer', 'min:1'],
            'bought_price'              => ['required', 'numeric', 'min:50'],
            'is_acc_protection_changed' => ['required', 'boolean'],
            'is_email_changed'          => ['required', 'boolean'],
            'is_email_disabled'         => ['required', 'boolean'],
            'bought_date'               => ['required', 'date', 'date_format:Y-m-d'],
        ];
    }
}
