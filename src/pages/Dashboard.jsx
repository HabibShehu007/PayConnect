import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/Card";

export default function Dashboard({ user }) {
  return (
    <DashboardLayout user={user}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card icon="📱" title="Airtime" description="Buy airtime instantly." />
        <Card icon="🌐" title="Data" description="Purchase data bundles." />
        <Card
          icon="💡"
          title="Bills"
          description="Pay electricity and other bills."
        />
      </div>
    </DashboardLayout>
  );
}
