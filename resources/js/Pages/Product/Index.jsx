import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Index({ products }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const { data, setData, post, reset } = useForm({
        name: "",
        description: "",
        price: "",
    });

    const {
        data: editData,
        setData: setEditData,
        put,
    } = useForm({
        name: "",
        description: "",
        price: "",
    });

    const submit = (e) => {
        e.preventDefault();
        toast.success("Produk berhasil ditambahkan!");
        post("/products", {
            onSuccess: () => {
                setData({
                    name: "",
                    description: "",
                    price: "",
                });
            },
        });
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setEditData({
            name: product.name,
            description: product.description,
            price: product.price,
        });
        setShowEditModal(true);
    };

    const submitEdit = (e) => {
        e.preventDefault();
        put(`/products/${editingProduct.id}`, {
            preserveScroll: true,
            onSuccess: () => setShowEditModal(false),
        });
        toast.success("Produk berhasil diperbarui!");
    };

    const deleteProduct = (id) => {
        if (confirm("Yakin ingin menghapus produk ini?")) {
            router.delete(`/products/${id}`, {
                onSuccess: () => {
                    toast.success("Produk berhasil dihapus!");
                },
                onError: (errors) => {
                    toast.error(
                        errors?.message ||
                            "Gagal menghapus produk. Mungkin produk masih digunakan oleh customer."
                    );
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">Product</h2>
            }
        >
            <Head title="Products" />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Produk Layanan Internet
                </h1>

                <div className="p-6 max-w-3xl bg-white mx-auto rounded-lg shadow-md">
                    <form onSubmit={submit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nama Produk"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="border p-2 w-full rounded-lg"
                        />
                        <textarea
                            placeholder="Deskripsi"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="border p-2 w-full rounded-lg"
                        />
                        <input
                            type="number"
                            placeholder="Harga"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            className="border p-2 w-full rounded-lg"
                        />
                        <button className="bg-purple-600 rounded-lg text-white px-4 py-2">
                            Tambah Produk
                        </button>
                    </form>
                </div>

                <div className="mt-8 max-w-3xl mx-auto">
                    <div className="bg-white shadow-md sm:rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            Daftar Produk
                        </h2>
                        <ul className="mt-8 space-y-4">
                            {products.data.map((p) => (
                                <li
                                    key={p.id}
                                    className="border p-4 rounded-lg bg-purple-600 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-lg break-words">
                                            {p.name}
                                        </div>
                                        <p className="break-words">
                                            {p.description}
                                        </p>
                                        <div className="text-sm mt-1">
                                            Rp {p.price.toLocaleString("id-ID")}
                                        </div>
                                    </div>
                                    <div className="space-x-2 flex-shrink-0 flex items-center">
                                        <button
                                            onClick={() => openEditModal(p)}
                                            className="px-3 py-1 bg-yellow-500 rounded hover:bg-yellow-600 whitespace-nowrap"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteProduct(p.id)}
                                            className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 whitespace-nowrap"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4 flex justify-center space-x-2">
                        {products.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() =>
                                    link.url && router.visit(link.url)
                                }
                                className={`px-3 py-1 rounded ${
                                    link.active
                                        ? "bg-purple-700 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-bold mb-4">Edit Produk</h2>
                    <form onSubmit={submitEdit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nama Produk"
                            value={editData.name}
                            onChange={(e) =>
                                setEditData("name", e.target.value)
                            }
                            className="border p-2 w-full rounded-lg"
                        />
                        <textarea
                            placeholder="Deskripsi"
                            value={editData.description}
                            onChange={(e) =>
                                setEditData("description", e.target.value)
                            }
                            className="border p-2 w-full rounded-lg"
                        />
                        <input
                            type="number"
                            placeholder="Harga"
                            value={editData.price}
                            onChange={(e) =>
                                setEditData("price", e.target.value)
                            }
                            className="border p-2 w-full rounded-lg"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
