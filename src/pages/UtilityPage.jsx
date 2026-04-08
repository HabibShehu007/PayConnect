import { useState, useEffect } from "react";
import { FiArrowLeft, FiZap, FiTv } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { supabase } from "../supabaseClient";

export default function UtilityPage() {
  const [userId, setUserId] = useState(null);
  const [balance, setBalance] = useState(0);

  // Electricity modal states
  const [showElectricityModal, setShowElectricityModal] = useState(false);
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [company, setCompany] = useState("KEDCO");
  const [pin, setPin] = useState("");

  const [showResultModal, setShowResultModal] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");

  // Cable TV modal states
  const [showCableModal, setShowCableModal] = useState(false);
  const [decoderNumber, setDecoderNumber] = useState("");
  const [cableProvider, setCableProvider] = useState("DSTV");
  const [cablePlan, setCablePlan] = useState("Basic");
  const [cableAmount, setCableAmount] = useState("");
  const [cablePin, setCablePin] = useState("");

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

    if (!meterNumber || !amt || !company) return;

    if (balance < amt) {
      setModalType("error");
      setModalMessage("Insufficient balance to complete this purchase.");

      await supabase.from("activities").insert({
        user_id: userId,
        service: "utility",
        amount: amt,
        status: "failed",
        meta: { meterNumber, company, utility: "electricity" },
      });

      setShowResultModal(true);
      return;
    }

    const newBalance = balance - amt;
    const { error } = await supabase
      .from("user_profile")
      .update({ wallet_balance: newBalance })
      .eq("id", userId);

    if (error) {
      setModalType("error");
      setModalMessage("Transaction failed. Please try again.");

      await supabase.from("activities").insert({
        user_id: userId,
        service: "utility",
        amount: amt,
        status: "failed",
        meta: { meterNumber, company, utility: "electricity" },
      });
    } else {
      setBalance(newBalance);
      setModalType("success");
      setModalMessage(`Electricity recharge of ₦${amt} successful!`);

      await supabase.from("activities").insert({
        user_id: userId,
        service: "utility",
        amount: amt,
        status: "success",
        meta: { meterNumber, company, utility: "electricity" },
      });
    }

    setShowResultModal(true);
    setShowElectricityModal(false);
  };

  const handleCablePurchase = async () => {
    const amt = parseInt(cableAmount);
    if (!decoderNumber || !amt || !cableProvider || !cablePlan) return;

    if (balance < amt) {
      setModalType("error");
      setModalMessage("Insufficient balance for cable subscription.");
      await supabase.from("activities").insert({
        user_id: userId,
        service: "utility",
        amount: amt,
        status: "failed",
        meta: { decoderNumber, cableProvider, cablePlan, utility: "cable" },
      });
      setShowResultModal(true);
      return;
    }

    const newBalance = balance - amt;
    const { error } = await supabase
      .from("user_profile")
      .update({ wallet_balance: newBalance })
      .eq("id", userId);

    if (error) {
      setModalType("error");
      setModalMessage("Transaction failed.");
      await supabase.from("activities").insert({
        user_id: userId,
        service: "utility",
        amount: amt,
        status: "failed",
        meta: { decoderNumber, cableProvider, cablePlan, utility: "cable" },
      });
    } else {
      setBalance(newBalance);
      setModalType("success");
      setModalMessage(`${cableProvider} subscription successful for ₦${amt}!`);
      await supabase.from("activities").insert({
        user_id: userId,
        service: "utility",
        amount: amt,
        status: "success",
        meta: { decoderNumber, cableProvider, cablePlan, utility: "cable" },
      });
    }
    setShowResultModal(true);
    setShowCableModal(false);
  };

  const handlePinSubmit = () => {
    if (pin.length === 4) {
      handlePurchase();
    } else {
      setModalType("error");
      setModalMessage("PIN must be 4 digits.");
      setShowResultModal(true);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/dashboard"
          className="text-violet-400 hover:text-violet-300 transition"
        >
          <FiArrowLeft size={28} />
        </Link>
        <h1 className="text-2xl font-bold text-violet-400">Utilities</h1>
      </div>

      {/* Utility Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {/* Electricity Card */}
        <div
          onClick={() => setShowElectricityModal(true)}
          className="cursor-pointer bg-slate-800 border border-violet-600 rounded-xl shadow-lg hover:shadow-violet-500/30 transition transform hover:scale-105 p-6 flex flex-col items-center text-center sm:rounded-lg sm:p-8"
        >
          <FiZap className="text-violet-400 text-4xl mb-3" />
          <h2 className="text-lg font-bold">Electricity</h2>
          <p className="text-gray-400 text-sm">Recharge your meter</p>
        </div>
        {/* Cable TV Card */}
        <div
          onClick={() => setShowCableModal(true)}
          className="cursor-pointer bg-slate-800 border border-violet-600 rounded-xl shadow-lg hover:shadow-violet-500/30 transition transform hover:scale-105 p-6 flex flex-col items-center text-center sm:rounded-lg sm:p-8"
        >
          <FiTv className="text-violet-400 text-4xl mb-3" />
          <h2 className="text-lg font-bold">Cable TV</h2>
          <p className="text-gray-400 text-sm">Renew your subscription</p>
        </div>
      </div>

      {/* Electricity Modal */}
      <Modal
        isOpen={showElectricityModal}
        onClose={() => setShowElectricityModal(false)}
        type="info"
      >
        <div className="relative bg-slate-800 rounded-xl shadow-lg p-6 w-11/12 sm:max-w-md mx-auto">
          {/* Close (X) Icon */}
          <button
            onClick={() => setShowElectricityModal(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition text-2xl font-bold"
          >
            ✕
          </button>

          {/* Title */}
          <h2 className="text-xl font-bold text-violet-400 mb-4">
            Electricity Recharge
          </h2>

          {/* Form Fields */}
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-slate-700 text-white"
          >
            <option value="KEDCO">KEDCO</option>
            <option value="IKEDC">IKEDC</option>
            <option value="EEDC">EEDC</option>
            <option value="PHED">PHED</option>
          </select>

          <input
            type="text"
            value={meterNumber}
            onChange={(e) => setMeterNumber(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-slate-700 text-white"
            placeholder="Enter Meter Number"
            maxLength={11}
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-slate-700 text-white"
            placeholder="Enter Amount"
          />
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

          {/* Confirm Button */}
          <button
            onClick={handlePinSubmit}
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition w-full"
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* Cable TV Modal */}
      <Modal
        isOpen={showCableModal}
        onClose={() => setShowCableModal(false)}
        type="info"
      >
        <div className="relative bg-slate-800 rounded-xl shadow-lg p-6 w-11/12 sm:max-w-md mx-auto">
          <button
            onClick={() => setShowCableModal(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition text-2xl font-bold"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold text-violet-400 mb-4">
            Cable TV Subscription
          </h2>

          <select
            value={cableProvider}
            onChange={(e) => setCableProvider(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-slate-700 text-white"
          >
            <option value="DSTV">DSTV</option>
            <option value="GOTV">GOTV</option>
            <option value="Startimes">Startimes</option>
          </select>

          <select
            value={cablePlan}
            onChange={(e) => setCablePlan(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-slate-700 text-white"
          >
            <option value="Basic">Basic</option>
            <option value="Family">Family</option>
            <option value="Premium">Premium</option>
          </select>

          <input
            type="text"
            value={decoderNumber}
            onChange={(e) => setDecoderNumber(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-slate-700 text-white"
            placeholder="Enter Decoder Number"
          />
          <input
            type="number"
            value={cableAmount}
            onChange={(e) => setCableAmount(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-slate-700 text-white"
            placeholder="Enter Amount"
          />
          <input
            type="password"
            value={cablePin}
            onChange={(e) =>
              setCablePin(e.target.value.replace(/\D/g, "").slice(0, 4))
            }
            className="w-full mb-4 p-3 rounded bg-slate-700 text-white text-center tracking-widest text-xl"
            placeholder="••••"
            maxLength={4}
          />

          <button
            onClick={handleCablePurchase}
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition w-full"
          >
            Confirm
          </button>
        </div>
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
