import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import LeadApproval from "@/Components/LeadApproval";
import LeadsChart from "@/Components/LeadsChart";
import StatCards from "@/Components/StatCards";

export default function Dashboard({ leads, stats }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="px-4">
                        <StatCards stats={stats} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <LeadsChart stats={stats} />

                        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
                            <h3 className="text-lg font-semibold mb-2">
                                Total Revenue
                            </h3>
                            <p className="text-3xl font-bold text-green-600">
                                Rp {stats.totalRevenue.toLocaleString("id-ID")}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <LeadApproval leads={leads} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
