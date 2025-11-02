import { useState } from "react";
import { FaThumbsUp, FaExclamationTriangle } from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";

const networks = ["MTN", "Airtel", "9mobile", "Glo"];
const suggestedAmounts = [100, 200, 500, 1000, 1500, 2000];

export default function Airtime() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    if (!selectedNetwork || !phoneNumber || !amount) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (phoneNumber.length !== 11 || !/^\d+$/.test(phoneNumber)) {
      setErrorMessage("Phone number must be 11 digits.");
      return;
    }

    if (amount < 50) {
      setErrorMessage("Minimum airtime amount is ₦50.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    setTimeout(() => {
      const message = `🎉 Airtime of ₦${amount} has been successfully sent to ${phoneNumber} on ${selectedNetwork}.`;
      setModalMessage(message);
      setShowModal(true);
      setIsLoading(false);
      setSelectedNetwork("");
      setPhoneNumber("");
      setAmount("");
    }, 4000);
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
            Buy Airtime
          </h1>
          <p className="text-white text-lg font-medium">
            Select your network and recharge your line instantly with
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
            Network Provider
          </label>
          <select
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value)}
            className="w-full px-4 py-3 rounded text-violet-700 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">-- Choose Network --</option>
            {networks.map((net) => (
              <option key={net} value={net}>
                {net}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Form Section */}
        {selectedNetwork && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 14 }}
            className="space-y-6"
          >
            <div>
              <label className="block mb-2 text-lg font-bold text-white">
                {selectedNetwork} Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. 08012345678"
                className="w-full px-4 py-3 rounded text-violet-700 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-lg font-bold text-white">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 500"
                className="w-full px-4 py-3 rounded text-violet-700 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <div className="flex flex-wrap gap-3 mt-3">
                {suggestedAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className="bg-white text-violet-700 px-4 py-2 rounded-full font-bold hover:bg-yellow-300 transition"
                  >
                    ₦{amt}
                  </button>
                ))}
              </div>
            </div>

            {errorMessage && (
              <ErrorModal
                message={errorMessage}
                onClose={() => setErrorMessage("")}
              />
            )}

            {/* Pay Button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="bg-white text-violet-700 px-6 py-3 rounded-full font-extrabold text-lg transition hover:scale-105"
              >
                Pay Now
              </button>
            </div>
          </motion.div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50"
          >
            <div className="h-16 w-16 rounded-full border-4 border-violet-200 border-t-4 border-t-violet-700 animate-spin mb-6"></div>
            <p className="text-violet-700 text-xl font-extrabold tracking-wide animate-pulse">
              Processing your airtime...
            </p>
          </motion.div>
        )}

        {/* Success Modal */}
        {showModal && (
          <SuccessModal
            message={modalMessage}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </MainLayout>
  );
}
