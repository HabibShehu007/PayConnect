import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  FiSmartphone,
  FiWifi,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiArrowLeft,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchActivities = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        let query = supabase
          .from("activities") // ✅ now listening to activities table
          .select("amount, service, status, created_at, meta")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (filter !== "all") {
          query = query.eq("status", filter);
        }

        const { data, error } = await query;
        if (!error && data) {
          setActivities(data);
        }
      }
    };

    fetchActivities();

    // ✅ Real-time subscription: listen for inserts/updates
    const channel = supabase
      .channel("activities-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "activities" },
        (payload) => {
          // Re-fetch activities when something changes
          fetchActivities();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [filter]);

  // Helper: pick icon
  const getIcon = (service) => {
    if (service === "airtime") return <FiSmartphone />;
    if (service === "data") return <FiWifi />;
    return null;
  };

  // Helper: pick status icon
  const getStatusIcon = (status) => {
    if (status === "success")
      return <FiCheckCircle className="text-green-400" />;
    if (status === "pending") return <FiClock className="text-yellow-400" />;
    if (status === "failed") return <FiXCircle className="text-red-400" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/dashboard"
          className="text-violet-400 hover:text-violet-300 transition"
        >
          <FiArrowLeft size={28} />
        </Link>
        <h1 className="text-2xl font-bold text-violet-400">
          Recent Activities
        </h1>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-3 mb-8">
        {["all", "success", "pending", "failed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === status
                ? status === "success"
                  ? "bg-green-600 text-white"
                  : status === "pending"
                    ? "bg-yellow-500 text-white"
                    : status === "failed"
                      ? "bg-red-600 text-white"
                      : "bg-violet-600 text-white"
                : "bg-slate-800 hover:bg-slate-700 text-violet-400"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((act, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-slate-800 p-4 rounded-lg shadow-md border border-violet-600"
            >
              {/* Left side */}
              <div className="flex items-center gap-3">
                <span className="text-violet-400 text-2xl">
                  {getIcon(act.service)}
                </span>
                <div>
                  <p className="font-semibold capitalize">
                    {act.service === "airtime"
                      ? "Airtime Purchase"
                      : act.service === "data"
                        ? "Data Bundle"
                        : act.service}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {new Date(act.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-3">
                <p
                  className={`font-bold ${
                    act.status === "success"
                      ? "text-green-400"
                      : act.status === "pending"
                        ? "text-yellow-400"
                        : "text-red-400"
                  }`}
                >
                  ₦{Number(act.amount).toFixed(2)}
                </p>
                {getStatusIcon(act.status)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No Activities Found</p>
        )}
      </div>
    </div>
  );
}
