import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/Card";
import BalanceCard from "../components/BalanceCard";
import RecentActivity from "../components/RecentActivity";
import InfoPanel from "../components/InfoPanel";
import AdSlider from "../components/AdSlider";
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
  return (
    <DashboardLayout user={user}>
      {/* Balance Card */}
      <BalanceCard balance="25,000.00" />

      {/* Recent Activity */}
      <RecentActivity activities={activities} />

      {/* Services Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-6 mt-6">
        <Card
          icon={<FiSmartphone />}
          title="Airtime"
          description="Buy airtime instantly."
          link="/airtime"
        />
        <Card
          icon={<FiWifi />}
          title="Data"
          description="Purchase data bundles."
          link="/data"
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
    </DashboardLayout>
  );
}
