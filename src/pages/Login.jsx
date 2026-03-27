import { useState } from "react";
import { supabase } from "../supabaseClient";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setModalType("error");
        setModalMessage(error.message);
        setIsOpen(true);
        setLoading(false);
        return;
      }

      // Get user ID
      const userId = data.user?.id;
      if (userId) {
        const { data: profile, error: profileError } = await supabase
          .from("user_profile")
          .select("*")
          .eq("id", userId)
          .single();

        if (profileError) {
          setModalType("error");
          setModalMessage(
            "Login succeeded but profile fetch failed: " + profileError.message,
          );
          setIsOpen(true);
          setLoading(false);
          return;
        }

        // Success: show profile info
        setModalType("success");
        setModalMessage(`Welcome back, ${profile.full_name}!`);
        setIsOpen(true);

        // TODO: redirect to dashboard and pass profile data
      }

      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-10 rounded-2xl shadow-xl w-full max-w-lg border border-violet-600 space-y-6"
      >
        <h2 className="text-3xl font-bold text-violet-400 text-center mb-8">
          Welcome Back to PayConnect
        </h2>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            id="email"
            className="peer w-full p-3 rounded-lg bg-slate-800 text-white border border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder-transparent"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="email"
            className="absolute left-3 -top-2 text-sm text-violet-400 bg-slate-900 px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-violet-400"
          >
            Email
          </label>
        </div>

        {/* Password */}
        {/* Password */}
        <div className="relative space-y-2">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="peer w-full p-3 pr-12 rounded-lg bg-slate-800 text-white border border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder-transparent"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="password"
            className="absolute left-3 -top-2 text-sm text-violet-400 bg-slate-900 px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-violet-400"
          >
            Password
          </label>

          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-violet-400 hover:text-violet-300 transition"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* Submit Button with Spinner */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-lg font-semibold text-white shadow-md transition flex items-center justify-center"
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Login"
          )}
        </button>

        {/* Signup Link */}
        <p className="text-center text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-violet-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type={modalType}
        message={modalMessage}
      />
    </div>
  );
}
