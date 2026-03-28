import { FiInfo, FiTrendingUp, FiAward } from "react-icons/fi";
import { motion } from "framer-motion";

export default function InfoPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
      className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl shadow-lg p-6 border border-violet-600 mt-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <FiInfo className="text-violet-400 text-2xl animate-pulse" />
        <h2 className="text-violet-400 font-semibold text-lg">Did You Know?</h2>
      </div>

      {/* Content */}
      <p className="text-gray-300 text-sm sm:text-base mb-4">
        You’ve completed{" "}
        <span className="font-bold text-green-400">12 transactions</span> this
        month. Keep it up and unlock rewards!
      </p>

      {/* Extra Highlights */}
      <div className="flex gap-6 mt-4">
        <div className="flex items-center gap-2">
          <FiTrendingUp className="text-emerald-400 text-xl" />
          <span className="text-sm text-gray-200">+20% growth</span>
        </div>
        <div className="flex items-center gap-2">
          <FiAward className="text-yellow-400 text-xl" />
          <span className="text-sm text-gray-200">Reward Tier 2</span>
        </div>
      </div>
    </motion.div>
  );
}
