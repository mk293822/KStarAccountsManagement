<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class DepositAccountFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array
	{
		$cancelled = fake()->boolean(50);
		$returnDeposit = $cancelled && fake()->boolean(50);
		$deposit = fake()->numberBetween(5000, 20000);
		return [
			'name' => fake()->name,
			'deposit_amount' => $deposit,
			'gave_account' => fake()->boolean(),
			'cancelled' => $cancelled,
			'return_deposit_amount' => $returnDeposit ? fake()->numberBetween(1000, $deposit) : 0,
		];
	}
}
