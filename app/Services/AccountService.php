<?php

namespace App\Services;

use App\Http\Requests\AccountCreateRequest;
use App\Http\Requests\AccountDepositRequest;
use App\Http\Requests\AccountEditRequest;
use App\Http\Requests\AccountReturnRequest;
use App\Http\Requests\AccountSoldRequest;
use App\Models\Account;
use App\Models\DepositAccount;
use App\Models\ReturnedAccount;
use App\Services\Contracts\AccountServiceInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AccountService implements AccountServiceInterface
{

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
			Log::error(message: $e);

			return null;
        }
    }

    public function sold(AccountSoldRequest $request, $id)
    {
        $validated = $request->validated();
        DB::beginTransaction();

        try {
            $account = Account::findOrFail($id);

			if ($account->is_sold === true || $account->is_returned === true) {
				return null;
			}

			$account->update([
				...$validated,
				'sold_by' => $request->user()->id,
				'is_sold' => true,
				'is_returned' => false,
			]);

            DB::commit();

            return 200;
        } catch (Exception $e) {
            DB::rollBack();
			Log::error(message: $e);

			return null;
        }
    }

    public function return(AccountReturnRequest $request, $id)
    {
        $validated = $request->validated();
        DB::beginTransaction();

        try {
            $account = Account::findOrFail($id);

			if ($account->is_deposit === true || $account->is_returned === true) {
				return null;
			}

			$account->returnedAccounts()->create([
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
			Log::error(message: $e);

			return null;
		}
	}

	public function editReturn(AccountReturnRequest $request, $id)
	{
		$validated = $request->validated();
		DB::beginTransaction();

		try {
			$account = ReturnedAccount::findOrFail($id);

			$account->update($validated);

			DB::commit();

			return 200;
		} catch (Exception $e) {
			DB::rollBack();

			Log::error(message: $e);
			return null;
		}
	}

	public function destroyReturn($id)
	{
		DB::beginTransaction();

		try {
			$return_account = ReturnedAccount::findOrFail($id);
			$account = $return_account->account;


			// Then check if the account has any other return records left
			if ($account->returnedAccounts()->count() < 2) {
				$account->is_returned = false;
				$account->is_sold = true;
				$account->sold_price = $return_account->sold_price;
				$account->sold_by = Auth::id();
				$account->sold_date = $return_account->returned_date;
				$account->buyer_name = $return_account->name;
				$account->save();
			}
			// First delete the return account
			$return_account->delete();

			DB::commit();
			return 200;
		} catch (Exception $e) {
			DB::rollBack();
			Log::error(message: $e);
			return null;
		}
	}


	public function deposit(AccountDepositRequest $request, $id)
    {
        $validated = $request->validated();
        DB::beginTransaction();

        try {
            $account = Account::findOrFail($id);
			$hasActiveDeposit = $account->depositAccounts()->where('cancelled', false)->exists();

			if ($account->is_deposit === true || $account->is_sold === true || $hasActiveDeposit) {
				return null;
			}

			$account->depositAccounts()->create($validated);

            $account->is_deposit = true;
            $account->save();

            DB::commit();

            return 200;
        } catch (Exception $e) {
            DB::rollBack();
			Log::error(message: $e);
			return null;
		}
	}

	public function editDeposit(Request $request, $id)
	{
		$validated = $request->validate([
			'deposit_date'               => ['required', 'date', 'date_format:Y-m-d'],
			'deposit_amount'              => ['required', 'numeric', 'min:50'],
			'gave_account'          => ['required', 'boolean'],
			'name'              => ['required', 'string', 'max:255'],
			'cancelled'      => ['boolean', 'nullable'],
			'return_deposit_amount' => ['numeric', 'nullable']
		]);

		DB::beginTransaction();

		try {
			$deposit_account = DepositAccount::findOrFail($id);
			$account = $deposit_account->account;

			if (!isset($validated['cancelled']) || $validated['cancelled'] === false) {

				$otherActive = $account->depositAccounts()
					->where('id', '!=', $deposit_account->id)
					->where('cancelled', false)
					->exists();

				if ($otherActive) {
					return null;
				}
			}


			$deposit_account->fill($validated);

			if ($validated['cancelled'] === true) {
				$deposit_account->cancelled_date = now();
			} else {
				$deposit_account->cancelled_date = null;
				$deposit_account->return_deposit_amount = 0;
			}

			$deposit_account->save();

			$account->updateIsDepositStatus();

			DB::commit();

			return 200;
		} catch (Exception $e) {
			DB::rollBack();

			Log::error(message: $e);
			return null;
		}
	}

	public function destroyDeposit($id)
	{
		DB::beginTransaction();

		try {
			$deposit_account = DepositAccount::findOrFail($id);
			$account = $deposit_account->account;

			// Then check if the account has any other return records left
			if ($account->depositAccounts()->count() < 2) {
				$account->is_deposit = false;
				$account->save();
			}
			// First delete the return account
			$deposit_account->delete();

			DB::commit();
			return 200;
		} catch (Exception $e) {
			DB::rollBack();
			Log::error(message: $e);
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
			Log::error(message: $e);

			return null;
        }
    }
}
