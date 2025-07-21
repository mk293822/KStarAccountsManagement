<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccountCreateRequest;
use App\Http\Requests\AccountDepositRequest;
use App\Http\Requests\AccountEditRequest;
use App\Http\Requests\AccountReturnRequest;
use App\Http\Requests\AccountSoldRequest;
use App\Http\Resources\AccountResource;
use App\Models\Account;
use App\Models\ReturnedAccount;
use App\Services\Contracts\AccountServiceInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountsController extends Controller
{

	public function __construct(protected AccountServiceInterface $accountService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $get_accounts = $this->accountService->getAccounts($request);

		$accounts = AccountResource::collection($get_accounts->paginate(25)->appends($request->query()));

		return Inertia::render('accounts/index', compact('accounts'));
    }

    public function create()
    {
        return Inertia::render('accounts/create');
    }

	public function store(AccountCreateRequest $request)
	{
		$account_create = $this->accountService->create($request);

		if ($account_create === 200) {
			return back()->with('success', 'Account created successfully!');
		} else {
			return back()->withErrors('Failed to create account. Please check your input and try again.');
		}
	}

	public function sold(AccountSoldRequest $request, $id)
	{
		$account_sold = $this->accountService->sold($request, $id);

		if ($account_sold === 200) {
			return back()->with('success', 'Account marked as sold successfully!');
		} else {
			return back()->withErrors('Failed to mark account as sold. Please try again.');
		}
	}

	public function return(AccountReturnRequest $request, $id)
	{
		$account_return = $this->accountService->return($request, $id);

		if ($account_return === 200) {
			return back()->with('success', 'Account returned successfully!');
		} else {
			return back()->withErrors('Failed to return account. Please check the form and try again.');
		}
	}

	public function edit_return(AccountReturnRequest $request, $id)
	{
		$account_return = $this->accountService->editReturn($request, $id);

		if ($account_return === 200) {
			return back()->with('success', 'Account return edited successfully!');
		} else {
			return back()->withErrors('Failed to edit return account. Please check the form and try again.');
		}
	}

	public function destroy_return(string $id)
	{
		$account_return = $this->accountService->destroyReturn($id);

		if ($account_return === 200) {
			return response()->json(['message' => 'Deleted'], 200);
		} else {
			return response()->json(['message' => 'Something went wrong!'], 500);
		}
	}

	public function deposit(AccountDepositRequest $request, $id)
	{
		$account_deposit = $this->accountService->deposit($request, $id);

		if ($account_deposit === 200) {
			return back()->with('success', 'Deposit recorded successfully!');
		} else {
			return back()->withErrors('Failed to record deposit. Please check the input and try again.');
		}
	}

	public function edit_deposit(Request $request, $id)
	{
		$account_return = $this->accountService->editDeposit($request, $id);

		if ($account_return === 200) {
			return back()->with('success', 'Account deposi edited successfully!');
		} else {
			return back()->withErrors('Failed to edit deposit account. Please check the form and try again.');
		}
	}

	public function destroy_deposit(string $id)
	{
		$account_return = $this->accountService->destroyDeposit($id);

		if ($account_return === 200) {
			return response()->json(['message' => 'Deleted'], 200);
		} else {
			return response()->json(['message' => 'Something went wrong!'], 500);
		}
	}

	/**
	 * Display the specified resource.
	 */
    public function show(string $id)
    {
        $get_account = Account::with([
			'returnedAccounts',
			'depositAccounts',
            'soldBy:id,name',
            'boughtBy:id,name',
        ])->findOrFail($id);

		$account = new AccountResource($get_account)->resolve();

		return Inertia::render('accounts/show', compact('account'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $get_account = Account::with([
			'returnedAccounts',
			'depositAccounts',
            'soldBy:id,name',
			'boughtBy:id,name'
        ])->findOrFail($id);

        $account = new AccountResource($get_account);

        return Inertia::render('accounts/edit', compact('account'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AccountEditRequest $request, string $id)
    {
        $account_return = $this->accountService->update($request, $id);

        if ($account_return === 200) {
            return back()->with('success', 'Account Updated successfully!');
        } else {
            return back()->withErrors('Something went wrong. Please try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $account = Account::findOrFail($id);
        $account->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }
}
