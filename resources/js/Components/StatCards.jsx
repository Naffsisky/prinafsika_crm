export default function StatCards({ stats }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-blue-100 p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Total Leads 👥</h3>
                <p className="text-2xl">{stats.totalLeads}</p>
            </div>
            <div className="bg-indigo-100 p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Total Customers 👥</h3>
                <p className="text-2xl">{stats.totalCustomers}</p>
            </div>
            <div className="bg-indigo-100 p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Total Users 👥</h3>
                <p className="text-2xl">{stats.totalUsers}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Leads Pending ⌛️</h3>
                <p className="text-2xl">{stats.pendingLeads}</p>
            </div>
            <div className="bg-green-100 p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Leads Approved ✅</h3>
                <p className="text-2xl">{stats.approvedLeads}</p>
            </div>
            <div className="bg-red-100 p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Leads Rejected ❌</h3>
                <p className="text-2xl">{stats.rejectedLeads}</p>
            </div>
        </div>
    );
}
