import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // toggle after 50px scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-colors duration-500 backdrop-blur-md shadow-md
        ${scrolled ? "bg-violet-700 bg-opacity-95" : "bg-slate-950 bg-opacity-90"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="PayConnect Logo"
            className="w-10 h-10"
          />
          <span className="font-bold text-lg text-white">PayConnect</span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          <Link
            to="/login"
            className={`px-4 py-2 rounded-lg border transition
              ${
                scrolled
                  ? "border-white text-white hover:bg-white hover:text-violet-700"
                  : "border-violet-500 text-violet-400 hover:bg-violet-600 hover:text-white"
              }`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`px-4 py-2 rounded-lg font-semibold transition
              ${
                scrolled
                  ? "bg-white text-violet-700 hover:bg-gray-200"
                  : "bg-violet-600 text-white hover:bg-violet-700"
              }`}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
