import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCreditCard,
  FiHome,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

// Simple reusable modal component
function MyModal({ message, Icon, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl shadow-lg p-8 w-96 text-center">
        {Icon && <Icon className="text-violet-400 text-5xl mb-4 mx-auto" />}
        <p className="text-white text-lg font-semibold mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function AddMoney() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIcon, setModalIcon] = useState(FiCheckCircle);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-slate-700">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition"
        >
          <FiArrowLeft className="text-xl" />
          <span className="font-semibold">Back to Dashboard</span>
        </button>
        <h1 className="text-2xl font-bold ml-auto">Add Money</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-8 p-8">
        {/* Bank Transfer Card */}
        <div
          onClick={() => {
            setModalMessage("Bank Transfer flow coming soon...");
            setModalIcon(FiHome);
            setModalOpen(true);
          }}
          className="cursor-pointer bg-slate-800 border border-violet-600 rounded-xl shadow-lg hover:shadow-violet-500/30 transition transform hover:scale-105 w-full sm:w-1/3 p-8 flex flex-col items-center text-center"
        >
          <FiHome className="text-violet-400 text-5xl mb-4" />
          <h2 className="text-xl font-bold mb-2">Bank Transfer</h2>
          <p className="text-gray-400 mb-6">
            Fund your wallet by transferring directly to your virtual account.
          </p>
          <span className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition">
            Use Bank Transfer
          </span>
        </div>

        {/* ATM Card Card */}
        <div
          onClick={() => {
            if (window.FlutterwaveCheckout) {
              window.FlutterwaveCheckout({
                public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
                tx_ref: Date.now().toString(),
                amount: 1000,
                currency: "NGN",
                payment_options: "card, banktransfer",
                customer: {
                  email: "user@example.com",
                  name: "Habib",
                },
                callback: function (data) {
                  console.log("Payment complete:", data);
                  setModalMessage("Wallet funded successfully!");
                  setModalIcon(FiCheckCircle);
                  setModalOpen(true);
                },
                onclose: function () {
                  setModalMessage("Transaction closed.");
                  setModalIcon(FiXCircle);
                  setModalOpen(true);
                },
              });
            } else {
              setModalMessage("Flutterwave script not loaded yet!");
              setModalIcon(FiXCircle);
              setModalOpen(true);
            }
          }}
          className="cursor-pointer bg-slate-800 border border-violet-600 rounded-xl shadow-lg hover:shadow-violet-500/30 transition transform hover:scale-105 w-full sm:w-1/3 p-8 flex flex-col items-center text-center"
        >
          <FiCreditCard className="text-violet-400 text-5xl mb-4" />
          <h2 className="text-xl font-bold mb-2">ATM Card</h2>
          <p className="text-gray-400 mb-6">
            Fund your wallet instantly using your debit or credit card.
          </p>
          <span className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition">
            Pay with Card
          </span>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <MyModal
          message={modalMessage}
          Icon={modalIcon}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
