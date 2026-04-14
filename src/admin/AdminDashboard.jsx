import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { supabase } from "../supabaseClient";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";

export default function AdminDashboard() {
  const [usersCount, setUsersCount] = useState(0);
  const [activitiesCount, setActivitiesCount] = useState(0);
  const [transactionsCount, setTransactionsCount] = useState(0);

  // Chart data states
  const [chartStats, setChartStats] = useState({
    success: [],
    pending: [],
    failed: [],
  });
  const [totals, setTotals] = useState({
    success: 0,
    pending: 0,
    failed: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const { count: uCount } = await supabase
        .from("user_profile")
        .select("*", { count: "exact", head: true });
      setUsersCount(uCount || 0);

      const { count: aCount } = await supabase
        .from("activities")
        .select("*", { count: "exact", head: true });
      setActivitiesCount(aCount || 0);

      const { count: tCount } = await supabase
        .from("transactions")
        .select("*", { count: "exact", head: true });
      setTransactionsCount(tCount || 0);

      // For demo purposes, use sample aggregated data
      const stats = {
        success: [120, 80, 60, 40, 200, 150],
        pending: [15, 10, 20, 5, 30, 25],
        failed: [5, 8, 12, 2, 10, 15],
      };
      setChartStats(stats);

      const totals = {
        success: stats.success.reduce((a, b) => a + b, 0),
        pending: stats.pending.reduce((a, b) => a + b, 0),
        failed: stats.failed.reduce((a, b) => a + b, 0),
      };
      setTotals(totals);
    };

    fetchCounts();
  }, []);

  const cardClasses =
    "flex-1 bg-slate-700 rounded-xl shadow-lg p-6 text-center cursor-pointer hover:bg-slate-600 transition";

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-slate-800 text-white">
        <h2 className="text-3xl font-bold text-violet-400 mb-6">Overview</h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/admin-users" className={cardClasses}>
            <h3 className="text-xl font-semibold text-violet-400 mb-2">
              Users
            </h3>
            <p className="text-4xl font-bold">{usersCount}</p>
            <p className="text-gray-400 mt-2">Total registered users</p>
          </Link>

          <Link to="/admin-activities" className={cardClasses}>
            <h3 className="text-xl font-semibold text-violet-400 mb-2">
              Activities
            </h3>
            <p className="text-4xl font-bold">{activitiesCount}</p>
            <p className="text-gray-400 mt-2">Logged activities</p>
          </Link>

          <Link to="/admin-transactions" className={cardClasses}>
            <h3 className="text-xl font-semibold text-violet-400 mb-2">
              Transactions
            </h3>
            <p className="text-4xl font-bold">{transactionsCount}</p>
            <p className="text-gray-400 mt-2">Processed transactions</p>
          </Link>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-700 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-violet-400 mb-4">
              Sales by Product
            </h3>
            <BarChart data={chartStats} />
          </div>

          <div className="bg-slate-700 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-violet-400 mb-4">
              Overall Status Distribution
            </h3>
            <DoughnutChart data={totals} />
          </div>
        </div>
      </div>
    </div>
  );
}
