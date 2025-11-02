import {
  FaSyncAlt,
  FaWallet,
  FaArrowUp,
  FaPaperPlane,
  FaMoneyBillWave,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function WalletBalanceCard({
  balance,
  isRefreshing,
  onRefresh,
  onTopUp,
  onSend,
  onWithdraw,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 160, damping: 14 }}
      className="bg-white text-violet-700 rounded-xl p-6 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaWallet className="text-2xl" />
          <h2 className="text-xl font-black tracking-wide">Wallet Balance</h2>
        </div>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="text-violet-700 hover:text-violet-900 transition"
        >
          <FaSyncAlt
            className={`text-xl ${isRefreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {/* Balance */}
      <div className="text-center mb-6">
        <p className="text-4xl font-extrabold tracking-wide">
          ₦{balance.toLocaleString()}
        </p>
        {balance === 0 && (
          <p className="text-sm font-medium mt-2 text-red-500">
            No money in wallet. Top up to start transacting.
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={onTopUp}
          className="bg-violet-600 text-white px-4 py-2 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-violet-700 transition"
        >
          <FaArrowUp /> Top Up
        </button>
        <button
          onClick={onSend}
          className="bg-violet-600 text-white px-4 py-2 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-violet-700 transition"
        >
          <FaPaperPlane /> Send
        </button>
        <button
          onClick={onWithdraw}
          className="bg-violet-600 text-white px-4 py-2 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-violet-700 transition"
        >
          <FaMoneyBillWave /> Withdraw
        </button>
      </div>
    </motion.div>
  );
}
