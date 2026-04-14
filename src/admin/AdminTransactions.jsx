import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import AdminSidebar from "./AdminSidebar";
import {
  FiPlusCircle,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiEye,
} from "react-icons/fi";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTx, setSelectedTx] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("id, user_id, amount, type, status, created_at")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setTransactions(data);
      }
    };

    fetchTransactions();

    const channel = supabase
      .channel("transactions-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "transactions" },
        () => {
          fetchTransactions();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getIcon = (type) => {
    if (type === "credit") return <FiPlusCircle className="text-green-400" />;
    if (type === "debit")
      return <FiPlusCircle className="text-red-400 rotate-45" />;
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
        <h2 className="text-3xl font-bold text-violet-400 mb-6">
          Transactions
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-700 text-violet-400">
              <th className="p-3 text-left">User ID</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-slate-600 hover:bg-slate-700"
              >
                <td className="p-3">{tx.user_id}</td>
                <td className="p-3 flex items-center gap-2">
                  {getIcon(tx.type)}
                  {tx.type}
                </td>
                <td className="p-3">₦{tx.amount}</td>
                <td className="p-3 flex items-center gap-2">
                  {getStatusIcon(tx.status)}
                  {tx.status}
                </td>
                <td className="p-3">
                  {new Date(tx.created_at).toLocaleString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => {
                      setSelectedTx(tx);
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

        {showModal && selectedTx && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-bold text-violet-400 mb-4">
                Transaction Details
              </h3>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">User ID:</span>{" "}
                {selectedTx.user_id}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Type:</span> {selectedTx.type}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Amount:</span> ₦
                {selectedTx.amount}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Status:</span>{" "}
                {selectedTx.status}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(selectedTx.created_at).toLocaleString()}
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
