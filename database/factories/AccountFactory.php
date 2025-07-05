<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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
        $soldPrice = $this->faker->numberBetween(0, 40000);
        $isSold = $soldPrice > 0;

        return [
            'account_name' => $this->faker->userName,
            'account_email' => $this->faker->unique()->safeEmail,
            'seller_name' => $this->faker->name,
            'buyer_name' => $isSold ? $this->faker->name : null,
            'th_level' => $this->faker->numberBetween(10, 17),

            'bought_price' => $boughtPrice,
            'sold_price' => $soldPrice,
            'profit' => max(0, $soldPrice - $boughtPrice),
            'loss' => $soldPrice > 0 && $soldPrice < $boughtPrice ? $boughtPrice - $soldPrice : 0,

            'is_acc_protection_changed' => $this->faker->boolean(90),
            'is_sold' => $isSold,
            'is_email_changed' => $this->faker->boolean(95),
            'is_email_disabled' => $this->faker->boolean(5),
            'is_returned' => $this->faker->boolean(5),
            'is_deposit' => $this->faker->boolean(5),

            'sold_by' => 1,
            'bought_by' => 1,

            'bought_date' => now(),
            'sold_date' => $isSold ? now() : null,
        ];
    }
}
