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
		$isSold = $this->faker->boolean(80);
        $boughtDate = Carbon::now()->subDays(rand(0, 400)); // up to 2 years ago
        $soldDate = null;

        if ($isSold) {
            // Sold after 1 to 60 days of buying, within today
            $soldDate = $boughtDate->copy()->addDays(rand(1, 60));
            if ($soldDate->greaterThan(Carbon::now())) {
                $soldDate = Carbon::now(); // Don't go beyond today
            }
        }

		$isReturned = !$isSold ? $this->faker->boolean(40) : false;

        return [
            'account_name' => $this->faker->userName,
            'account_email' => $this->faker->unique()->safeEmail,
            'seller_name' => $this->faker->name,
            'buyer_name' => $isSold ? $this->faker->name : null,
            'th_level' => $this->faker->numberBetween(10, 17),

            'bought_price' => $boughtPrice,
			'sold_price' => $isSold ? $boughtPrice + $this->faker->numberBetween(10000, 40000) : 0,

            'is_acc_protection_changed' => $this->faker->boolean(90),
            'is_sold' => $isSold,
            'is_email_changed' => $this->faker->boolean(90),
			'is_email_disabled' => $this->faker->boolean(40),
			'is_deposit' => !$isSold && $this->faker->boolean(40),
            'is_returned' => $isReturned,

            'sold_by' => 1,
            'bought_by' => 1,

            'bought_date' => $boughtDate->toDateString(),
            'sold_date' => $soldDate?->toDateString(),
        ];
    }
}
