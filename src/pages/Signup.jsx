import { useState } from "react";
import { supabase } from "../supabaseClient";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate 2s spinner before feedback
    setTimeout(async () => {
      if (password !== confirmPassword) {
        setModalType("error");
        setModalMessage("Passwords do not match!");
        setIsOpen(true);
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone_number: phone,
          },
        },
      });

      if (error) {
        setModalType("error");
        setModalMessage(error.message);
        setIsOpen(true);
      } else {
        setModalType("success");
        setModalMessage("Account created successfully! You can now log in.");
        setIsOpen(true);
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
      <form
        onSubmit={handleSignup}
        className="bg-slate-900 p-10 rounded-2xl shadow-xl w-full max-w-lg border border-violet-600 space-y-6"
      >
        <h2 className="text-3xl font-bold text-violet-400 text-center mb-8">
          Create Your PayConnect Account
        </h2>

        {/* Floating Label Inputs */}
        {/* Full Name */}
        <div className="relative">
          <input
            type="text"
            id="fullName"
            className="peer w-full p-3 rounded-lg bg-slate-800 text-white border border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder-transparent"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label
            htmlFor="fullName"
            className="absolute left-3 -top-2 text-sm text-violet-400 bg-slate-900 px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-violet-400"
          >
            Full Name
          </label>
        </div>

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

        {/* Phone */}
        <div className="relative">
          <input
            type="tel"
            id="phone"
            className="peer w-full p-3 rounded-lg bg-slate-800 text-white border border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder-transparent"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label
            htmlFor="phone"
            className="absolute left-3 -top-2 text-sm text-violet-400 bg-slate-900 px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-violet-400"
          >
            Phone Number
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type="password"
            id="password"
            className="peer w-full p-3 rounded-lg bg-slate-800 text-white border border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder-transparent"
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
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type="password"
            id="confirmPassword"
            className="peer w-full p-3 rounded-lg bg-slate-800 text-white border border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder-transparent"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label
            htmlFor="confirmPassword"
            className="absolute left-3 -top-2 text-sm text-violet-400 bg-slate-900 px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-violet-400"
          >
            Confirm Password
          </label>
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
            "Sign Up"
          )}
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-400 hover:underline">
            Login
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
