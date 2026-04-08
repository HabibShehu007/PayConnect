import { useState, useEffect } from "react";
import { FiArrowLeft, FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { supabase } from "../supabaseClient";

export default function UtilityPage() {
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState(null);
  const [balance, setBalance] = useState(0);

  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");

  const [showResultModal, setShowResultModal] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");

  // ✅ Get logged-in user and balance
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const id = session?.user?.id;
      setUserId(id);

      if (id) {
        const { data: profile } = await supabase
          .from("user_profile")
          .select("wallet_balance")
          .eq("id", id)
          .single();
        setBalance(profile?.wallet_balance || 0);
      }
    };
    fetchUser();
  }, []);

  const handlePurchase = async () => {
    const amt = parseInt(amount);

    if (!meterNumber || !amt) return;

    if (balance < amt) {
      setModalType("error");
      setModalMessage("Insufficient balance to complete this purchase.");

      // ❌ Log failed utility attempt
      await supabase.from("activities").insert({
        user_id: userId,
        service: "utility",
        amount: amt,
        status: "failed",
        meta: { meterNumber, utility: "electricity" },
      });

      setShowResultModal(true);
      return;
    }

    // ✅ Deduct from wallet
    const newBalance = balance - amt;
    const { error } = await supabase
      .from("user_profile")
      .update({ wallet_balance: newBalance })
      .eq("id", userId);

    if (error) {
      setModalType("error");
      setModalMessage("Transaction failed. Please try again.");

      // ❌ Log failed attempt
      await supabase.from("activities").insert({
        user_id: userId,
        service: "utility",
        amount: amt,
        status: "failed",
        meta: { meterNumber, utility: "electricity" },
      });
    } else {
      setBalance(newBalance);
      setModalType("success");
      setModalMessage(`Electricity recharge of ₦${amt} successful!`);

      // ✅ Log successful utility purchase
      await supabase.from("activities").insert({
        user_id: userId,
        service: "utility",
        amount: amt,
        status: "success",
        meta: { meterNumber, utility: "electricity" },
      });
    }

    setShowResultModal(true);
  };

  const handlePinSubmit = () => {
    if (pin.length === 4) {
      setShowPinModal(false);
      handlePurchase();
    } else {
      setModalType("error");
      setModalMessage("PIN must be 4 digits.");
      setShowResultModal(true);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white flex flex-col">
      <div className="max-w-lg w-full mx-auto flex-1 flex flex-col space-y-10 p-6">
        {/* Header */}
        <div className="flex items-center gap-3 ">
          <Link
            to="/dashboard"
            className="text-violet-400 hover:text-violet-300 transition"
          >
            <FiArrowLeft size={28} />
          </Link>
          <h1 className="text-2xl font-bold text-violet-400">Utilities</h1>
        </div>

        {/* Electricity Section */}
        <div className="bg-gray-100/10 rounded-lg p-5">
          <h2 className="text-gray-300 mb-4 text-lg font-semibold flex items-center gap-2">
            <FiZap /> Electricity Recharge
          </h2>
          <input
            type="text"
            value={meterNumber}
            onChange={(e) => setMeterNumber(e.target.value)}
            className="w-full mb-4 p-4 bg-slate-700 text-white rounded-lg"
            placeholder="Enter Meter Number"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mb-4 p-4 bg-slate-700 text-white rounded-lg"
            placeholder="Enter Amount"
          />
          <button
            disabled={!meterNumber || !amount}
            onClick={() => setShowPinModal(true)}
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 text-lg transition rounded-lg w-full"
          >
            Pay
          </button>
        </div>
      </div>

      {/* PIN Modal */}
      <Modal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        type="info"
        title="Enter PIN"
        message="Please enter your 4-digit PIN to confirm purchase."
      >
        <input
          type="password"
          value={pin}
          onChange={(e) =>
            setPin(e.target.value.replace(/\D/g, "").slice(0, 4))
          }
          className="w-full mb-4 p-3 rounded bg-slate-700 text-white text-center tracking-widest text-xl"
          placeholder="••••"
          maxLength={4}
        />
        <button
          onClick={handlePinSubmit}
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition w-full"
        >
          Confirm
        </button>
      </Modal>

      {/* Result Modal */}
      <Modal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        type={modalType}
        title={modalType === "success" ? "Purchase Successful" : "Error"}
        message={modalMessage}
      >
        <button
          onClick={() => setShowResultModal(false)}
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          Okay
        </button>
      </Modal>
    </div>
  );
}
