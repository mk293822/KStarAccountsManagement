<?php

namespace App\Services;

use App\Models\Account;
use Illuminate\Support\Carbon;

use function PHPUnit\Framework\isEmpty;

class DashboardService
{

    public function getAccounts($period)
    {
        $query = Account::query();

        $left_accounts = $query->where('is_sold', false)
            ->get(['id', 'bought_date', 'bought_price'])
            ->map(fn($acc) => [
                'id' => $acc->id,
                'bought_date' => $acc->bought_date->toDateString(),
            'bought_price' => $acc->bought_price,
            ])
            ->toArray();


        // Reset query builder for scoped query
        $accountsQuery = Account::query()->orderBy('bought_date', 'asc');

        // Filter by either this month or today
        if($period === 'daily' | $period === 'monthly'){
            $accountsQuery->whereBetween(
                'bought_date',
                $period === 'daily' ? [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()] : [Carbon::now()->startOfYear(), Carbon::now()->endOfYear()]
            );
        }

        $bought_accounts = (clone $accountsQuery)->get(['id', 'bought_date', 'bought_price'])->map(fn($acc) =>  [
            'id' => $acc->id,
            'bought_date' => $acc->bought_date->toDateString(),
            'bought_price' => $acc->bought_price,
        ])->toArray();

        $sold_accounts = (clone $accountsQuery)
            ->where('is_sold', true)
            ->get(['id', 'bought_date', 'sold_price', 'bought_price', 'sold_date'])
            ->map(fn($acc) =>  [
                'id' => $acc->id,
                'bought_date' => $acc->bought_date->toDateString(),
                'sold_date' => $acc->bought_date->toDateString(),
                'bought_price' => $acc->bought_price,
                'sold_price' => $acc->sold_price
            ])->toArray();

        $conditions = [
            'deposit_accounts' => ['is_deposit', true],
            'returned_accounts' => ['is_returned', true],
            'mail_disabled_accounts' => ['is_email_disabled', true],
            'unchanged_acc_protection_accounts' => ['is_acc_protection_changed', false],
            'unchanged_email_accounts' => ['is_email_changed', false],
        ];

        $data = [];

        foreach ($conditions as $key => [$field, $value]) {
            $data[$key] = (clone $accountsQuery)
                ->where($field, $value)
                ->get(['id', 'bought_date', 'bought_price'])
                ->map(fn($acc) =>  [
                    'id' => $acc->id,
                    'bought_date' => $acc->bought_date->toDateString(),
                'bought_price' => $acc->bought_price,
                ])->toArray();
        }

        return [
            'left_accounts' => $left_accounts,
            'bought_accounts' => $bought_accounts,
            'sold_accounts' => $sold_accounts,
            ...$data,
        ];
    }
}
