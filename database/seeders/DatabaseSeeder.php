<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\DepositAccount;
use App\Models\ReturnedAccount;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'minkhant',
            'email' => 'mkt293822@gmail.com',
        ]);


        Account::factory()->count(50)->create()->each(function ($account) {
            if ($account->is_returned) {
                ReturnedAccount::create([
                    'name' => fake()->name,
                    'account_id' => $account->id,
                    'return_price' => fake()->numberBetween(10000, 300000),
                    'is_password_changed' => fake()->boolean(90),
                    'sold_price' => $account->sold_price,
                    'returned_date' => today(),
                ]);
            }

            if ($account->is_deposit) {
                $cancelled = fake()->boolean(50);
                DepositAccount::create([
                    'name' => fake()->name,
                    'account_id' => $account->id,
                    'deposit_amount' => fake()->numberBetween(5000, 20000),
                    'gave_account' => fake()->boolean,
                    'deposit_date' => today(),
                    'cancelled' => $cancelled,
                    'return_deposit' => !$cancelled ? fake()->boolean(50) : false,
                    'return_deposit_amount' => !$cancelled ? fake()->numberBetween(5000, 20000) : 0,
                ]);
            }
        });
    }
}
