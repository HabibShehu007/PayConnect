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
    const fetchTransactions = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        let query = supabase
          .from("transactions")
          .select("amount, type, status, created_at")
          .eq("user_id", user.id)
          .eq("type", "credit") // ✅ only funding transactions
          .order("created_at", { ascending: false });

        if (filter !== "all") {
          query = query.eq("status", filter);
        }

        const { data, error } = await query;
        if (!error && data) {
          setTransactions(data);
        }
      }
    };

    fetchTransactions();
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
      {/* Header with Back Arrow */}
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

      {/* Filter Buttons Centered */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === "all"
              ? "bg-violet-600 text-white"
              : "bg-slate-800 hover:bg-slate-700 text-violet-400"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("success")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === "success"
              ? "bg-green-600 text-white"
              : "bg-slate-800 hover:bg-slate-700 text-green-400"
          }`}
        >
          Success
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === "pending"
              ? "bg-yellow-500 text-white"
              : "bg-slate-800 hover:bg-slate-700 text-yellow-400"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("failed")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === "failed"
              ? "bg-red-600 text-white"
              : "bg-slate-800 hover:bg-slate-700 text-red-400"
          }`}
        >
          Failed
        </button>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {transactions.length > 0 ? (
          transactions.map((tx, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-slate-800 p-4 rounded-lg shadow-md border border-violet-600"
            >
              {/* Left side: icon + title + date */}
              <div className="flex items-center gap-3">
                <span className="text-violet-400 text-2xl">{getIcon()}</span>
                <div>
                  <p className="font-semibold">Wallet Funding</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(tx.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Right side: amount + status */}
              <div className="flex items-center gap-3">
                <p className="font-bold text-green-400">
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
