import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiShield,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiPlusCircle,
} from "react-icons/fi";
import { supabase } from "../supabaseClient";

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true);
  const [balance, setBalance] = useState("0.00");

  useEffect(() => {
    const fetchBalance = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("user_profile")
          .select("wallet_balance")
          .eq("id", user.id)
          .single();

        if (!error && data) {
          // Always show two decimals like Opay
          setBalance(Number(data.wallet_balance).toFixed(2));
        }
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="bg-slate-900 text-white rounded-xl shadow-lg p-6 border border-violet-600 flex justify-between items-center">
      {/* Left Side */}
      <div className="flex flex-col gap-3">
        {/* Available Balance + Shield */}
        <div className="flex items-center gap-2 text-violet-400 font-semibold">
          <FiShield size={20} />
          <span>Available Balance</span>
        </div>

        {/* Balance with Eye Toggle */}
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">
            {showBalance ? `₦${balance}` : "••••••"}
          </h2>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="text-violet-400 hover:text-violet-300 transition"
          >
            {showBalance ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-end gap-4">
        {/* Transaction History */}
        <Link
          to="/transactions"
          className="flex items-center gap-2 text-violet-400 hover:text-violet-300 font-semibold"
        >
          <span>Transaction History</span>
          <FiArrowRight size={18} />
        </Link>

        {/* Add Money */}
        <Link
          to="/add-money"
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg font-semibold transition"
        >
          <FiPlusCircle size={20} /> Add Money
        </Link>
      </div>
    </div>
  );
}
