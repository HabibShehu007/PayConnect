import {
  FiX,
  FiUser,
  FiSettings,
  FiCreditCard,
  FiBell,
  FiHelpCircle,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../supabaseClient";

export default function DashboardHeader() {
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("user_profile")
          .select("full_name, avatar_url")
          .eq("id", user.id)
          .single();

        if (!error && data) {
          setFullName(data.full_name);
          setAvatarUrl(data.avatar_url); // 👈 store avatar
        }
      }
    };
    fetchProfile();
  }, []);

  return (
    <header className="flex justify-between items-center bg-slate-900 px-6 py-4 border-b border-violet-600 relative">
      {/* Greeting */}
      <h1 className="text-lg font-semibold text-violet-400">
        Hi, {fullName || "User"}
      </h1>

      {/* Hamburger Menu */}
      <button
        onClick={() => setOpen(true)}
        className="text-violet-400 hover:text-violet-300 transition"
      >
        <FiMenu size={24} />
      </button>

      {/* Slide-in Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 h-full w-64 bg-slate-900 border-l-2 border-violet-600 z-50 p-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="self-end text-violet-400 hover:text-violet-300 transition"
              >
                <FiX size={28} />
              </button>

              {/* Profile Section */}
              <div className="flex flex-col items-center mt-4 mb-6">
                <img
                  src={
                    avatarUrl ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile Avatar"
                  className="w-20 h-20 rounded-full border-2 border-violet-600 shadow-md object-cover"
                />

                <p className="mt-2 text-white font-semibold">
                  {fullName || "User"}
                </p>
              </div>

              {/* Links */}
              <nav className="flex flex-col space-y-4">
                <a
                  href="/profile"
                  className="flex items-center gap-3 text-violet-400 hover:text-violet-300 font-semibold transition"
                >
                  <FiUser size={20} /> Profile
                </a>
                <hr className="border-violet-600/40" />

                <a
                  href="/settings"
                  className="flex items-center gap-3 text-violet-400 hover:text-violet-300 font-semibold transition"
                >
                  <FiSettings size={20} /> Settings
                </a>
                <hr className="border-violet-600/40" />

                <a
                  href="/transactions"
                  className="flex items-center gap-3 text-violet-400 hover:text-violet-300 font-semibold transition"
                >
                  <FiCreditCard size={20} /> Transactions
                </a>
                <hr className="border-violet-600/40" />

                <a
                  href="/notifications"
                  className="flex items-center gap-3 text-violet-400 hover:text-violet-300 font-semibold transition"
                >
                  <FiBell size={20} /> Notifications
                </a>
                <hr className="border-violet-600/40" />

                <a
                  href="/help"
                  className="flex items-center gap-3 text-violet-400 hover:text-violet-300 font-semibold transition"
                >
                  <FiHelpCircle size={20} /> Help
                </a>
                <hr className="border-violet-600/40" />

                <a
                  href="/logout"
                  className="flex items-center gap-3 text-violet-400 hover:text-violet-300 font-semibold transition"
                >
                  <FiLogOut size={20} /> Logout
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
