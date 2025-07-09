<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepositAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_id',
        'name',
        'deposit_amount',
        'gave_account',
        'deposit_date',
        'cancelled',
        'return_deposit',
        'return_deposit_amount',
    ];

    protected function casts(): array
    {
        return [
            'deposit_date' => 'date'
        ];
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
