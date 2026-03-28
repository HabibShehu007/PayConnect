import { Link } from "react-router-dom";

export default function Card({ icon, title, description, link }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Mobile Bubble (3 per row, compact) */}
      <div className="sm:hidden flex flex-col items-center">
        <Link
          to={link}
          className="bg-violet-700 text-white rounded-full w-20 h-20 flex items-center justify-center shadow-md transition hover:scale-105"
        >
          <span className="text-2xl">{icon}</span>
        </Link>
        <p className="mt-2 text-xs font-semibold text-gray-200">{title}</p>
      </div>

      {/* Desktop/Tablet Card */}
      <div className="hidden sm:flex flex-col items-center bg-slate-800 p-6 rounded-xl shadow-md border border-violet-600 hover:shadow-lg transition w-full">
        <div className="text-violet-400 mb-4 text-5xl">{icon}</div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-400 mb-6">{description}</p>
        <Link
          to={link}
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
        >
          Go to {title}
        </Link>
      </div>
    </div>
  );
}
