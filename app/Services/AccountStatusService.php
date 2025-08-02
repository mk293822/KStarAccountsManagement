<?php

namespace App\Services;

use App\Http\Requests\AccountDepositRequest;
use App\Http\Requests\AccountReturnRequest;
use App\Models\Account;
use App\Models\DepositAccount;
use App\Models\ReturnedAccount;
use App\Services\Contracts\AccountStatusServiceInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AccountStatusService implements AccountStatusServiceInterface
{
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

			return [
				"data" => $account,
				"status" => 200
			];
		} catch (ValidationException $e) {
			DB::rollback();
			ResponseService::serviceError($e, 422);
		} catch (Exception $e) {
			DB::rollBack();
			ResponseService::serviceError($e);
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

			return [
				"data" => $account,
				"status" => 200
			];
		} catch (ValidationException $e) {
			DB::rollback();
			ResponseService::serviceError($e, 422);
		} catch (Exception $e) {
			DB::rollBack();
			ResponseService::serviceError($e);
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
			return [
				"data" => $account,
				"status" => 200
			];
		} catch (ValidationException $e) {
			DB::rollback();
			ResponseService::serviceError($e, 422);
		} catch (Exception $e) {
			DB::rollBack();
			ResponseService::serviceError($e);
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

			return [
				"data" => $account,
				"status" => 200
			];
		} catch (ValidationException $e) {
			DB::rollback();
			ResponseService::serviceError($e, 422);
		} catch (Exception $e) {
			DB::rollBack();
			ResponseService::serviceError($e);
		}
	}

	public function editDeposit(Request $request, $id)
	{
		try {
			$validated = $request->validate([
				'deposit_date'               => ['required', 'date', 'date_format:Y-m-d'],
				'deposit_amount'              => ['required', 'numeric', 'min:50'],
				'gave_account'          => ['required', 'boolean'],
				'name'              => ['required', 'string', 'max:255'],
				'cancelled'      => ['boolean', 'nullable'],
				'return_deposit_amount' => ['numeric', 'nullable']
			]);

			DB::beginTransaction();

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
				$deposit_account->gave_account = false;
			} else {
				$deposit_account->cancelled_date = null;
				$deposit_account->return_deposit_amount = 0;
			}

			$deposit_account->save();

			$account->updateIsDepositStatus();

			DB::commit();

			return [
				"data" => $account,
				"status" => 200
			];
		} catch (ValidationException $e) {
			DB::rollback();
			ResponseService::serviceError($e, 422);
		} catch (Exception $e) {
			DB::rollBack();
			ResponseService::serviceError($e);
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
			return [
				"data" => $account,
				"status" => 200
			];
		} catch (ValidationException $e) {
			DB::rollback();
			ResponseService::serviceError($e, 422);
		} catch (Exception $e) {
			DB::rollBack();
			ResponseService::serviceError($e);
		}
	}
}
