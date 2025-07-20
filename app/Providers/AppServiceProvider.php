<?php

namespace App\Providers;

use App\Services\AccountService;
use App\Services\Contracts\AccountServiceInterface;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
		$this->app->singleton(AccountServiceInterface::class, AccountService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
		// if (app()->environment('production')) {
		// 	URL::forceScheme('https');
		// }
	}
}
