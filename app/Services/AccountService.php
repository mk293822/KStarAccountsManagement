<?php

namespace App\Services;

use App\Http\Resources\AccountResource;
use App\Models\Account;
use Illuminate\Http\Request;

class AccountService {

    public function getAccounts(Request $request)
    {
        $query = $request->input('searchQuery');
        $sort_by = $request->input('sort_by');
        $filter_by = $request->input('filter_by');
        $order = $request->input('order_by', 'desc');

        $sort_parameters = [
            'th_level',
            'bought_date',
            'sold_date',
            'bought_price',
            'sold_price',
            'profit',
            'loss',
        ];

        $filter_parameters = [
            'is_acc_protection_changed',
            'is_sold',
            'is_email_changed',
            'is_email_disabled',
            'is_returned',
            'is_deposit',
        ];

        $get_accounts = Account::query();

        // 🔍 Search logic
        if ($query) {
            $get_accounts->where(function ($q) use ($query) {
                $q->where('account_name', 'like', "%{$query}%")
                    ->orWhere('account_email', 'like', "%{$query}%")
                    ->orWhere('seller_name', 'like', "%{$query}%")
                    ->orWhere('buyer_name', 'like', "%{$query}%")
                    ->orWhere('th_level', 'like', "%{$query}%");
            });
        }

        // ⚙️ Filter logic (single flag only; adjust for multiple if needed)
        if ($filter_by && in_array($filter_by, $filter_parameters)) {
            $get_accounts->where($filter_by, true);
        }

        // 🔃 Sorting logic
        if ($sort_by && in_array($sort_by, $sort_parameters)) {
            $get_accounts->orderBy($sort_by, $order); // or 'asc'
        } else {
            $get_accounts->latest('bought_date');
        }

        return $get_accounts;
    }
}
