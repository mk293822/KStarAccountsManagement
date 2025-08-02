<?php

use App\Http\Controllers\Api\ApiAccountsController;
use App\Http\Controllers\Api\ApiApiAccountsController;
use App\Http\Controllers\Api\Auth\ApiAuthenticatedSessionController;
use App\Http\Controllers\Api\Auth\ApiRegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::middleware("guest")->group(function() {
	Route::post('/login', [ApiAuthenticatedSessionController::class, "store"])->name('api.login');
	Route::post('/register', [ApiRegisteredUserController::class, "store"])->name('api.register');
});

Route::middleware("auth:sanctum")->group(function(){
	// Auth
	Route::get('/user', [ApiRegisteredUserController::class, 'getUser'])->name('api.user');
	Route::post('logout', [ApiAuthenticatedSessionController::class, 'destroy'])
		->name('api.logout');

	Route::get('accounts', [ApiAccountsController::class, 'index'])->name('api.accounts');
	Route::post('accounts/store', [ApiAccountsController::class, 'store'])->name('api.account.store');
	Route::get('accounts/create', [ApiAccountsController::class, 'create'])->name('api.account.create');
	Route::get('accounts/{id}', [ApiAccountsController::class, 'show'])->name('api.account.show');
	Route::post('accounts/update/{id}', [ApiAccountsController::class, 'update'])->name('api.account.update');
	Route::post('accounts/sold/{id}', [ApiAccountsController::class, 'sold'])->name('api.account.sold');
	Route::get('accounts/edit/{id}', [ApiAccountsController::class, 'edit'])->name('api.account.edit');
	Route::delete('accounts/destroy/{id}', [ApiAccountsController::class, 'destroy'])->name('api.account.destroy');

	Route::post('accounts/return/{id}', [ApiAccountsController::class, 'return'])->name('api.account.return');
	Route::post('accounts/edit_return/{id}', [ApiAccountsController::class, 'edit_return'])->name('api.account.edit_return');
	Route::delete('accounts/destroy_return/{id}', [ApiAccountsController::class, 'destroy_return'])->name('api.account.destroy_return');

	Route::post('accounts/deposit/{id}', [ApiAccountsController::class, 'deposit'])->name('api.account.deposit');
	Route::post('accounts/edit_deposit/{id}', [ApiAccountsController::class, 'edit_deposit'])->name('api.account.edit_deposit');
	Route::delete('accounts/destroy_deposit/{id}', [ApiAccountsController::class, 'destroy_deposit'])->name('api.account.destroy_deposit');
});
