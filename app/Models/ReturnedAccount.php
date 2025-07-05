<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReturnedAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'account_id',
        'return_price',
        'is_password_changed'
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
