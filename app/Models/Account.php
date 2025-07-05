<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{

    use HasFactory;

    protected $fillable = [
        'account_name',
        'account_email',
        'seller_name',
        'buyer_name',
        'th_level',

        'bought_price',
        'sold_price',
        'profit',
        'loss',

        'is_acc_protection_changed',
        'is_sold',
        'is_email_changed',
        'is_email_disabled',
        'is_returned',
        'is_deposit',

        'sold_by',
        'bought_by',

        'bought_date',
        'sold_date'
    ];

    protected function casts(): array
    {
        return [
            'bought_date' => 'datetime',
            'sold_date' => 'datetime',
        ];
    }

    public function returnedAccount()
    {
        if ($this->is_returned) {
            return $this->hasOne(ReturnedAccount::class);
        }
        return null;
    }
    public function depositAccount()
    {
        if ($this->is_returned) {
            return $this->hasOne(DepositAccount::class);
        }
        return null;
    }
}
