import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import WalletBalanceCard from "../components/WalletBalanceCard";
import {
  FaMobileAlt,
  FaWifi,
  FaUniversity,
  FaBolt,
  FaWallet,
  FaChartLine,
  FaArrowUp,
  FaPaperPlane,
  FaMoneyBillWave,
} from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  { name: "Buy Airtime", icon: <FaMobileAlt />, key: "airtime" },
  { name: "Buy Data Bundle", icon: <FaWifi />, key: "data" },
  { name: "Exam Payments", icon: <FaUniversity />, key: "exams" },
  { name: "Utility Bills", icon: <FaBolt />, key: "bills" },
  { name: "Wallet Balance", icon: <FaWallet />, key: "wallet" },
  { name: "Transaction History", icon: <FaChartLine />, key: "history" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCardClick = (key) => {
    navigate(`/${key}`);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setWalletBalance(2500);
      setIsRefreshing(false);
    }, 2000);
  };

  const transactions = [
    {
      type: "Top Up",
      amount: 2500,
      date: "Nov 1, 2025",
      icon: <FaArrowUp />,
      color: "text-green-600",
    },
    {
      type: "Send",
      amount: -1000,
      date: "Oct 30, 2025",
      icon: <FaPaperPlane />,
      color: "text-red-500",
    },
    {
      type: "Withdraw",
      amount: -500,
      date: "Oct 28, 2025",
      icon: <FaMoneyBillWave />,
      color: "text-red-500",
    },
  ];

  return (
    <>
      <Hero userName="Habib" />

      {/* Wallet Section */}
      <div className="max-w-3xl mx-auto mb-6 px-4">
        <WalletBalanceCard
          balance={walletBalance}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          onTopUp={() => navigate("/wallet/topup")}
          onSend={() => navigate("/wallet/send")}
          onWithdraw={() => navigate("/wallet/withdraw")}
        />
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 14 }}
        className="max-w-3xl mx-auto mb-12 px-4 bg-white text-violet-700 rounded-xl p-6 shadow-xl"
      >
        <h3 className="text-xl font-black mb-4">Recent Transactions</h3>
        <ul className="space-y-4">
          {transactions.map((tx, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`text-2xl ${tx.color}`}>{tx.icon}</div>
                <div>
                  <p className="font-semibold">{tx.type}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
              </div>
              <p
                className={`font-bold ${
                  tx.amount < 0 ? "text-red-500" : "text-green-600"
                }`}
              >
                ₦{Math.abs(tx.amount).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 px-4">
        {services.map((service) => (
          <motion.div
            key={service.key}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleCardClick(service.key)}
            className="bg-white text-violet-700 p-6 rounded-3xl shadow-xl flex flex-col items-center cursor-pointer transition duration-300 hover:shadow-2xl hover:bg-pink-50"
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-lg font-semibold text-center">
              {service.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </>
  );
}
