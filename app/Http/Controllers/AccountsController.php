<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountResource;
use App\Models\Account;
use App\Services\AccountService;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

        return Inertia::render('accounts/index', compact('accounts'))->with('ziggy', [
            'query' => $request->query()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
