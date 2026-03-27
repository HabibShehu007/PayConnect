import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/Card";
import {
  FiSmartphone,
  FiWifi,
  FiBookOpen,
  FiZap,
  FiCreditCard,
  FiHelpCircle,
} from "react-icons/fi";

export default function Dashboard({ user }) {
  return (
    <DashboardLayout user={user}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <Card
          icon={<FiSmartphone />}
          title="Airtime"
          description="Buy airtime instantly for any network."
          link="/airtime"
        />
        <Card
          icon={<FiWifi />}
          title="Data"
          description="Purchase affordable data bundles."
          link="/data"
        />
        <Card
          icon={<FiBookOpen />}
          title="Exams"
          description="Pay for exam registrations like WAEC, JAMB, etc."
          link="/exams"
        />
        <Card
          icon={<FiZap />}
          title="Utility"
          description="Pay electricity, water, and other utility bills."
          link="/utility"
        />
        <Card
          icon={<FiCreditCard />}
          title="Transactions"
          description="View and manage your transaction history."
          link="/transactions"
        />
        <Card
          icon={<FiHelpCircle />}
          title="Support"
          description="Get help and support when you need it."
          link="/support"
        />
      </div>
    </DashboardLayout>
  );
}
