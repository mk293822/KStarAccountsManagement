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


		// Account::factory()->count(400)->create()->each(function ($account) {
		//     if ($account->is_returned) {
		//         ReturnedAccount::create([
		//             'name' => fake()->name,
		//             'account_id' => $account->id,
		//             'return_price' => fake()->numberBetween(5000, min(300000, $account->sold_price ?: 300000)),
		//             'is_password_changed' => fake()->boolean(90),
		//             'sold_price' => $account->sold_price,
		//             'returned_date' => $account->sold_date ?? now(),
		//         ]);
		//     }

		//     if ($account->is_deposit) {
		//         $cancelled = fake()->boolean(50);
		//         $returnDeposit = !$cancelled && fake()->boolean(50);

		//         DepositAccount::create([
		//             'name' => fake()->name,
		//             'account_id' => $account->id,
		//             'deposit_amount' => $deposit = fake()->numberBetween(5000, 20000),
		//             'gave_account' => fake()->boolean(),
		//             'deposit_date' => $account->bought_date,
		//             'cancelled' => $cancelled,
		//             'return_deposit' => $returnDeposit,
		//             'return_deposit_amount' => $returnDeposit ? fake()->numberBetween(1000, $deposit) : 0,
		//         ]);
		//     }
		// });
	}
}
