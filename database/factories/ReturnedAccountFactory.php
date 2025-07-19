<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReturnedAccount>
 */
class ReturnedAccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
			'name' => fake()->name,
			'is_password_changed' => fake()->boolean(90),
			'returned_date' => $account->sold_date ?? now(),
        ];
    }
}
