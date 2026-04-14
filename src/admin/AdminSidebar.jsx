import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiActivity,
  FiCreditCard,
  FiLogOut,
} from "react-icons/fi";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Overview", path: "/admin-dashboard", icon: <FiHome /> },
    { name: "Users", path: "/admin-users", icon: <FiUsers /> },
    { name: "Activities", path: "/admin-activities", icon: <FiActivity /> },
    {
      name: "Transactions",
      path: "/admin-transactions",
      icon: <FiCreditCard />,
    },
  ];

  const handleLogout = () => {
    // Clear any admin session if needed
    navigate("/admin-login");
  };

  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col shadow-lg">
      <div className="p-6 text-center border-b border-slate-700">
        <h1 className="text-2xl font-bold text-violet-400">PayConnect Admin</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-violet-600 text-white"
                : "text-gray-300 hover:bg-slate-800 hover:text-violet-400"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
}
