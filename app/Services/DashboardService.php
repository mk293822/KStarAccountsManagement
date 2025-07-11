<?php

namespace App\Services;

use App\Models\Account;
use Illuminate\Support\Carbon;

use function PHPUnit\Framework\isEmpty;

class DashboardService
{

    public function getChartData($period)
    {
        $query = Account::query();

        $left_accounts = $query->where('is_sold', false)
            ->get(['id', 'bought_date'])
            ->map(fn($acc) => [
                'id' => $acc->id,
                'bought_date' => $acc->bought_date->toDateString(),
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

        $bought_accounts = (clone $accountsQuery)->get(['id', 'bought_date'])->map(fn($acc) =>  ['id' => $acc->id, 'bought_date' => $acc->bought_date->toDateString()]);

        $conditions = [
            'sold_accounts' => ['is_sold', true],
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
                ->get(['id', 'bought_date'])
                ->map(fn($acc) => ['id' => $acc->id, 'bought_date' => $acc->bought_date->toDateString()])
                ->toArray();
        }

        return [
            'left_accounts' => $left_accounts,
            'bought_accounts' => $bought_accounts,
            ...$data,
        ];
    }
}
