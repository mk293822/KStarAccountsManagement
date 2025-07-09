<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepositAccountResource extends JsonResource
{
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
            'gave_account' => $this->gave_account,
            'deposit_date' => $this->deposit_date->toDateString(),
            'cancelled' => $this->cancelled,
            'return_deposit' => $this->return_deposit,
            'return_deposit_amount' => $this->return_deposit_amount,
            'cancelled_date' => $this->cancelled_date
        ];
    }
}
