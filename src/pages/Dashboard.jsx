import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/Card";
import BalanceCard from "../components/BalanceCard";
import RecentActivity from "../components/RecentActivity";
import InfoPanel from "../components/InfoPanel";
import AdSlider from "../components/AdSlider";
import Modal from "../components/Modal";

import {
  FiSmartphone,
  FiWifi,
  FiBookOpen,
  FiZap,
  FiCreditCard,
  FiHelpCircle,
} from "react-icons/fi";

const activities = [
  {
    icon: <FiSmartphone />,
    title: "Airtime Purchase",
    amount: "500",
    date: "Mar 27, 2026",
  },
  {
    icon: <FiWifi />,
    title: "Data Bundle",
    amount: "2000",
    date: "Mar 26, 2026",
  },
];

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const userBalance = user?.wallet_balance || 0;
  const [isRestricted, setIsRestricted] = useState(false);

  // Handler for restricted pages
  const handleRestrictedNav = (path) => {
    if (userBalance < 50) {
      setIsRestricted(true);
    } else {
      navigate(path);
    }
  };

  return (
    <DashboardLayout user={user}>
      {/* Balance Card */}
      <BalanceCard />

      {/* Recent Activity */}
      <RecentActivity activities={activities} />

      {/* Services Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-6 mt-6">
        <Card
          icon={<FiSmartphone />}
          title="Airtime"
          description="Buy airtime instantly."
          onClick={() => handleRestrictedNav("/airtime")}
        />
        <Card
          icon={<FiWifi />}
          title="Data"
          description="Purchase data bundles."
          onClick={() => handleRestrictedNav("/data")}
        />
        <Card
          icon={<FiBookOpen />}
          title="Exams"
          description="Pay for exam registrations."
          link="/exams"
        />
        <Card
          icon={<FiZap />}
          title="Utility"
          description="Pay electricity and bills."
          link="/utility"
        />
        <Card
          icon={<FiCreditCard />}
          title="Transactions"
          description="View transaction history."
          link="/transactions"
        />
        <Card
          icon={<FiHelpCircle />}
          title="Support"
          description="Get help and support."
          link="/support"
        />
      </div>

      <InfoPanel />
      <AdSlider />

      {/* Restriction Modal */}
      <Modal
        isOpen={isRestricted}
        onClose={() => setIsRestricted(false)}
        type="error"
        title="Insufficient Balance"
        message="You need at least ₦50 in your wallet to buy airtime or data."
      >
        <button
          onClick={() => {
            setIsRestricted(false);
            // 👉 Trigger Flutterwave top-up flow here
          }}
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          Fund Wallet Now
        </button>
      </Modal>
    </DashboardLayout>
  );
}
