<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountResource extends JsonResource
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
            'account_name' => $this->account_name,
            'account_email' => $this->account_email,
            'seller_name' => $this->seller_name,
            'buyer_name' => $this->buyer_name,
            'th_level' => $this->th_level,

            'bought_price' => $this->bought_price,
            'sold_price' => $this->sold_price,
            'profit' => $this->profit,
            'loss' => $this->loss,

            'is_acc_protection_changed' => (bool) $this->is_acc_protection_changed,
            'is_sold' => (bool) $this->is_sold,
            'is_email_changed' => (bool) $this->is_email_changed,
            'is_email_disabled' => (bool) $this->is_email_disabled,
            'is_returned' => (bool) $this->is_returned,
            'is_deposit' => (bool) $this->is_deposit,

            'bought_by' => $this->boughtBy->name,
            'sold_by' => $this->soldBy->name,

            'bought_date' => $this->bought_date?->toDateTimeString(),
            'sold_date' => $this->sold_date?->toDateTimeString(),
        ];
    }
}
