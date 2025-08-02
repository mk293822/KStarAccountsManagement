<?php

namespace App\Services\Contracts;

use App\Http\Requests\AccountDepositRequest;
use App\Http\Requests\AccountReturnRequest;
use Illuminate\Http\Request;

interface AccountStatusServiceInterface {

	public function deposit(AccountDepositRequest $request, $id);
	public function editDeposit(Request $request, $id);
	public function destroyDeposit($id);

	public function return(AccountReturnRequest $request, $id);
	public function editReturn(AccountReturnRequest $request, $id);
	public function destroyReturn($id);
}
