import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiSmartphone,
  FiWifi,
  FiPlusCircle,
  FiZap,
  FiBookOpen,
} from "react-icons/fi";

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    let mounted = true; // ✅ guard against unmounts

    const fetchActivities = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession(); // ✅ use getSession instead of getUser
      const user = session?.user;

      if (mounted && user) {
        const { data, error } = await supabase
          .from("activities")
          .select("amount, service, status, created_at, meta")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(2);

        if (!error && data) {
          setActivities(data);
        }
      }
    };

    fetchActivities();

    return () => {
      mounted = false; // ✅ cleanup
    };
  }, []);

  // Helper to pick icon
  const getIcon = (service) => {
    if (service === "airtime") return <FiSmartphone />;
    if (service === "data") return <FiWifi />;
    if (service === "credit") return <FiPlusCircle />;
    return null;
  };

  // Helper to pick label
  const getLabel = (service) => {
    if (service === "airtime") return "Airtime Purchase";
    if (service === "data") return "Data Bundle";
    if (service === "credit") return "Wallet Funding";
    if (service === "utility") return <FiZap />; // ⚡ Electricity, water, cable, etc.
    if (service === "exam") return <FiBookOpen />;
    return "Activity";
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
              {/* Left side */}
              <div className="flex items-center gap-3">
                <span className="text-violet-400 text-2xl">
                  {getIcon(activity.service)}
                </span>
                <div>
                  <p className="font-semibold">{getLabel(activity.service)}</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Right side */}
              <p
                className={`font-bold ${
                  activity.status === "success"
                    ? "text-green-400"
                    : activity.status === "pending"
                      ? "text-yellow-400"
                      : "text-red-400"
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
