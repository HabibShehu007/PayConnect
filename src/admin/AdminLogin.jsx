import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiLoader } from "react-icons/fi";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null); // popup message
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (email === "payconnect@admin.com" && password === "admin12345") {
        setNotification({ type: "success", message: "Welcome Admin!" });
        setTimeout(() => {
          navigate("/admin-dashboard"); // route to AdminDashboard.jsx
        }, 1200);
      } else {
        setNotification({ type: "error", message: "Invalid credentials" });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative">
      {/* Notification Popup */}
      {notification && (
        <div
          className={`absolute top-6 right-6 px-4 py-2 rounded-lg shadow-lg text-white ${
            notification.type === "success" ? "bg-violet-600" : "bg-red-600"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-violet-400 mb-6 text-center">
          PayConnect Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div className="flex items-center bg-slate-700 rounded-lg px-3">
            <FiMail className="text-violet-400 mr-2" />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-transparent text-white focus:outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center bg-slate-700 rounded-lg px-3">
            <FiLock className="text-violet-400 mr-2" />
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-transparent text-white focus:outline-none"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            {loading ? <FiLoader className="animate-spin mr-2" /> : null}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
