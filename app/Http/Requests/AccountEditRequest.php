<?php

namespace App\Http\Requests;

use App\Models\Account;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AccountEditRequest extends FormRequest
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
            'account_email'             => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(Account::class, 'account_email')->ignore($this->route('id'))
            ],
            'th_level'                  => ['required', 'integer', 'min:1'],

            'bought_date'               => ['required', 'date', 'date_format:Y-m-d'],
            'seller_name'               => ['required', 'string', 'max:255'],
            'bought_price'              => ['required', 'numeric', 'min:50'],

            'is_acc_protection_changed' => ['required', 'boolean'],
            'is_email_changed'          => ['required', 'boolean'],
            'is_email_disabled'         => ['required', 'boolean'],
            'is_sold'                   => ['required', 'boolean'],

            'sold_date'                 => [
                'date',
                'date_format:Y-m-d',
            Rule::requiredIf(fn() => $this->boolean('is_sold') === true)
        ],
            'sold_price'                => [
                'numeric',
                'min:50',
            Rule::requiredIf(fn() => $this->boolean('is_sold') === true)
        ],
            'buyer_name'                => [
                'string',
                'max:255',
            Rule::requiredIf(fn() => $this->boolean('is_sold') === true)
        ],
        ];
    }
}
