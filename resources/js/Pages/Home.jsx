import HomeLayout from "@/Layouts/HomeLayout";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { usePage, router, Head } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";

function Home() {
    const { latestProducts, allProducts } = usePage().props;
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const { auth } = usePage().props;

    const [lead, setLead] = useState({
        name: auth.user?.name || "",
        email: auth.user?.email || "",
        phone: "",
        address: "",
        product_id: null,
    });

    const submitLead = (e) => {
        e.preventDefault();

        router.post(
            route("user.leads.store"),
            {
                ...lead,
                product_id: selectedProduct.id,
            },
            {
                onSuccess: () => {
                    toast.success("Successfully ordered!");
                    setLead({
                        name: auth.user?.name || "",
                        email: auth.user?.email || "",
                        phone: "",
                        address: "",
                        product_id: null,
                    });
                    setSelectedProduct(null);
                    setShowForm(false);
                    closeForm();
                },
            }
        );
    };

    const handleBuyClick = (product) => {
        if (!auth.user) {
            toast.error("Please login to continue!");
            return;
        }

        if (auth.user.role !== "user") {
            toast.error("You are not authorized to buy this product!");
            return;
        }

        setSelectedProduct(product);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setSelectedProduct(null);
    };

    const displayedProducts = showAll ? allProducts : allProducts.slice(0, 6);

    return (
        <HomeLayout>
            <Head title="Home" />
            <Toaster position="top-center" reverseOrder={false} />
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-purple-600">
                <h1 className="text-4xl font-bold text-white mb-4">
                    Selamat Datang di Smart ISP
                </h1>
                <p className="text-lg text-white mb-8">
                    Layanan Internet Terbaik untuk Anda ⚡️
                </p>
                <a
                    href={
                        auth.user && auth.user.role === "user"
                            ? "/user/dashboard"
                            : "/#products"
                    }
                >
                    <button className="px-6 py-3 bg-white text-purple-600 rounded-full hover:bg-purple-100 flex items-center space-x-2">
                        <p>Lihat Produk</p>
                        <FaArrowRight />
                    </button>
                </a>
            </section>

            <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Hot Product 🔥
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latestProducts && latestProducts.length > 0 ? (
                        latestProducts.map((product) => (
                            <div
                                key={product.id}
                                className="border rounded-lg shadow-md p-4"
                            >
                                <h3 className="text-xl font-semibold mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    {product.description} ⚡️
                                </p>
                                <p className="text-lg font-bold">
                                    Rp {product.price.toLocaleString("id-ID")}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
                            <p className="text-lg font-semibold text-gray-700">
                                Belum ada produk terbaru yang tersedia.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section
                className="py-24 px-4 sm:px-6 lg:px-8 bg-purple-600 scroll-offset"
                id="about"
            >
                <h2 className="text-3xl font-bold mb-6 text-white">
                    Tentang Project 💼
                </h2>
                <p className="text-lg text-white mb-4 text-justify">
                    PT. Smart merupakan perusahaan Internet Service Provider
                    (ISP) yang memiliki banyak customer. Melihat dari
                    operasional yang saat ini sedang berjalan, perusahaan
                    tersebut tergolong perusahaan yang masih semi konvensional
                    dikarenakan beberapa pekerjaan masih belum paperless.
                </p>
                <p className="text-lg text-white text-justify">
                    Divisi sales masih melakukan rekap data calon customer
                    (lead), customer, produk (layanan internet), dan penjualan
                    secara manual. Oleh karena itu, buatlah aplikasi website
                    Customer Relationship Management sederhana yang bisa
                    membantu PT. Smart khususnya divisi sales untuk memudahkan
                    pekerjaan mereka.
                </p>
            </section>

            <section
                className="py-24 px-4 sm:px-6 lg:px-8 bg-white"
                id="products"
            >
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Produk Kami 🌐
                </h2>
                <p className="text-lg text-gray-700 mb-4 text-center">
                    Kami menawarkan berbagai produk layanan internet yang sesuai
                    dengan kebutuhan Anda.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allProducts && displayedProducts.length > 0 ? (
                        displayedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="border rounded-lg shadow-md p-4"
                            >
                                <h3 className="text-xl font-semibold mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    {product.description} ⚡️
                                </p>
                                <p className="text-lg font-bold">
                                    Rp {product.price.toLocaleString("id-ID")}
                                </p>
                                <div className="mt-4 text-right">
                                    <button
                                        onClick={() => handleBuyClick(product)}
                                        className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                                    >
                                        Buy Now ⭐️
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
                            <p className="text-lg font-semibold text-gray-700">
                                Belum ada produk terbaru yang tersedia.
                            </p>
                        </div>
                    )}
                </div>
                {allProducts.length > 6 && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                        >
                            {showAll
                                ? "Tampilkan Lebih Sedikit"
                                : "Lihat Semua Produk"}
                        </button>
                    </div>
                )}
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                                onClick={closeForm}
                            >
                                <IoClose size={32} />
                            </button>
                            <h2 className="text-xl font-bold mb-4">
                                Formulir Pembelian
                            </h2>
                            <form onSubmit={submitLead}>
                                <input
                                    type="hidden"
                                    value={selectedProduct?.id}
                                    name="product_id"
                                />
                                <input
                                    type="text"
                                    placeholder="Nama"
                                    required
                                    className="border p-2 w-full mb-3"
                                    value={lead.name}
                                    onChange={(e) =>
                                        setLead({
                                            ...lead,
                                            name: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    className="border p-2 w-full mb-3"
                                    value={lead.email}
                                    onChange={(e) =>
                                        setLead({
                                            ...lead,
                                            email: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="No. HP"
                                    required
                                    className="border p-2 w-full mb-3"
                                    value={lead.phone}
                                    onChange={(e) =>
                                        setLead({
                                            ...lead,
                                            phone: e.target.value,
                                        })
                                    }
                                />
                                <textarea
                                    placeholder="Alamat"
                                    required
                                    className="border p-2 w-full mb-3"
                                    value={lead.address}
                                    onChange={(e) =>
                                        setLead({
                                            ...lead,
                                            address: e.target.value,
                                        })
                                    }
                                />
                                <button
                                    type="submit"
                                    className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700"
                                >
                                    Kirim
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </HomeLayout>
    );
}

export default Home;
