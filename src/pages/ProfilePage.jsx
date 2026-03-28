import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiGlobe,
  FiHome,
  FiPlusCircle,
  FiArrowLeft,
  FiCamera,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("user_profile")
        .select(
          "full_name, phone_number, location, nin, state, lga, avatar_url",
        )
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setProfile({ ...data, email: user.email });
      } else {
        setProfile({ email: user.email });
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      value: profile?.full_name,
      icon: <FiUser />,
    },
    { key: "email", label: "Email", value: profile?.email, icon: <FiMail /> },
    {
      key: "phone_number",
      label: "Phone",
      value: profile?.phone_number,
      icon: <FiPhone />,
    },
    {
      key: "location",
      label: "Location",
      value: profile?.location,
      icon: <FiMapPin />,
    },
    { key: "nin", label: "NIN", value: profile?.nin, icon: <FiFileText /> },
    { key: "state", label: "State", value: profile?.state, icon: <FiGlobe /> },
    { key: "lga", label: "LGA", value: profile?.lga, icon: <FiHome /> },
  ];

  const handleAddClick = (fieldKey) => {
    setCurrentField(fieldKey);
    setInputValue("");
    setShowModal(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("user_profile")
      .update({ [currentField]: inputValue })
      .eq("id", user.id);

    if (!error) {
      await fetchProfile();
      setShowModal(false);
      setSuccessMessage(
        `${currentField.replace("_", " ")} updated successfully!`,
      );
      setTimeout(() => setSuccessMessage(""), 3000);
    }
    setLoading(false);
  };

  const handleAvatarUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Upload to Supabase storage
      const filePath = `avatars/${user.id}-${Date.now()}.png`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
      const avatarUrl = urlData.publicUrl;

      // Update user_profile table
      const { error: updateError } = await supabase
        .from("user_profile")
        .update({ avatar_url: avatarUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      await fetchProfile();
      setSuccessMessage("🎉 Profile picture updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Upload error:", err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 bg-slate-900 min-h-screen text-white">
      {/* Back Button */}
      <div className="flex justify-start mb-6">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 px-5 py-2 rounded-full font-semibold shadow-md transition transform hover:scale-105"
        >
          <FiArrowLeft size={20} /> Back
        </Link>
      </div>

      {/* Avatar + Info Card */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-8 relative"
        >
          <img
            src={
              profile?.avatar_url ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile Avatar"
            className="w-28 h-28 rounded-full border-2 border-violet-600 shadow-lg mb-4 object-cover"
          />
          {/* Upload Button */}
          <label className="absolute top-2 right-2 bg-violet-600 p-2 rounded-full cursor-pointer hover:bg-violet-700 transition shadow-md">
            <FiCamera className="text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </label>

          <h1 className="text-2xl font-bold text-violet-400">
            {profile?.full_name || "User"}
          </h1>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-3xl bg-slate-800 rounded-2xl shadow-xl p-6 border border-violet-600"
        >
          <h2 className="text-violet-400 font-semibold text-lg mb-6 border-b border-violet-600 pb-2">
            Profile Information
          </h2>

          <div className="space-y-4">
            {fields.map((field, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-slate-700 p-4 rounded-lg hover:bg-slate-600 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-violet-400 text-xl">{field.icon}</span>
                  <span className="font-semibold">{field.label}:</span>
                  <span className="text-gray-200">
                    {field.value || "Not provided"}
                  </span>
                </div>
                {!field.value && (
                  <button
                    onClick={() => handleAddClick(field.key)}
                    className="flex items-center gap-1 text-violet-400 hover:text-violet-300 transition"
                  >
                    <FiPlusCircle /> Add
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      {/* Modal for adding missing fields */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 p-6 rounded-xl shadow-lg w-80 border border-violet-600"
          >
            <h3 className="text-violet-400 font-semibold mb-4">
              Add {currentField.replace("_", " ")}
            </h3>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 mb-4"
              placeholder={`Enter ${currentField.replace("_", " ")}`}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition flex items-center gap-2"
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    ></path>
                  </svg>
                )}
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Loading Overlay for Avatar Upload */}
      {uploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800 p-6 rounded-xl shadow-lg flex items-center gap-3 text-violet-400"
          >
            <svg
              className="animate-spin h-6 w-6 text-violet-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
              ></path>
            </svg>
            <span>Uploading photo...</span>
          </motion.div>
        </div>
      )}

      {/* Success Popup */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          {successMessage}
        </motion.div>
      )}
    </div>
  );
}
