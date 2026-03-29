import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiSmartphone,
  FiWifi,
  FiPlusCircle,
} from "react-icons/fi";

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("transactions")
          .select("amount, type, status, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(2);

        if (!error && data) {
          setActivities(data);
        }
      }
    };

    fetchActivities();
  }, []);

  // Helper to pick icon
  const getIcon = (type) => {
    if (type === "airtime") return <FiSmartphone />;
    if (type === "data") return <FiWifi />;
    if (type === "credit") return <FiPlusCircle />;
    return null;
  };

  // Helper to pick label
  const getLabel = (type) => {
    if (type === "airtime") return "Airtime Purchase";
    if (type === "data") return "Data Bundle";
    if (type === "credit") return "Wallet Funding";
    return "Transaction";
  };

  return (
    <div className="bg-slate-900 text-white rounded-xl shadow-lg p-6 border border-violet-600 mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-violet-400">Recent Activity</h2>
        <Link
          to="/activity"
          className="flex items-center gap-2 text-violet-400 hover:text-violet-300 font-semibold"
        >
          View All <FiArrowRight size={18} />
        </Link>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-slate-800 p-4 rounded-lg"
            >
              {/* Left side: icon + title + date */}
              <div className="flex items-center gap-3">
                <span className="text-violet-400 text-2xl">
                  {getIcon(activity.type)}
                </span>
                <div>
                  <p className="font-semibold">{getLabel(activity.type)}</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Right side: amount */}
              <p
                className={`font-bold ${
                  activity.type === "credit" ? "text-green-400" : "text-red-400"
                }`}
              >
                ₦{Number(activity.amount).toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No Recent Activities</p>
        )}
      </div>
    </div>
  );
}
