import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function Modal({ isOpen, onClose, type = "success", message }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Box */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="bg-slate-900 text-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md border border-violet-600 flex flex-col items-center gap-6">
              {/* Icon */}
              {type === "success" ? (
                <FiCheckCircle className="text-green-400 text-5xl" />
              ) : (
                <FiAlertCircle className="text-red-400 text-5xl" />
              )}

              {/* Message */}
              <p className="text-center text-base sm:text-lg font-medium text-gray-200 break-words">
                {message}
              </p>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
              >
                Okay
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
