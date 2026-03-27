import { Link } from "react-router-dom";

export default function Card({ icon, title, description, link }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-md border border-violet-600 hover:shadow-lg transition flex flex-col items-center text-center">
      {/* Icon */}
      <div className="text-violet-400 mb-4 text-5xl flex justify-center">
        {icon}
      </div>

      {/* Title + Description */}
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-400 mb-6">{description}</p>

      {/* Button */}
      <Link
        to={link}
        className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
      >
        Go to {title}
      </Link>
    </div>
  );
}
