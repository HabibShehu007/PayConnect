import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AuthGateway() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center px-6 font-sans text-white">
      <div className="text-center max-w-xl w-full">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight tracking-tight">
          Welcome to <span className="text-white/90">PayConnect</span> 🚀
        </h1>
        <p className="text-lg text-white/80 mb-10 leading-relaxed">
          Your all-in-one platform for airtime, data, bills, and seamless
          payments.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            onClick={() => navigate("/signup")}
            className="cursor-pointer bg-white text-pink-600 py-6 px-6 rounded-2xl font-semibold flex flex-col items-center justify-center gap-3 shadow-lg hover:bg-pink-100 transition"
          >
            <FaUserPlus className="text-3xl" />
            <span className="text-lg">Sign Up</span>
          </div>

          <div
            onClick={() => navigate("/login")}
            className="cursor-pointer bg-white text-violet-600 py-6 px-6 rounded-2xl font-semibold flex flex-col items-center justify-center gap-3 shadow-lg hover:bg-violet-100 transition"
          >
            <FaSignInAlt className="text-3xl" />
            <span className="text-lg">Log In</span>
          </div>
        </div>
      </div>
    </div>
  );
}
