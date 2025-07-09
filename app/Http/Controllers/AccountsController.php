<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccountCreateRequest;
use App\Http\Requests\AccountDepositRequest;
use App\Http\Requests\AccountEditRequest;
use App\Http\Requests\AccountReturnRequest;
use App\Http\Requests\AccountSoldRequest;
use App\Http\Resources\AccountResource;
use App\Models\Account;
use App\Services\AccountService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use IntlChar;

class AccountsController extends Controller
{

    public $accountService;

    public function __construct(AccountService $account_service)
    {
        $this->accountService = $account_service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $get_accounts = $this->accountService->getAccounts($request);

        $accounts = AccountResource::collection($get_accounts->paginate(25)->appends($request->query()));
        $query = $request->query();

        return Inertia::render('accounts/index', compact('accounts', 'query'));
    }


    public function create(AccountCreateRequest $request)
    {
        $account_create = $this->accountService->create($request);

        if ($account_create === 200) {
            return back()->with('success', 'Account created successfully!');
        } else {
            return back()->withErrors('Something went wrong. Please try again.');
        }
    }

    public function sold(AccountSoldRequest $request, $id)
    {
        $account_sold = $this->accountService->sold($request, $id);

        if ($account_sold === 200) {
            return back()->with('success', 'Account Updated successfully!');
        } else {
            return back()->withErrors('Something went wrong. Please try again.');
        }
    }

    public function return(AccountReturnRequest $request, $id)
    {
        $account_return = $this->accountService->return($request, $id);

        if ($account_return === 200) {
            return back()->with('success', 'Account Return successfully!');
        } else {
            return back()->withErrors('Something went wrong. Please try again.');
        }
    }

    public function deposit(AccountDepositRequest $request, $id)
    {
        $account_return = $this->accountService->deposit($request, $id);

        if ($account_return === 200) {
            return back()->with('success', 'Account Return successfully!');
        } else {
            return back()->withErrors('Something went wrong. Please try again.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $get_account = Account::with([
            'returnedAccount',
            'depositAccount',
            'soldBy:id,name',
            'boughtBy:id,name',
        ])->findOrFail($id);

        $account = new AccountResource($get_account);

        return Inertia::render('accounts/show', compact('account'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $get_account = Account::with([
            'returnedAccount',
            'depositAccount',
            'soldBy:id,name',
            'boughtBy:id,name',
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
            return back()->with('success', 'Account Update successfully!');
        } else {
            return back()->withErrors('Something went wrong. Please try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
