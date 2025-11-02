import { useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaBriefcase,
  FaUser,
  FaVenusMars,
  FaBirthdayCake,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [profile, setProfile] = useState({
    name: "Habib",
    username: "habibconnect",
    email: "habib@example.com",
    phone: "+234 801 234 5678",
    gender: "Male",
    dob: "1995-08-12",
    accountType: "Premium",
  });

  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    setProfile(formData);
    setIsModalOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-violet-600 to-pink-500 text-white font-sans pt-24 px-6 pb-16">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Your Profile</h1>

      <div className="w-full max-w-4xl bg-white text-violet-700 p-8 rounded-3xl shadow-2xl">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center mb-8">
          <FaUserCircle className="text-[8rem] text-violet-400 mb-4" />
          <h2 className="text-3xl font-bold">{profile.name}</h2>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 text-lg">
          <div className="flex items-center gap-3">
            <FaUser className="text-xl" />
            <span>
              <strong>Username:</strong> {profile.username}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-xl" />
            <span>
              <strong>Email:</strong> {profile.email}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-xl" />
            <span>
              <strong>Phone:</strong> {profile.phone}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FaVenusMars className="text-xl" />
            <span>
              <strong>Gender:</strong> {profile.gender}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FaBirthdayCake className="text-xl" />
            <span>
              <strong>Date of Birth:</strong> {profile.dob}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FaBriefcase className="text-xl" />
            <span>
              <strong>Account Type:</strong> {profile.accountType}
            </span>
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-violet-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-violet-700 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white text-violet-700 p-6 rounded-2xl shadow-2xl w-full max-w-md"
            >
              <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-violet-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full border border-violet-300 rounded px-3 py-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border border-violet-300 rounded px-3 py-2"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border border-violet-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Gender"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-full border border-violet-300 rounded px-3 py-2"
                />
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                  className="w-full border border-violet-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Account Type"
                  value={formData.accountType}
                  onChange={(e) =>
                    setFormData({ ...formData, accountType: e.target.value })
                  }
                  className="w-full border border-violet-300 rounded px-3 py-2"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded bg-violet-600 text-white hover:bg-violet-700"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg z-50"
          >
            🎉 Profile updated successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
