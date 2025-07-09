<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $boughtPrice = $this->faker->numberBetween(10000, 300000);
        $isSold = $this->faker->boolean(50);
        $soldPrice = $isSold ? $this->faker->numberBetween(10000, 40000) : 0;
        $boughtDate = Carbon::now()->subDays(rand(0, 30));
        $isReturned = !$isSold && $this->faker->boolean(20);

        return [
            'account_name' => $this->faker->userName,
            'account_email' => $this->faker->unique()->safeEmail,
            'seller_name' => $this->faker->name,
            'buyer_name' => $isSold ? $this->faker->name : null,
            'th_level' => $this->faker->numberBetween(10, 17),

            'bought_price' => $boughtPrice,
            'sold_price' => $soldPrice,

            'is_acc_protection_changed' => $this->faker->boolean(90),
            'is_sold' => $isSold,
            'is_email_changed' => $this->faker->boolean(95),
            'is_email_disabled' => $this->faker->boolean(10),
            'is_deposit' => !$isSold && $this->faker->boolean(20),
            'is_returned' => $isReturned,

            'sold_by' => 1,
            'bought_by' => 1,

            'bought_date' => $boughtDate->toDateString(),
            'sold_date' => $isSold ? $boughtDate->copy()->addDays(rand(1, 10))->toDateString() : null,
        ];
    }
}
