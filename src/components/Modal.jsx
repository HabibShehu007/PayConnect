import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function Modal({
  isOpen,
  onClose,
  type = "success",
  message,
  showSpinner,
}) {
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
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500, // higher = snappier
              damping: 30, // lower = more bounce
              mass: 0.8, // lighter = quicker
            }}
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

              {/* Spinner when redirecting */}
              {showSpinner && (
                <span className="animate-spin h-6 w-6 border-2 border-violet-400 border-t-transparent rounded-full"></span>
              )}

              {/* Close Button */}
              {!showSpinner && (
                <button
                  onClick={onClose}
                  className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
                >
                  Okay
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
