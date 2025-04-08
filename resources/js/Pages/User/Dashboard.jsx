import React from "react";
import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import { usePage } from "@inertiajs/react";
import { FaUserCog } from "react-icons/fa";

export default function UserDashboard() {
    const user = usePage().props.auth.user;
    const products = usePage().props.leads;
    return (
        <HomeLayout>
            <Head title="Dashboard" />
            <div className="py-24 px-4 sm:px-6 lg:px-8 bg-purple-600">
                <h1 className="text-2xl font-bold text-white mb-4">
                    User Dashboard
                </h1>
                <p className="text-lg text-white">
                    Selamat datang {user.name} 👋
                </p>
                <div className="mt-4">
                    <a href="/user/profile">
                        <button className="px-6 py-3 bg-white text-purple-600 rounded-full hover:bg-purple-100 flex items-center space-x-2">
                            <p>Edit Profile</p>
                            <FaUserCog />
                        </button>
                    </a>
                </div>
            </div>
            <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-white">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Produk Anda
                </h2>

                {products.length === 0 ? (
                    <p className="text-center text-gray-500">
                        Belum ada produk yang dibeli.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((lead) => (
                            <div
                                key={lead.id}
                                className="border rounded-lg p-4 shadow-md"
                            >
                                <h3 className="text-xl font-semibold text-purple-600 mb-2">
                                    {lead.product?.name ??
                                        "Produk tidak tersedia"}
                                </h3>

                                <p className="text-gray-600">
                                    Nama:{" "}
                                    <span className="capitalize">
                                        {lead.name}
                                    </span>
                                </p>
                                <p className="text-gray-600">
                                    Email:{" "}
                                    <span className="underline">
                                        {lead.email}
                                    </span>
                                </p>
                                <p className="text-gray-600">
                                    Telp: <span>{lead.phone}</span>
                                </p>
                                <p className="text-gray-600">
                                    Alamat: <span>{lead.address}</span>
                                </p>
                                <p className="text-gray-600">
                                    Tanggal Pemesanan:{" "}
                                    {new Date(
                                        lead.created_at
                                    ).toLocaleDateString()}
                                </p>

                                <p className="text-gray-700 font-bold text-lg">
                                    Status:{" "}
                                    <span className="capitalize">
                                        {lead.status === "pending" ? (
                                            <span className="text-yellow-600">
                                                Pending
                                            </span>
                                        ) : lead.status === "approved" ? (
                                            <span className="text-green-600">
                                                Aktif
                                            </span>
                                        ) : lead.status === "rejected" ? (
                                            <span className="text-red-600">
                                                Ditolak
                                            </span>
                                        ) : (
                                            <span className="text-gray-600">
                                                Unknown
                                            </span>
                                        )}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </HomeLayout>
    );
}
