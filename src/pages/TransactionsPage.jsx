import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  FiPlusCircle,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiArrowLeft,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let mounted = true;

    const fetchTransactions = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Auth error:", error);
        return;
      }

      const user = session?.user;
      if (mounted && user) {
        let query = supabase
          .from("transactions")
          .select("amount, type, status, created_at")
          .eq("user_id", user.id)
          .eq("type", "credit") // ✅ only funding transactions
          .order("created_at", { ascending: false });

        if (filter !== "all") {
          query = query.eq("status", filter);
        }

        const { data, error: txError } = await query;
        if (!txError && data) {
          setTransactions(data);
        }
      }
    };

    fetchTransactions();
    return () => {
      mounted = false;
    };
  }, [filter]);

  // Helper: pick icon
  const getIcon = () => <FiPlusCircle />;

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
          Funding Transactions
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

      {/* Transaction List */}
      <div className="space-y-4">
        {transactions.length > 0 ? (
          transactions.map((tx, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-slate-800 p-4 rounded-lg shadow-md border border-violet-600"
            >
              {/* Left side */}
              <div className="flex items-center gap-3">
                <span className="text-violet-400 text-2xl">{getIcon()}</span>
                <div>
                  <p className="font-semibold">Wallet Funding</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(tx.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-3">
                <p
                  className={`font-bold ${
                    tx.status === "success"
                      ? "text-green-400"
                      : tx.status === "pending"
                        ? "text-yellow-400"
                        : "text-red-400"
                  }`}
                >
                  ₦{Number(tx.amount).toFixed(2)}
                </p>
                {getStatusIcon(tx.status)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">
            No Funding Transactions Found
          </p>
        )}
      </div>
    </div>
  );
}
