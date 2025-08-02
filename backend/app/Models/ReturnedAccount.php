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
        'sold_price',
        'return_price',
        'is_password_changed',
        'returned_date'
    ];

    protected function casts(): array
    {
        return [
            'returned_date' => 'date',
			'is_password_changed' => 'boolean',
        ];
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
