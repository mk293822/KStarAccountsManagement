<?php

namespace App\Http\Controllers;

use App\Http\Resources\AccountResource;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class MonthlyReportController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request)
	{
		$currentYear = Carbon::now()->year;
		$currentMonth = Carbon::now()->month;

		// Base Queries
		$accountsQuery = Account::whereYear('bought_date', $currentYear)
			->whereMonth('bought_date', $currentMonth);

		$depositsQuery = (clone $accountsQuery)->get()
			->filter(fn($acc) => $acc->depositAccounts->isNotEmpty())
			->flatMap(fn($acc) => $acc->depositAccounts);

		$returnsQuery =  (clone $accountsQuery)->get()
			->filter(fn($acc) => $acc->returnedAccounts->isNotEmpty())
			->flatMap(fn($acc) => $acc->returnedAccounts);

		// Accounts Paginated
		$accounts = AccountResource::collection(
			(clone $accountsQuery)->paginate(25)->appends($request->query())
		);

		// Summary Stats
		$total_bought_accounts = (clone $accountsQuery)->count();
		$total_sold_accounts = (clone $accountsQuery)->where('is_sold', true)->count();

		$total_bought_price = (clone $accountsQuery)->sum('bought_price');
		$total_sold_price = (clone $accountsQuery)->where('is_sold', true)->sum('sold_price');

		// Deposits and Returns
		$total_deposits = (clone $depositsQuery)->count();
		$total_deposit_amount = (clone $depositsQuery)->sum('deposit_amount');

		$total_return_deposits = (clone $depositsQuery)->where('return_deposit_amount',  '>', 0)->count();
		$total_return_deposit_amount = (clone $depositsQuery)->sum('return_deposit_amount');

		$total_returns = (clone $returnsQuery)->count();
		$total_return_amount = (clone $returnsQuery)->sum('sold_price') - (clone $returnsQuery)->sum('return_price');

		return Inertia::render('monthly-report/index', compact(
			'accounts',
			'total_bought_accounts',
			'total_sold_accounts',
			'total_bought_price',
			'total_sold_price',
			'total_deposits',
			'total_deposit_amount',
			'total_return_deposit_amount',
			'total_return_deposits',
			'total_returns',
			'total_return_amount'
		));
	}
}
