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
            'name' => 'Min Khant Thaw',
            'email' => 'mkt293822@gmail.com',
        ]);
        User::factory()->create([
            'name' => 'Zaw Naing Linn',
            'email' => 'zaw203929@gmail.com',
        ]);


		Account::factory()->count(1000)->create()->each(function ($account) {
			if ($account->is_returned) {
				ReturnedAccount::factory()->count(fake()->numberBetween(1, 3))->create([
					'account_id' => $account->id,
					'return_price' => fake()->numberBetween(5000, min(300000, $account->sold_price ?: 300000)),
					'sold_price' => $account->sold_price,
					'returned_date' => $account->sold_date ?? now(),
				]);
			}

			if ($account->is_deposit) {
				DepositAccount::factory()->count(fake()->numberBetween(1, 3))->create([
					'account_id' => $account->id,
					'deposit_date' => $account->bought_date,
				]);
			}
		});
	}
}
