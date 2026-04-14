import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import AdminSidebar from "./AdminSidebar";
import {
  FiSmartphone,
  FiWifi,
  FiZap,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiEye,
} from "react-icons/fi";

export default function AdminActivities() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("id, user_id, amount, service, status, created_at, meta")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setActivities(data);
      }
    };

    fetchActivities();

    // Real-time subscription
    const channel = supabase
      .channel("activities-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "activities" },
        () => {
          fetchActivities();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Helpers
  const getIcon = (service) => {
    if (service === "airtime")
      return <FiSmartphone className="text-violet-400" />;
    if (service === "data") return <FiWifi className="text-violet-400" />;
    if (service === "utility") return <FiZap className="text-violet-400" />;
    if (service === "exam") return <FiBookOpen className="text-violet-400" />;
    return null;
  };

  const getStatusIcon = (status) => {
    if (status === "success")
      return <FiCheckCircle className="text-green-400" />;
    if (status === "pending") return <FiClock className="text-yellow-400" />;
    if (status === "failed") return <FiXCircle className="text-red-400" />;
    return null;
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-slate-800 text-white">
        <h2 className="text-3xl font-bold text-violet-400 mb-6">Activities</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-700 text-violet-400">
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((act) => (
              <tr
                key={act.id}
                className="border-b border-slate-600 hover:bg-slate-700"
              >
                <td className="p-3">{act.meta?.username || act.user_id}</td>
                <td className="p-3 flex items-center gap-2">
                  {getIcon(act.service)}
                  {act.service}
                </td>
                <td className="p-3">₦{act.amount}</td>
                <td className="p-3 flex items-center gap-2">
                  {getStatusIcon(act.status)}
                  {act.status}
                </td>
                <td className="p-3">
                  {new Date(act.created_at).toLocaleString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => {
                      setSelectedActivity(act);
                      setShowModal(true);
                    }}
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg"
                  >
                    <FiEye /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {showModal && selectedActivity && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-bold text-violet-400 mb-4">
                Activity Details
              </h3>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">User:</span>{" "}
                {selectedActivity.meta?.username || selectedActivity.user_id}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Service:</span>{" "}
                {selectedActivity.service}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Amount:</span> ₦
                {selectedActivity.amount}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Status:</span>{" "}
                {selectedActivity.status}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(selectedActivity.created_at).toLocaleString()}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Meta:</span>{" "}
                {JSON.stringify(selectedActivity.meta)}
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
