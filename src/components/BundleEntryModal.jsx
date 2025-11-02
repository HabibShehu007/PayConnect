import { motion } from "framer-motion";

export default function BundleEntryModal({
  bundle,
  phoneNumber,
  setPhoneNumber,
  onConfirm,
  onClose,
}) {
  if (!bundle) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed inset-0 bg-white/50 backdrop-brightness-75 flex items-center justify-center z-50"
    >
      <div className="bg-white text-violet-700 rounded-2xl p-6 max-w-md w-full text-center shadow-2xl">
        <h2 className="text-2xl font-black tracking-wide mb-2">
          {bundle.name}
        </h2>
        <p className="text-lg font-bold tracking-tight mb-4">
          Price: ₦{bundle.price}
        </p>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter recipient number"
          className="w-full px-4 py-3 rounded text-violet-700 font-semibold bg-gray-100 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-violet-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-violet-700 transition"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-violet-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}
