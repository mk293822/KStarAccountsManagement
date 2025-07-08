<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccountCreateRequest;
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

        $accounts = AccountResource::collection($get_accounts->paginate(20)->appends($request->query()));
        $query = $request->query();

        return Inertia::render('accounts/index', compact('accounts', 'query'));
    }

    public function create(AccountCreateRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            Account::create($validated);

            DB::commit();

            return back()->with('success', 'Account created successfully!');
        } catch (Exception $e) {
            DB::rollBack();

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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
