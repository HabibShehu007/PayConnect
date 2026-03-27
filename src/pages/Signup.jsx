import { useState } from "react";
import { supabase } from "../supabaseClient";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      if (password !== confirmPassword) {
        setModalType("error");
        setModalMessage("Passwords do not match!");
        setIsOpen(true);
        setLoading(false);
        return;
      }

      // Create user in auth
      const { data, error } = await supabase.auth.signUp({
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

      // Insert into user_profile table
      const userId = data.user?.id;
      if (userId) {
        const { error: profileError } = await supabase
          .from("user_profile")
          .insert({
            id: userId,
            full_name: fullName,
            phone_number: phone,
          });

        if (profileError) {
          setModalType("error");
          setModalMessage(
            "Signup succeeded but profile insert failed: " +
              profileError.message,
          );
          setIsOpen(true);
          setLoading(false);
          return;
        }
      }

      setModalType("success");
      setModalMessage("Account created successfully! You can now log in.");
      setIsOpen(true);
      setLoading(false);
    }, 2000);
  };

  const getPasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return { label: "Weak", color: "bg-red-500" };
    if (strength === 2) return { label: "Not Bad", color: "bg-yellow-500" };
    if (strength >= 3) return { label: "Strong", color: "bg-green-500" };
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

          {/* Strength Bar */}
          {password && (
            <div className="w-full h-2 rounded bg-slate-700 overflow-hidden">
              <div
                className={`h-2 ${getPasswordStrength(password).color} transition-all duration-500 ease-in-out`}
                style={{
                  width: `${
                    getPasswordStrength(password).label === "Weak"
                      ? 33
                      : getPasswordStrength(password).label === "Not Bad"
                        ? 66
                        : 100
                  }%`,
                }}
              ></div>
            </div>
          )}
          {password && (
            <p className="text-sm text-gray-400 transition-colors duration-500">
              Strength: {getPasswordStrength(password).label}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            className="peer w-full p-3 pr-12 rounded-lg bg-slate-800 text-white border border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder-transparent"
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

          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-violet-400 hover:text-violet-300 transition"
          >
            {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
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
        onClose={() => {
          if (modalType === "success") {
            setRedirecting(true);
            // Wait 1 second with spinner before redirect
            setTimeout(() => {
              setRedirecting(false);
              navigate("/login");
            }, 1000);
          } else {
            setIsOpen(false);
          }
        }}
        type={modalType}
        message={redirecting ? "Redirecting to login..." : modalMessage}
        showSpinner={redirecting}
      />
    </div>
  );
}
