<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lead;
use App\Models\Customer;

class LeadController extends Controller
{

    public function index()
    {
        $leads = Lead::where('created_by', auth()->id())->get();
        return view('leads.index', compact('leads'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'product_id' => 'required|exists:products,id',
        ]);

        Lead::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'status' => 'pending',
            'created_by' => auth()->id(),
            'product_id' => $request->product_id,
        ]);

        return back()->with('success', 'Berhasil mengajukan pembelian');
    }

    public function approve(Lead $lead)
    {
        $lead->update(['status' => 'approved']);

        Customer::create([
            'name' => $lead->name,
            'email' => $lead->email,
            'phone' => $lead->phone,
            'address' => $lead->address,
            'product_id' => $lead->product_id,
            'lead_id' => $lead->id,
            'status' => 'active',
            'created_by' => auth()->id(),
        ]);

        return back()->with('success', 'Lead approved dan menjadi customer aktif.');
    }

    public function reject(Request $request, Lead $lead)
    {
        if ($lead->status !== 'pending') {
            return back()->with('error', 'Lead sudah diproses.');
        }

        $lead->update([
            'status' => 'rejected',
            // 'rejection_reason' => $request->input('reason'),
        ]);

        return back()->with('success', 'Lead berhasil ditolak.');
    }
}
