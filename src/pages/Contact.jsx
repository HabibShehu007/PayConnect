import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";

export default function Contact() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-pink-500 to-violet-600 text-white font-sans pt-24 px-6 pb-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-lg text-white/90 font-medium">
            This is the contact page — your direct line to PayConnect. Whether
            it’s feedback, support, or partnership inquiries, we’re here for
            you.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-white text-violet-700 p-8 rounded-3xl shadow-2xl space-y-6"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-violet-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-violet-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full border border-violet-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full border border-violet-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            type="submit"
            className="bg-violet-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-violet-700 transition"
          >
            Send Message
          </button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mt-16 text-center space-y-4 text-white/90 text-lg"
        >
          <div className="flex justify-center items-center gap-3">
            <FaEnvelope className="text-xl" />
            <span>support@payconnect.ng</span>
          </div>
          <div className="flex justify-center items-center gap-3">
            <FaPhoneAlt className="text-xl" />
            <span>+234 801 234 5678</span>
          </div>
          <div className="flex justify-center items-center gap-3">
            <FaWhatsapp className="text-xl" />
            <span>@payconnect</span>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mt-10 text-white text-4xl"
        >
          <FaInstagram className="hover:text-yellow-300 cursor-pointer" />
          <FaTwitter className="hover:text-yellow-300 cursor-pointer" />
          <FaWhatsapp className="hover:text-yellow-300 cursor-pointer" />
          <FaLinkedin className="hover:text-yellow-300 cursor-pointer" />
          <FaFacebook className="hover:text-yellow-300 cursor-pointer" />
        </motion.div>
      </div>
    </MainLayout>
  );
}
