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
            'bought_date' => 'date',
            'sold_date' => 'date',
        ];
    }

    public function returnedAccount()
    {
        return $this->hasOne(ReturnedAccount::class);
    }

    public function depositAccount()
    {
        return $this->hasOne(DepositAccount::class);
    }


    public function soldBy()
    {
        return $this->belongsTo(User::class, 'sold_by', 'id');
    }

    public function boughtBy()
    {
        return $this->belongsTo(User::class, 'bought_by', 'id');
    }

    public function getProfitAttribute()
    {
        $b_price = $this->bought_price;
        $s_price = $this->sold_price;

        if ($s_price < 1 || $b_price > $s_price) {
            return null;
        }

        return $s_price - $b_price;
    }

    public function getLossAttribute()
    {
        $b_price = $this->bought_price;
        $s_price = $this->sold_price;

        if ($s_price < 1 || $b_price < $s_price) {
            return null;
        }

        return $b_price - $s_price;
    }
}
