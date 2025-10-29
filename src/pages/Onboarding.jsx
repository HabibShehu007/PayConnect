import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  FaMobileAlt,
  FaWifi,
  FaUniversity,
  FaBolt,
  FaWallet,
  FaChartLine,
} from "react-icons/fa";

const steps = [
  {
    title: "Buy Airtime & Data 💡",
    description:
      "Top up any network instantly and get affordable data bundles.",
    services: [
      {
        name: "Buy Airtime",
        desc: "Recharge any mobile network.",
        icon: <FaMobileAlt />,
      },
      {
        name: "Buy Data",
        desc: "Get fast, affordable bundles.",
        icon: <FaWifi />,
      },
    ],
  },
  {
    title: "Pay Bills & Exams 📚",
    description:
      "Settle WAEC, NECO, JAMB, electricity, and water bills with ease.",
    services: [
      {
        name: "Exam Payments",
        desc: "WAEC, NECO, JAMB.",
        icon: <FaUniversity />,
      },
      {
        name: "Utility Bills",
        desc: "Electricity, water, and more.",
        icon: <FaBolt />,
      },
    ],
  },
  {
    title: "Track Wallet & History 📊",
    description:
      "Monitor your balance, transactions, and get notified instantly.",
    services: [
      {
        name: "Wallet Balance",
        desc: "Check and top up anytime.",
        icon: <FaWallet />,
      },
      {
        name: "Transaction History",
        desc: "View all your activity.",
        icon: <FaChartLine />,
      },
    ],
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { title, description, services } = steps[step];

  const handleNext = () => {
    if (step === steps.length - 1) {
      navigate("/auth");
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-pink-500 to-violet-600 text-white flex flex-col items-center justify-center px-6 font-sans">
      <Motion.div
        key={step}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <h1 className="text-4xl font-extrabold mb-4 leading-tight tracking-tight">
          {title}
        </h1>
        <p className="text-lg mb-8 text-white/90 leading-relaxed">
          {description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {services.map((service, index) => (
            <Motion.div
              key={`${step}-${index}`}
              whileHover={{ scale: 1.05 }}
              className="bg-white text-pink-600 p-5 rounded-xl shadow-md flex flex-col items-center"
            >
              <div className="text-3xl mb-2 text-violet-600">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-1">{service.name}</h3>
              <p className="text-sm text-center text-pink-500">
                {service.desc}
              </p>
            </Motion.div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="bg-white text-violet-600 px-6 py-2 rounded-full font-semibold hover:bg-pink-100 transition"
        >
          {step === steps.length - 1 ? "Get Started" : "Next"}
        </button>
      </Motion.div>
    </div>
  );
}
