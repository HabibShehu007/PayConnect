import { useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import BundleCard from "../components/BundleCard";
import BundleEntryModal from "../components/BundleEntryModal";
import bundleData from "../components/BundleData";
import { motion } from "framer-motion";

const networks = ["MTN", "Airtel", "9mobile", "Glo"];
const categories = ["Daily", "Weekly", "Monthly"];

export default function Data() {
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Daily");
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBundleSubmit = () => {
    if (
      !phoneNumber ||
      phoneNumber.length !== 11 ||
      !/^\d+$/.test(phoneNumber)
    ) {
      setErrorMessage("Phone number must be 11 digits.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const message = `🎉 ${selectedBundle.name} activated for ${phoneNumber} on ${selectedNetwork}.`;
      setModalMessage(message);
      setShowModal(true);
      setShowEntryModal(false);
      setPhoneNumber("");
      setSelectedBundle(null);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto text-white pt-20 pb-10 px-4 bg-pink-900 rounded-xl shadow-xl">
        {/* Page Intro */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl font-extrabold tracking-wide mb-2">
            Buy Data
          </h1>
          <p className="text-white text-lg font-medium">
            Choose your network and activate a data bundle instantly with
            PayConnect.
          </p>
        </motion.div>

        {/* Network Selector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 12 }}
          className="mb-6"
        >
          <label className="block mb-2 text-lg font-bold text-white flex items-center gap-2">
            <FaMobileAlt /> Network Provider
          </label>
          <select
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value)}
            className="w-full px-4 py-3 rounded text-violet-700 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">-- Choose Network --</option>
            {networks.map((net) => (
              <option key={net} value={net}>
                {net}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Category Tabs */}
        {selectedNetwork && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            className="flex justify-center gap-4 mb-4"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-bold transition ${
                  selectedCategory === cat
                    ? "bg-cyan-400 text-violet-700"
                    : "bg-white text-violet-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Bundle Cards */}
        {selectedNetwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
          >
            {bundleData[selectedNetwork][selectedCategory].map((bundle) => (
              <BundleCard
                key={bundle.name}
                bundle={bundle}
                onSelect={(selected) => {
                  setSelectedBundle(selected);
                  setShowEntryModal(true);
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Entry Modal */}
        {showEntryModal && (
          <BundleEntryModal
            bundle={selectedBundle}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            onConfirm={handleBundleSubmit}
            onClose={() => {
              setShowEntryModal(false);
              setSelectedBundle(null);
            }}
          />
        )}

        {/* Success Modal */}
        {showModal && (
          <SuccessModal
            message={modalMessage}
            onClose={() => setShowModal(false)}
          />
        )}

        {/* Error Modal */}
        {errorMessage && (
          <ErrorModal
            message={errorMessage}
            onClose={() => setErrorMessage("")}
          />
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-white/30 backdrop-blur-sm flex flex-col items-center justify-center z-50"
          >
            <div className="h-16 w-16 rounded-full border-4 border-violet-200 border-t-4 border-t-violet-700 animate-spin mb-6"></div>
            <p className="text-violet-700 text-xl font-extrabold tracking-wide animate-pulse">
              Processing your data bundle...
            </p>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
