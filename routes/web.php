<?php

use App\Http\Controllers\AccountsController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', 'dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // Accounts
    Route::get('accounts', [AccountsController::class, 'index'])->name('accounts');
    Route::get('accounts/{id}', [AccountsController::class, 'show'])->name('account.show');
    Route::post('accounts/create', [AccountsController::class, 'create'])->name('account.create');
    Route::get('accounts/edit/{id}', [AccountsController::class, 'edit'])->name('account.edit');
    Route::post('accounts/update/{id}', [AccountsController::class, 'update'])->name('account.update');
    Route::post('accounts/sold/{id}', [AccountsController::class, 'sold'])->name('account.sold');
    Route::post('accounts/return/{id}', [AccountsController::class, 'return'])->name('account.return');
    Route::post('accounts/deposit/{id}', [AccountsController::class, 'deposit'])->name('account.deposit');
    Route::delete('accounts/destroy/{id}', [AccountsController::class, 'destroy'])->name('account.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
