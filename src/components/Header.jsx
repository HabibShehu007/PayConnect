import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
    { name: "Contact", path: "/contact", icon: <FaEnvelope /> },
  ];

  return (
    <header className="bg-white/10 backdrop-blur-md text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <h1 className="text-2xl font-bold">PayConnect</h1>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="flex items-center gap-2 hover:text-yellow-300 transition font-semibold"
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-2xl"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
            className="absolute top-16 right-0 bg-violet-700 w-64 rounded-l-xl p-4 flex flex-col space-y-4 text-white font-semibold md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-violet-600 transition"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
