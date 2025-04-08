import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

export default function Index({ customers }) {
    console.log(customers);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Customers
                </h2>
            }
        >
            <Head title="Customers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 overflow-auto">
                            <table className="min-w-[800px] w-full table-auto border text-center">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-2 border">No</th>
                                        <th className="p-2 border">Name</th>
                                        <th className="p-2 border">Email</th>
                                        <th className="p-2 border">Phone</th>
                                        <th className="p-2 border">Address</th>
                                        <th className="p-2 border">Product</th>
                                        <th className="p-2 border">Harga</th>
                                        <th className="p-2 border">
                                            Berlangganan
                                        </th>
                                        <th className="p-2 border">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.data.map((c, index) => (
                                        <tr key={c.id} className="text-sm">
                                            <td className="p-2 border">
                                                {customers.from + index}
                                            </td>
                                            <td className="p-2 border">
                                                {c.name}
                                            </td>
                                            <td className="p-2 border">
                                                {c.email}
                                            </td>
                                            <td className="p-2 border">
                                                {c.phone}
                                            </td>
                                            <td className="p-2 border">
                                                {c.address}
                                            </td>
                                            <td className="p-2 border">
                                                {c.product?.name || "-"}
                                            </td>
                                            <td className="p-2 border">
                                                {c.product?.price.toLocaleString(
                                                    "id-ID"
                                                ) || "-"}
                                            </td>
                                            <td className="p-2 border">
                                                {c.product?.updated_at ? (
                                                    new Date(
                                                        c.product.updated_at
                                                    )
                                                        .toLocaleDateString(
                                                            "id-ID",
                                                            {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            }
                                                        )
                                                        .replace(/\//g, "-")
                                                ) : (
                                                    <span className="text-gray-500">
                                                        -
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-2 border capitalize">
                                                {c.status || "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {customers.length === 0 && (
                                <p className="text-gray-600 mt-4">
                                    Belum ada customer.
                                </p>
                            )}
                            <div className="mt-4 flex justify-center space-x-2">
                                {customers.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url && router.visit(link.url)
                                        }
                                        className={`px-3 py-1 rounded ${
                                            link.active
                                                ? "bg-purple-700 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
