<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AccountCreateRequest;
use App\Http\Requests\AccountDepositRequest;
use App\Http\Requests\AccountEditRequest;
use App\Http\Requests\AccountReturnRequest;
use App\Http\Requests\AccountSoldRequest;
use App\Http\Resources\AccountResource;
use App\Models\Account;
use App\Services\AccountStatusService;
use App\Services\Contracts\AccountServiceInterface;
use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiAccountsController extends Controller
{

	public function __construct(protected AccountServiceInterface $accountService, protected AccountStatusService $accountStatusService) {}

	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request): JsonResponse
	{
		$get_accounts = $this->accountService->getAccounts($request);

		$accounts = AccountResource::collection($get_accounts->paginate(25)->appends($request->query()));

		return response()->json(compact('accounts'));
	}

	public function store(AccountCreateRequest $request): JsonResponse
	{
		$result = $this->accountService->create($request);

		if ($result['status'] === 200) {
			return ResponseService::success('Account created successfully', $result['data']);
		}

		if ($result['status'] === 422) {
			return ResponseService::validationError($result['data']);
		}

		return ResponseService::error('Something went wrong.', $result['data']);
	}

	public function sold(AccountSoldRequest $request, $id): JsonResponse
	{
		$result = $this->accountService->sold($request, $id);

		if ($result['status'] === 200) {
			return ResponseService::success('Sold Account created successfully', $result['data']);
		}

		if ($result['status'] === 422) {
			return ResponseService::validationError($result['data']);
		}

		return ResponseService::error('Something went wrong.', $result['data']);
	}

	public function return(AccountReturnRequest $request, $id): JsonResponse
	{
		$result = $this->accountStatusService->return($request, $id);
		if ($result['status'] === 200) {
			return ResponseService::success('Return Account created successfully', $result['data']);
		}

		if ($result['status'] === 422) {
			return ResponseService::validationError($result['data']);
		}

		return ResponseService::error('Something went wrong.', $result['data']);
	}

	public function edit_return(AccountReturnRequest $request, $id): JsonResponse
	{
		$result = $this->accountStatusService->editReturn($request, $id);

		if ($result['status'] === 200) {
			return ResponseService::success('Return Account updated successfully', $result['data']);
		}

		if ($result['status'] === 422) {
			return ResponseService::validationError($result['data']);
		}

		return ResponseService::error('Something went wrong.', $result['data']);
	}

	public function destroy_return(string $id): JsonResponse
	{
		$result = $this->accountStatusService->destroyReturn($id);

		if ($result['status'] === 200) {
			return ResponseService::success('Return Account deleted successfully', $result['data']);
		}

		if ($result['status'] === 422) {
			return ResponseService::validationError($result['data']);
		}

		return ResponseService::error('Something went wrong.', $result['data']);
	}

	public function deposit(AccountDepositRequest $request, $id): JsonResponse
	{
		$result = $this->accountStatusService->deposit($request, $id);

		if ($result['status'] === 200) {
			return ResponseService::success('Deposit Account created successfully', $result['data']);
		}

		if ($result['status'] === 422) {
			return ResponseService::validationError($result['data']);
		}

		return ResponseService::error('Something went wrong.', $result['data']);
	}

	public function edit_deposit(Request $request, $id): JsonResponse
	{
		$result = $this->accountStatusService->editDeposit($request, $id);

		if ($result['status'] === 200) {
			return ResponseService::success('Deposit Account edited successfully', $result['data']);
		}

		if ($result['status'] === 422) {
			return ResponseService::validationError($result['data']);
		}

		return ResponseService::error('Something went wrong.', $result['data']);
	}

	public function destroy_deposit(string $id): JsonResponse
	{
		$result = $this->accountStatusService->destroyDeposit($id);

		if ($result['status'] === 200) {
			return ResponseService::success('Deposit Account Deleted successfully', $result['data']);
		}

		if ($result['status'] === 422) {
			return ResponseService::validationError($result['data']);
		}

		return ResponseService::error('Something went wrong.', $result['data']);
	}

	/**
	 * Display the specified resource.
	 */
	public function show(string $id): JsonResponse
	{
		$get_account = Account::with([
			'returnedAccounts',
			'depositAccounts',
			'soldBy:id,name',
			'boughtBy:id,name',
		])->findOrFail($id);

		$account = new AccountResource($get_account)->resolve();

		return response()->json(compact('account'));
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(string $id): JsonResponse
	{
		$get_account = Account::with([
			'returnedAccounts',
			'depositAccounts',
			'soldBy:id,name',
			'boughtBy:id,name'
		])->findOrFail($id);

		$account = new AccountResource($get_account);

		return response()->json(compact('account'));
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(AccountEditRequest $request, string $id): JsonResponse
	{
		$result = $this->accountService->update($request, $id);

		if ($result['status'] === 200) {
			return ResponseService::success('Account Updated successfully', $result['data']);
		}

		if ($result['status'] === 422) {
			return ResponseService::validationError($result['data']);
		}

		return ResponseService::error('Something went wrong.', $result['data']);
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(string $id): JsonResponse
	{
		$account = Account::findOrFail($id);
		$account->delete();

		return ResponseService::success('Account Deleted successfully');
	}
}
