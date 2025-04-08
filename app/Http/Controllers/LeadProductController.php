<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lead;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LeadProductController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $leads = Lead::with('product')
            ->where('created_by', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('User/Dashboard', [
            'user' => $user,
            'leads' => $leads,
        ]);
    }
}
