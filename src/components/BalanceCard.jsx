import { useState } from "react";
import {
  FiShield,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiPlusCircle,
} from "react-icons/fi";

export default function BalanceCard({ balance }) {
  const [showBalance, setShowBalance] = useState(true);

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
        <button className="flex items-center gap-2 text-violet-400 hover:text-violet-300 font-semibold">
          <span>Transaction History</span>
          <FiArrowRight size={18} />
        </button>

        {/* Add Money */}
        <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg font-semibold transition">
          <FiPlusCircle size={20} /> Add Money
        </button>
      </div>
    </div>
  );
}
