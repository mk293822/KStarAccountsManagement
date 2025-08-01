<?php

use App\Http\Controllers\AccountsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MonthlyReportController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', 'dashboard')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

	// Accounts routes
	Route::get('accounts', [AccountsController::class, 'index'])->name('accounts');
    Route::post('accounts/store', [AccountsController::class, 'store'])->name('account.store');
    Route::get('accounts/create', [AccountsController::class, 'create'])->name('account.create');
    Route::get('accounts/{id}', [AccountsController::class, 'show'])->name('account.show');
    Route::post('accounts/update/{id}', [AccountsController::class, 'update'])->name('account.update');
    Route::post('accounts/sold/{id}', [AccountsController::class, 'sold'])->name('account.sold');
	Route::get('accounts/edit/{id}', [AccountsController::class, 'edit'])->name('account.edit');
	Route::delete('accounts/destroy/{id}', [AccountsController::class, 'destroy'])->name('account.destroy');

	Route::post('accounts/return/{id}', [AccountsController::class, 'return'])->name('account.return');
	Route::post('accounts/edit_return/{id}', [AccountsController::class, 'edit_return'])->name('account.edit_return');
	Route::delete('accounts/destroy_return/{id}', [AccountsController::class, 'destroy_return'])->name('account.destroy_return');

	Route::post('accounts/deposit/{id}', [AccountsController::class, 'deposit'])->name('account.deposit');
	Route::post('accounts/edit_deposit/{id}', [AccountsController::class, 'edit_deposit'])->name('account.edit_deposit');
	Route::delete('accounts/destroy_deposit/{id}', [AccountsController::class, 'destroy_deposit'])->name('account.destroy_deposit');

	// Monthly Report Routes
	Route::get('monthly-report', [MonthlyReportController::class, 'index'])->name('monthly_report');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
