<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepositAccountResource extends JsonResource
{
	public static $wrap = false;
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'account_id' => $this->account_id,
            'name' => $this->name,
            'deposit_amount' => $this->deposit_amount,
			'gave_account' => (bool) $this->gave_account,
            'deposit_date' => $this->deposit_date->toDateString(),
			'cancelled' => (bool) $this->cancelled,
			'return_deposit' => (bool) $this->return_deposit_amount > 0,
            'return_deposit_amount' => $this->return_deposit_amount,
            'cancelled_date' => $this->cancelled_date
        ];
    }
}
