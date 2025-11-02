import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ErrorModal({ message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed inset-0 bg-white flex items-center justify-center z-50"
    >
      <div className="bg-white text-red-700 rounded-2xl p-6 max-w-md w-full text-center shadow-2xl border border-red-300">
        <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-extrabold mb-2">Something went wrong</h2>
        <p className="text-lg font-medium mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}
