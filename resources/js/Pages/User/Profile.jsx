import React from "react";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import toast, { Toaster } from "react-hot-toast";

export default function Profile({ auth }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    const { post } = useForm();

    const logout = () => {
        post(route("logout"));
        toast.success("Logout successfully!");
    };

    const submit = (e) => {
        e.preventDefault();
        patch(route("user.profile.update"));
        toast.success("Profile updated successfully!");
    };

    return (
        <HomeLayout>
            <Head title="Profile" />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="min-h-screen max-w-md mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-xl font-bold mb-4">Profil Saya</h1>
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label>Nama</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="border p-2 w-full"
                            />
                            {errors.name && (
                                <p className="text-red-500">{errors.name}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label>Email</label>
                            <input
                                type="email"
                                value={data.email}
                                disabled
                                className="border p-2 w-full bg-gray-100"
                            />
                            <small className="text-gray-500">
                                Email tidak dapat diubah.
                            </small>
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Simpan
                            </button>

                            <button
                                type="button"
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            >
                                Logout
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}
