import { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import AdSlider from "../components/AdSlider";
import Modal from "../components/Modal";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

// MTN Data Plans
const mtnPlans = {
  daily: [
    { name: "100MB Daily", price: 100 },
    { name: "200MB Daily", price: 200 },
    { name: "500MB Daily", price: 300 },
    { name: "1GB Daily", price: 500 },
    { name: "2GB Daily", price: 700 },
    { name: "5GB Daily", price: 1000 },
  ],
  weekly: [
    { name: "1GB Weekly", price: 500 },
    { name: "2GB Weekly", price: 800 },
    { name: "5GB Weekly", price: 1500 },
    { name: "10GB Weekly", price: 2500 },
    { name: "15GB Weekly", price: 3500 },
    { name: "20GB Weekly", price: 4500 },
  ],
  monthly: [
    { name: "2GB Monthly", price: 1000 },
    { name: "5GB Monthly", price: 2000 },
    { name: "10GB Monthly", price: 3500 },
    { name: "20GB Monthly", price: 6000 },
    { name: "40GB Monthly", price: 10000 },
    { name: "100GB Monthly", price: 20000 },
  ],
};

export default function DataPage() {
  const [network, setNetwork] = useState("MTN"); // ✅ define network state
  const [planType, setPlanType] = useState("daily");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [phone, setPhone] = useState("");
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
      const { data } = await supabase.auth.getUser();
      const id = data?.user?.id;
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
    if (!phone || !selectedPlan) return;

    const amt = selectedPlan.price;

    if (balance < amt) {
      setModalType("error");
      setModalMessage("Insufficient balance to complete this purchase.");
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
    } else {
      setBalance(newBalance);
      setModalType("success");
      setModalMessage(
        `Data purchase successful: ${selectedPlan.name} for ₦${amt}`,
      );
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
          <h1 className="text-2xl font-bold text-violet-400">Data</h1>
        </div>

        {/* Ads */}
        <AdSlider
          banners={[
            { img: "/images/data1.png", text: "Buy data instantly" },
            { img: "/images/data2.png", text: "Stay connected always" },
          ]}
        />

        {/* Network Provider Row */}
        <div className="grid grid-cols-4 gap-4">
          {["MTN", "Airtel", "Glo", "9mobile"].map((net) => (
            <button
              key={net}
              onClick={() => setNetwork(net)} // for now only MTN has plans wired
              className={`p-4 rounded-lg shadow-md font-bold text-center transition ${
                network === net
                  ? "bg-violet-600 text-white"
                  : "bg-slate-700 text-violet-400"
              }`}
            >
              {net}
            </button>
          ))}
        </div>

        {/* Plan Type Toggle */}
        <div className="bg-gray-100/10 rounded-lg p-5 flex gap-4">
          {["daily", "weekly", "monthly"].map((type) => (
            <button
              key={type}
              onClick={() => setPlanType(type)}
              className={`flex-1 py-3 rounded-lg font-semibold ${
                planType === type
                  ? "bg-violet-600 text-white"
                  : "bg-slate-700 text-violet-400"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-3 gap-5">
          {mtnPlans[planType].map((plan) => (
            <button
              key={plan.name}
              onClick={() => setSelectedPlan(plan)}
              className={`p-4 rounded-lg shadow-md transition text-center ${
                selectedPlan?.name === plan.name
                  ? "bg-violet-600 text-white"
                  : "bg-slate-700 text-violet-400"
              }`}
            >
              <p className="font-bold">
                {network} {plan.name}
              </p>
              <p>₦{plan.price}</p>
            </button>
          ))}
        </div>

        {/* Recipient Phone */}
        <div className="bg-gray-100/10 rounded-lg p-5">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-4 bg-slate-700 text-white focus:outline-none text-lg rounded-lg"
            placeholder="Enter recipient phone number"
          />
        </div>

        {/* Pay Button */}
        <button
          disabled={!phone || !selectedPlan}
          onClick={() => setShowPinModal(true)}
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 text-lg transition rounded-lg"
        >
          Pay
        </button>

        <div className="h-20"></div>
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
