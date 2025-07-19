<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReturnedAccountResource extends JsonResource
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
            'sold_price' => $this->sold_price,
            'return_price' => $this->return_price,
            'is_password_changed' => $this->is_password_changed,
            'returned_date' => $this->returned_date?->toDateString(),
            'name' => $this->name
        ];
    }
}
