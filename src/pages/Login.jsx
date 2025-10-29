import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setShowError(true);
      return;
    }

    // TODO: Connect to backend for login
    console.log("Login Data:", form);
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    navigate("/dashboard");
  };

  const closeError = () => {
    setShowError(false);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center px-6 font-sans text-white relative">
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ type: "spring", bounce: 0.6, duration: 0.6 }}
              className="bg-white text-green-600 p-8 rounded-2xl shadow-xl text-center max-w-sm w-full"
            >
              <FaCheckCircle className="text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">Welcome Back!</h3>
              <p className="text-gray-700 mb-6">
                Login successful. Redirecting to dashboard...
              </p>
              <button
                onClick={closeSuccess}
                className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition cursor-pointer"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ type: "spring", bounce: 0.6, duration: 0.6 }}
              className="bg-white text-red-600 p-8 rounded-2xl shadow-xl text-center max-w-sm w-full"
            >
              <h3 className="text-2xl font-bold mb-2">Login Failed</h3>
              <p className="text-gray-700 mb-6">
                Please enter valid credentials.
              </p>
              <button
                onClick={closeError}
                className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition cursor-pointer"
              >
                Try Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <FaSignInAlt className="text-4xl text-white mb-4 mx-auto" />
        <h2 className="text-3xl font-extrabold mb-2">Log In</h2>
        <p className="text-white/80 mb-6">
          Access your PayConnect dashboard and manage your services.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 rounded bg-white text-black placeholder-gray-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded bg-white text-black placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-violet-600 font-semibold py-3 rounded hover:bg-pink-100 transition cursor-pointer"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-sm text-white/80">
          Forgot your password?{" "}
          <button
            onClick={() => navigate("/reset-password")}
            className="underline font-semibold cursor-pointer"
          >
            Reset Password
          </button>
        </p>

        <p className="mt-2 text-sm text-white/80">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="underline font-semibold cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
