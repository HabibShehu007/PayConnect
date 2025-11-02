import { motion } from "framer-motion";
import Mainlayouts from "../layouts/MainLayout";
import {
  FaMobileAlt,
  FaWifi,
  FaUniversity,
  FaBolt,
  FaWallet,
  FaChartLine,
  FaShieldAlt,
  FaRocket,
  FaUsers,
  FaGlobeAfrica,
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 12 },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function About() {
  return (
    <Mainlayouts>
      <div className="min-h-screen bg-gradient-to-br from-violet-600 to-pink-500 text-white font-sans pt-24 px-6 pb-16">
        {/* Hero Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-5xl font-extrabold tracking-wide mb-4 text-white">
            Welcome to PayConnect
          </h1>
          <p className="text-lg text-white/90 font-medium">
            Your all-in-one platform for managing airtime, data, bills, and
            wallet services — built for Nigeria, ready for Africa.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Our Mission
          </h2>
          <p className="text-white/90 text-lg leading-relaxed font-medium">
            We believe financial access should be fast, simple, and secure. Our
            mission is to empower every user — from students to entrepreneurs —
            with tools that make payments seamless, transparent, and accessible.
          </p>
        </motion.div>

        {/* Services Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-extrabold mb-8 text-center text-white">
            What You Can Do
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-center text-white">
            {[
              FaMobileAlt,
              FaWifi,
              FaUniversity,
              FaBolt,
              FaWallet,
              FaChartLine,
            ].map((Icon, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col items-center"
              >
                <Icon className="text-5xl mb-2" />
                <span className="font-semibold text-lg">
                  {
                    [
                      "Buy Airtime",
                      "Buy Data",
                      "Exam Payments",
                      "Utility Bills",
                      "Wallet Balance",
                      "Transaction History",
                    ][i]
                  }
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why PayConnect Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Why PayConnect?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white/90 text-lg font-medium">
            <div className="flex items-center gap-4">
              <FaShieldAlt className="text-3xl text-white" />
              <span>Secure & Fast Transactions</span>
            </div>
            <div className="flex items-center gap-4">
              <FaRocket className="text-3xl text-white" />
              <span>Built for Speed & Simplicity</span>
            </div>
            <div className="flex items-center gap-4">
              <FaUsers className="text-3xl text-white" />
              <span>Designed for Real People</span>
            </div>
            <div className="flex items-center gap-4">
              <FaGlobeAfrica className="text-3xl text-white" />
              <span>Made in Nigeria, Built for Africa</span>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Our Values
          </h2>
          <ul className="list-disc list-inside text-white/90 text-lg space-y-2 font-medium">
            <li>
              Trust — We protect your data and transactions with top-tier
              security.
            </li>
            <li>Innovation — We build tools that evolve with your needs.</li>
            <li>Accessibility — We serve users across Nigeria and beyond.</li>
            <li>Community — We grow with you, not just for you.</li>
          </ul>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Ready to simplify your payments?
          </h2>
          <button className="bg-white text-violet-700 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition">
            Get Started with PayConnect
          </button>
        </motion.div>
      </div>
    </Mainlayouts>
  );
}
