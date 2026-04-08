import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCreditCard,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { supabase } from "../supabaseClient";

// Payment Modal for entering details
function PaymentModal({ onClose, onSubmit }) {
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [pin, setPin] = useState("");

  // Format card number: groups of 4 digits
  const handleCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove non-digits
    value = value.slice(0, 16); // max 16 digits
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(formatted);
  };

  // Format expiry: MM/YY
  const handleExpiry = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiry(value);
  };

  // CVV: max 3 digits
  const handleCvv = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    setCvv(value.slice(0, 3));
  };

  // PIN: max 4 digits
  const handlePin = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    setPin(value.slice(0, 4));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl shadow-lg p-8 w-96 text-center">
        <FiCreditCard className="text-violet-400 text-5xl mb-4 mx-auto" />
        <h2 className="text-xl font-bold mb-4">Enter Card Details</h2>

        <input
          type="number"
          placeholder="Amount (₦)"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
          className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
          min="1"
        />
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={handleCardNumber}
          className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
        />
        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          onChange={handleExpiry}
          className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={handleCvv}
          className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
        />
        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={handlePin}
          className="w-full mb-6 p-2 rounded bg-slate-700 text-white"
        />

        <button
          disabled={!amount || !cardNumber || !expiry || !cvv || !pin}
          onClick={() => onSubmit(parseInt(amount))}
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition w-full mb-3"
        >
          Top‑Up ₦{amount || "0"}
        </button>
        <button
          onClick={onClose}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// Result Modal
function ResultModal({ message, success, onClose }) {
  const Icon = success ? FiCheckCircle : FiXCircle;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl shadow-lg p-8 w-96 text-center">
        <Icon
          className={`text-5xl mb-4 mx-auto ${success ? "text-green-400" : "text-red-400"}`}
        />
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [resultSuccess, setResultSuccess] = useState(true);
  const [userId, setUserId] = useState(null);

  // ✅ Get logged-in user ID from Supabase Auth
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Auth error:", error);
      } else {
        setUserId(session?.user?.id);
      }
    };
    fetchUser();
  }, []);

  const handlePayment = async (amount) => {
    if (!userId) {
      setResultMessage("No user logged in.");
      setResultSuccess(false);

      // ❌ Log failed funding attempt
      await supabase.from("transactions").insert({
        user_id: userId,
        type: "credit",
        amount,
        status: "failed",
      });

      setShowResultModal(true);
      return;
    }

    // Fetch current balance
    const { data, error } = await supabase
      .from("user_profile")
      .select("wallet_balance")
      .eq("id", userId)
      .single();

    if (error) {
      setResultMessage("Failed to fetch balance.");
      setResultSuccess(false);

      // ❌ Log failed funding attempt
      await supabase.from("transactions").insert({
        user_id: userId,
        type: "credit",
        amount,
        status: "failed",
      });
    } else {
      const currentBalance = data?.wallet_balance || 0;
      const newBalance = currentBalance + amount;

      const { error: updateError } = await supabase
        .from("user_profile")
        .update({ wallet_balance: newBalance })
        .eq("id", userId);

      if (updateError) {
        setResultMessage("Failed to update balance.");
        setResultSuccess(false);

        // ❌ Log failed funding attempt
        await supabase.from("transactions").insert({
          user_id: userId,
          type: "credit",
          amount,
          status: "failed",
        });
      } else {
        setResultMessage(`Wallet funded successfully with ₦${amount}!`);
        setResultSuccess(true);

        // ✅ Log successful funding
        await supabase.from("transactions").insert({
          user_id: userId,
          type: "credit",
          amount,
          status: "success",
        });
      }
    }

    setShowPaymentModal(false);
    setShowResultModal(true);
  };

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
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
        {/* ATM Card */}
        <div
          onClick={() => setShowPaymentModal(true)}
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

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSubmit={handlePayment}
        />
      )}

      {/* Result Modal */}
      {showResultModal && (
        <ResultModal
          message={resultMessage}
          success={resultSuccess}
          onClose={() => setShowResultModal(false)}
        />
      )}
    </div>
  );
}
