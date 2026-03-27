export default function Card({ icon, title, description }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-md border border-violet-600 hover:shadow-lg transition">
      <div className="text-violet-400 mb-4 text-3xl">{icon}</div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
