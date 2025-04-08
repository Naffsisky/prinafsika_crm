<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lead;
use Inertia\Inertia;
use App\Models\Customer;

class DashboardController extends Controller
{
    public function index()
    {
        $leads = Lead::where('status', 'pending')
            ->with('product')
            ->paginate(5);
        $totalRevenue = Customer::with('product')->get()->sum(function ($customer) {
            return $customer->product->price ?? 0;
        });

        $stats = [
            'totalLeads' => Lead::count(),
            'pendingLeads' => Lead::where('status', 'pending')->count(),
            'approvedLeads' => Lead::where('status', 'approved')->count(),
            'rejectedLeads' => Lead::where('status', 'rejected')->count(),
            'totalCustomers' => Customer::count(),
            'totalUsers' => \App\Models\User::count(),
            'totalRevenue' => $totalRevenue,
        ];

        $revenueByProduct = Customer::with('product')
            ->get()
            ->groupBy(fn($customer) => $customer->product->name ?? 'Unknown')
            ->map(function ($customers, $productName) {
                return [
                    'name' => $productName,
                    'total' => $customers->sum(fn($c) => $c->product->price ?? 0),
                ];
            })
            ->values();

        return Inertia::render('Dashboard', [
            'leads' => $leads,
            'stats' => $stats,
            'revenueChart' => $revenueByProduct,
        ]);
    }
}
