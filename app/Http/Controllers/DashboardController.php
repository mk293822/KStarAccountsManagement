<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public $dashboardService;

    public function __construct(DashboardService $dashboard_service)
    {
        $this->dashboardService = $dashboard_service;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $period = $request->input('period', 'daily');
        $accounts = $this->dashboardService->getAccounts($period);

        return Inertia::render('dashboard', compact('accounts', 'period'));
    }
}
