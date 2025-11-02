import { motion } from "framer-motion";

export default function BundleCard({ bundle, onSelect }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white text-violet-700 p-4 rounded-xl shadow-lg cursor-pointer w-full max-w-xs mx-auto"
      onClick={() => onSelect(bundle)}
    >
      <h3 className="text-xl font-bold text-center">{bundle.name}</h3>
      <p className="text-lg font-semibold text-center">₦{bundle.price}</p>
    </motion.div>
  );
}
