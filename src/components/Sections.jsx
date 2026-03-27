// imports at the very top
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { useEffect } from "react";
import {
  FaMobileAlt,
  FaWifi,
  FaUniversity,
  FaBolt,
  FaWallet,
  FaChartLine,
  FaArrowDown,
  FaLock,
  FaHeadset,
  FaRocket,
  FaMoneyBillWave,
  FaStar,
  FaUsers,
  FaCreditCard,
  FaUserCircle,
} from "react-icons/fa";

// Section 1: Welcome
export default function WelcomeSection() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-900 to-slate-950 animate-pulse opacity-40" />

      {/* Logo Reveal */}
      <motion.img
        src="/images/logo.png"
        alt="PayConnect Logo"
        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          duration: 1,
        }}
        className="w-100 h-60 mb-6 drop-shadow-2xl relative z-10"
      />

      {/* Cinematic Headline with Stagger */}
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
        className="text-4xl sm:text-4xl lg:text-6xl font-extrabold text-center mb-4 relative z-10 leading-tight"
      >
        {["Welcome", "to", "PayConnect"].map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className={word === "PayConnect" ? "text-violet-400 mx-2" : "mx-2"}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      {/* Animated Typewriter with Glow */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="text-sm sm:text-lg lg:text-xl font-semibold text-center max-w-xs sm:max-w-md lg:max-w-xl leading-relaxed tracking-wide relative z-10"
      >
        <span className="bg-violet-300 bg-clip-text text-transparent drop-shadow-md animate-pulse">
          <Typewriter
            words={[
              "Buy Airtime instantly",
              "Affordable Data Bundles",
              "Pay Bills with ease",
              "Exam Payments made simple",
              "Track Wallet & History",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={10}
            deleteSpeed={10}
            delaySpeed={2500}
          />
        </span>
      </motion.p>

      {/* Key Icons Row (3 only) */}
      <div className="flex flex-row justify-center items-center gap-4 mt-8 relative z-10">
        {[
          { icon: <FaMobileAlt />, color: "bg-violet-600" }, // Airtime
          { icon: <FaWifi />, color: "bg-indigo-600" }, // Data
          { icon: <FaWallet />, color: "bg-teal-600" }, // Wallet
        ].map((item, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 3,
              delay: i * 0.3,
            }}
            whileHover={{ scale: 1.2 }}
            className={`${item.color} p-5 rounded-full shadow-lg text-white text-2xl cursor-pointer transition flex items-center justify-center w-16 h-16`}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Neon Scroll Down Arrow */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 text-violet-400 text-4xl drop-shadow-lg animate-pulse"
      >
        <FaArrowDown />
      </motion.div>
    </div>
  );
}

const features = [
  {
    title: "Airtime",
    description: "Buy airtime instantly for any network.",
    icon: <FaMobileAlt />,
    color: "bg-violet-600",
  },
  {
    title: "Data Bundles",
    description: "Affordable data bundles at your fingertips.",
    icon: <FaWifi />,
    color: "bg-indigo-600",
  },
  {
    title: "Bill Payments",
    description: "Pay electricity, water, and other bills with ease.",
    icon: <FaBolt />,
    color: "bg-cyan-600",
  },
  {
    title: "Exam Payments",
    description: "Make exam registrations and payments simple.",
    icon: <FaUniversity />,
    color: "bg-pink-600",
  },
  {
    title: "Wallet",
    description: "Track your wallet balance and transactions.",
    icon: <FaWallet />,
    color: "bg-teal-600",
  },
  {
    title: "History",
    description: "View your transaction history anytime.",
    icon: <FaChartLine />,
    color: "bg-emerald-600",
  },
];

// Section 2: Features Showcase

export function FeaturesSection() {
  return (
    <section className="min-h-screen bg-slate-900 text-white px-6 py-16 flex flex-col items-center justify-center">
      <h2 className="text-2xl sm:text-4xl font-bold mb-12 text-center">
        Our Services
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              duration: 0.8,
              delay: i * 0.15,
            }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-300"
          >
            <div
              className={`${feature.color} p-4 rounded-full text-white text-3xl mb-4 shadow-md`}
            >
              {feature.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const highlights = [
  {
    title: "Fast Transactions",
    description: "Instant airtime, data, and bill payments.",
    icon: <FaRocket />,
    color: "bg-violet-600",
  },
  {
    title: "Secure Payments",
    description: "Your data and money are protected with top security.",
    icon: <FaLock />,
    color: "bg-indigo-600",
  },
  {
    title: "24/7 Support",
    description: "We’re always here to help you anytime.",
    icon: <FaHeadset />,
    color: "bg-cyan-600",
  },
  {
    title: "Affordable Rates",
    description: "Enjoy the best deals and lowest charges.",
    icon: <FaMoneyBillWave />,
    color: "bg-teal-600",
  },
];

// Section 3 - Why Choose Us
export function AboutSection() {
  return (
    <section className="min-h-screen bg-slate-950 text-white px-6 py-16 flex flex-col items-center justify-center">
      <h2 className="text-2xl sm:text-4xl font-bold mb-12 text-center">
        Why Choose PayConnect?
      </h2>

      <div className="grid grid-cols-2 gap-8 w-full max-w-5xl">
        {highlights.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              delay: i * 0.2,
            }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-300"
          >
            <div
              className={`${item.color} p-4 rounded-full text-white text-3xl mb-4 shadow-md`}
            >
              {item.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AnimatedCounter({ value, duration = 2 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  // hook to detect visibility
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration });
      return controls.stop;
    }
  }, [inView, value, duration, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const stats = [
  { icon: <FaUsers />, label: "Users", value: 10000, color: "bg-violet-600" },
  { icon: <FaStar />, label: "Rating", value: 5, color: "bg-indigo-600" },
  {
    icon: <FaCreditCard />,
    label: "Transactions",
    value: 1000000,
    color: "bg-cyan-600",
  },
];

// Section 4 - Customer Stats
export function CustomerStatsSection() {
  return (
    <section className="min-h-screen bg-slate-900 text-white px-6 py-16 flex flex-col items-center justify-center">
      <h2 className="text-2xl sm:text-4xl font-bold mb-12 text-center">
        Trusted by Thousands
      </h2>

      <div className="flex flex-wrap justify-center gap-8 w-full max-w-5xl">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              delay: i * 0.2,
            }}
            viewport={{ once: true }}
            className={`${stat.color} p-6 rounded-xl shadow-lg flex flex-col items-center text-center w-40`}
          >
            <span className="text-3xl mb-2">{stat.icon}</span>
            <span className="text-2xl font-bold">
              <AnimatedCounter value={stat.value} />
              {stat.label !== "Rating" ? "+" : ""}
            </span>
            <span className="text-sm mt-1">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Aisha",
    feedback: "PayConnect makes buying data so easy. I love the speed!",
    rating: 5,
  },
  {
    name: "Emeka",
    feedback: "Bill payments are smooth and reliable. Highly recommend!",
    rating: 4,
  },
  {
    name: "Fatima",
    feedback: "Exam payments were stress-free. Thank you PayConnect!",
    rating: 5,
  },
  {
    name: "John",
    feedback: "Wallet tracking keeps me in control of my spending.",
    rating: 4,
  },
];

// Section 5 - Testimonials

export function TestimonialSection() {
  return (
    <section className="min-h-screen bg-slate-900 text-white px-6 py-16 flex flex-col items-center justify-center">
      <h2 className="text-2xl sm:text-4xl font-bold mb-12 text-center">
        What Our Customers Say
      </h2>

      <div className="grid grid-cols-2 gap-8 w-full max-w-5xl">
        {testimonials.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: [0, -10, 0] }} // floating animation
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 3,
              delay: i * 0.5,
            }}
            className="bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
          >
            {/* User Icon */}
            <FaUserCircle className="text-5xl text-violet-300 mb-4" />

            {/* Feedback */}
            <p className="text-gray-300 text-sm sm:text-base mb-4">
              "{item.feedback}"
            </p>

            {/* Star Rating */}
            <div className="flex text-yellow-400 mb-2">
              {Array(item.rating)
                .fill()
                .map((_, idx) => (
                  <FaStar key={idx} />
                ))}
            </div>

            {/* User Name */}
            <h3 className="text-lg font-semibold">{item.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-slate-800 text-white px-6 py-24 flex flex-col lg:flex-row items-center justify-center gap-12 relative">
      {/* Left Side: Image with looping scale-up reveal */}
      <motion.img
        src="/images/CTA.png"
        alt="Happy PayConnect Users"
        initial={{ opacity: 0.8, scale: 0.95 }}
        animate={{ opacity: [0.8, 1, 0.8], scale: [0.95, 1, 0.95] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="w-full lg:w-1/2 rounded-xl shadow-lg object-cover h-auto"
      />

      {/* Right Side: Text + CTA with looping fade/slide */}
      <motion.div
        initial={{ opacity: 0.8, y: 10 }}
        animate={{ opacity: [0.8, 1, 0.8], y: [10, 0, 10] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:w-1/2"
      >
        <h2 className="text-3xl sm:text-5xl font-bold text-violet-400">
          Ready to Get Started?
        </h2>
        <p className="text-gray-300 text-base sm:text-lg max-w-md">
          Join thousands of happy users enjoying seamless airtime, data, and
          bill payments with PayConnect.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 10px #7c3aed",
              "0 0 20px #7c3aed",
              "0 0 10px #7c3aed",
            ],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          onClick={() => navigate("/signup")}
        >
          Sign Up Now
        </motion.button>
      </motion.div>
    </section>
  );
}
