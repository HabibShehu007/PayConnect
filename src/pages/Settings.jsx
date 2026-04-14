import { useState } from "react";
import {
  FiLock,
  FiKey,
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiArrowLeft,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Settings() {
  const [activeModal, setActiveModal] = useState(null);

  const cards = [
    { id: "password", title: "Change Password", icon: <FiLock /> },
    { id: "pin", title: "Change PIN", icon: <FiKey /> },
    { id: "profile", title: "Update Profile", icon: <FiUser /> },
    { id: "email", title: "Update Email", icon: <FiMail /> },
    { id: "phone", title: "Update Phone", icon: <FiPhone /> },
    { id: "security", title: "Security Settings", icon: <FiShield /> },
  ];

  const cardClasses =
    "bg-slate-700 rounded-xl shadow-lg p-6 text-center cursor-pointer hover:bg-slate-600 transition flex flex-col items-center";

  return (
    <div className="p-6 bg-slate-800 text-white min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/dashboard"
          className="text-violet-400 hover:text-violet-300 transition"
        >
          <FiArrowLeft size={28} />
        </Link>
        <h1 className="text-2xl font-bold text-violet-400">User Settings</h1>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className={cardClasses}
            onClick={() => setActiveModal(card.id)}
          >
            <div className="text-4xl mb-4 text-violet-400">{card.icon}</div>
            <h3 className="text-xl font-semibold">{card.title}</h3>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-slate-700 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold text-violet-400 mb-4">
              {cards.find((c) => c.id === activeModal)?.title}
            </h3>

            {/* Simple form prototype */}
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder={`Enter new ${activeModal}`}
                className="p-3 rounded-lg bg-slate-600 text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </form>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setActiveModal(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
