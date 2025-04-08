import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function LeadApproval({ leads }) {
    const handleReject = (leadId) => {
        if (confirm("Yakin ingin menolak lead ini?")) {
            router.post(route("leads.reject", leadId));
        }
    };

    const handleApprove = (leadId) => {
        if (confirm("Yakin ingin approve lead ini?")) {
            router.post(route("leads.approve", leadId));
        }
    };

    const goToPage = (url) => {
        if (url) router.visit(url);
    };

    // Jaga-jaga jika data belum ready
    if (!leads || !leads.data) {
        return <p className="text-center text-gray-500">Loading leads...</p>;
    }

    return (
        <>
            <h3 className="text-lg font-bold mb-4 text-center">
                Leads Menunggu Persetujuan
            </h3>

            {leads.data.length === 0 ? (
                <p className="text-gray-500 text-center">
                    Tidak ada lead yang menunggu.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-[800px] w-full text-center border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b p-2">Nama</th>
                                <th className="border-b p-2">Email</th>
                                <th className="border-b p-2">Produk</th>
                                <th className="border-b p-2">Telp</th>
                                <th className="border-b p-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.data.map((lead) => (
                                <tr key={lead.id}>
                                    <td className="border-b p-2">
                                        {lead.name}
                                    </td>
                                    <td className="border-b p-2">
                                        {lead.email}
                                    </td>
                                    <td className="border-b p-2">
                                        {lead.product?.name}
                                    </td>
                                    <td className="border-b p-2">
                                        {lead.phone ?? "Tidak ada"}
                                    </td>
                                    <td className="border-b p-2">
                                        <button
                                            onClick={() =>
                                                handleApprove(lead.id)
                                            }
                                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleReject(lead.id)
                                            }
                                            className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4 flex justify-center space-x-1 flex-wrap">
                        {leads.links?.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => goToPage(link.url)}
                                disabled={!link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 border rounded ${
                                    link.active
                                        ? "bg-purple-600 text-white"
                                        : "bg-white hover:bg-gray-100"
                                } ${
                                    !link.url &&
                                    "text-gray-400 cursor-not-allowed"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
