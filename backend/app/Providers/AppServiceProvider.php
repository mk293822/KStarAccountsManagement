<?php

namespace App\Providers;

use App\Services\AccountService;
use App\Services\AccountStatusService;
use App\Services\Contracts\AccountServiceInterface;
use App\Services\Contracts\AccountStatusServiceInterface;
use Illuminate\Http\Response;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
		$this->app->singleton(AccountServiceInterface::class, AccountService::class);
		$this->app->singleton(AccountStatusServiceInterface::class, AccountStatusService::class);
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
