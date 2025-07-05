<?php

use App\Http\Controllers\AccountsController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // Accounts
    Route::get('accounts', [AccountsController::class, 'index'])->name('accounts');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
