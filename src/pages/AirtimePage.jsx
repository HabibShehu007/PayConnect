import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import AdSlider from "../components/AdSlider";
import NetworkDetector from "../components/NetworkDetector";

export default function AirtimePage() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const quickAmounts = [50, 100, 200, 500, 1000, 2000];

  return (
    <div className="bg-slate-900 min-h-screen text-white flex flex-col">
      <div className="max-w-lg w-full mx-auto flex-1 flex flex-col space-y-10 p-6">
        {/* Header Section */}
        <div className="flex items-center gap-3 ">
          <Link
            to="/dashboard"
            className="text-violet-400 hover:text-violet-300 transition"
          >
            <FiArrowLeft size={28} />
          </Link>
          <h1 className="text-2xl font-bold text-violet-400">Airtime</h1>
        </div>

        {/* AdSlider Section */}

        <AdSlider
          banners={[
            { img: "/images/airtime1.png", text: "Recharge instantly" },
            { img: "/images/airtime2.png", text: "Earn cashback" },
          ]}
        />

        {/* Phone Number Section */}
        <div className="bg-gray-100/10 rounded-lg p-5">
          <div className="bg-slate-800 rounded-xl shadow-lg flex items-center overflow-hidden">
            <NetworkDetector phone={phone} />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 p-4 bg-slate-700 text-white focus:outline-none text-lg"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {/* Quick Amount Section */}
        <div className="bg-gray-100/10 rounded-lg p-5">
          <h2 className="text-gray-300 mb-4 text-lg font-semibold">
            Quick Top‑Up
          </h2>
          <div className="grid grid-cols-3 gap-5">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt)}
                className="bg-slate-700 hover:bg-slate-600 text-violet-400 font-bold py-5 rounded-lg shadow-md transition text-lg"
              >
                ₦{amt}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount Section */}
        <div className="bg-gray-100/10 rounded-lg p-5">
          <h2 className="text-gray-300 mb-4 text-lg font-semibold">
            Enter Amount
          </h2>
          <div className="flex items-center bg-slate-800 rounded-lg shadow-lg overflow-hidden">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 p-4 bg-slate-700 text-white focus:outline-none text-lg"
              placeholder="Enter amount"
            />
            <button
              disabled={!phone || !amount}
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 text-lg transition"
            >
              Pay
            </button>
          </div>
        </div>

        {/* Bottom Padding */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
