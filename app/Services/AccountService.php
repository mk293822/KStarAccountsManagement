<?php

namespace App\Services;

use App\Http\Requests\AccountCreateRequest;
use App\Http\Requests\AccountDepositRequest;
use App\Http\Requests\AccountEditRequest;
use App\Http\Requests\AccountReturnRequest;
use App\Http\Requests\AccountSoldRequest;
use App\Http\Resources\AccountResource;
use App\Models\Account;
use App\Models\DepositAccount;
use App\Models\ReturnedAccount;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use phpDocumentor\Reflection\Types\Boolean;

class AccountService {

    public function getAccounts(Request $request)
    {
        $query = $request->input('searchQuery');
        $sort_by = $request->input('sort_by');
        $filter_by = $request->input('filter_by');
        $filter_value = $request->input('filter_value', true);
        $order = $request->input('order_by', 'desc');

        $filterValue = match ($filter_value) {
            'true' => true,
            'false' => false,
            default => true,
        };

        $sort_parameters = [
            'th_level',
            'bought_date',
            'sold_date',
            'bought_price',
            'sold_price',
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
            $get_accounts->where($filter_by, $filterValue);
        }

        // 🔃 Sorting logic
        if ($sort_by && in_array($sort_by, $sort_parameters)) {
            $get_accounts->orderBy($sort_by, $order); // or 'asc'
        } else {
            $get_accounts->orderBy('bought_date', $order);
        }

        return $get_accounts;
    }

    public function create(AccountCreateRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $account =  new Account();
            $account->fill($validated);
            $account->bought_by = $request->user()->id;
            $account->save();

            DB::commit();

            return 200;
        } catch (Exception $e) {
            DB::rollBack();
            return null;
        }
    }

    public function sold(AccountSoldRequest $request, $id)
    {
        $validated = $request->validated();
        DB::beginTransaction();

        try {
            $account = Account::findOrFail($id);
            $account->fill($validated);
            $account->sold_by = $request->user()->id;
            $account->is_sold = true;

            $account->save();

            DB::commit();

            return 200;
        } catch (Exception $e) {
            DB::rollBack();

            return null;
        }
    }

    public function return(AccountReturnRequest $request, $id)
    {
        $validated = $request->validated();
        DB::beginTransaction();

        try {
            $account = Account::findOrFail($id);

            $account->returnedAccount()->create([
                ...$validated,
                'name' => $account->buyer_name,
                'sold_price' => $account->sold_price,
            ]);

            $account->update([
                'is_sold' => false,
                'sold_price' => 0,
                'sold_by' => null,
                'sold_date' => null,
                'is_returned' => true,
                'buyer_name' => null
            ]);

            DB::commit();

            return 200;
        } catch (Exception $e) {
            DB::rollBack();

            return null;
        }
    }

    public function deposit(AccountDepositRequest $request, $id)
    {
        $validated = $request->validated();
        DB::beginTransaction();

        try {
            $account = Account::findOrFail($id);

            $account->depositAccount()->create($validated);

            $account->is_deposit = true;
            $account->save();

            DB::commit();

            return 200;
        } catch (Exception $e) {
            DB::rollBack();

            return null;
        }
    }

    public function update(AccountEditRequest $request, $id)
    {
        $validated = $request->validated();
        DB::beginTransaction();

        try {
            $account = Account::findOrFail($id);

            $account->fill($validated);
            if ($account->isDirty('is_sold')) {
                if ($validated['is_sold']) {
                    $account->sold_by = $request->user()->id;
                } else {
                    $account->sold_by = null;
                    $account->sold_price = 0;
                    $account->buyer_name = null;
                    $account->sold_date = null;
                }
            }

            $account->save();

            DB::commit();

            return 200;
        } catch (Exception $e) {
            DB::rollBack();

            return null;
        }
    }
}
