import DashboardHeader from "../components/DashboardHeader";

export default function DashboardLayout({ children, user }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Dashboard Header */}
      <DashboardHeader user={user} />

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
