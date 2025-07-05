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
        'gave_account'
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
