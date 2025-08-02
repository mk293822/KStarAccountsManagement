<?php

namespace App\Services\Contracts;

use App\Http\Requests\AccountCreateRequest;
use App\Http\Requests\AccountEditRequest;

use App\Http\Requests\AccountSoldRequest;
use Illuminate\Http\Request;

interface AccountServiceInterface {

	public function getAccounts(Request $request);
	public function create(AccountCreateRequest $request);
	public function update(AccountEditRequest $request, $id);
	public function sold(AccountSoldRequest $request, $id);
}
