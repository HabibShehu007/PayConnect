import { FiSmartphone, FiWifi, FiZap, FiArrowRight } from "react-icons/fi";

export default function RecentActivity({ activities }) {
  return (
    <div className="bg-slate-900 text-white rounded-xl shadow-lg p-6 border border-violet-600 mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-violet-400">Recent Activity</h2>
        <a
          href="/transactions"
          className="flex items-center gap-2 text-violet-400 hover:text-violet-300 font-semibold"
        >
          View All <FiArrowRight size={18} />
        </a>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.slice(0, 2).map((activity, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-slate-800 p-4 rounded-lg"
          >
            {/* Left side: icon + title */}
            <div className="flex items-center gap-3">
              <span className="text-violet-400 text-2xl">{activity.icon}</span>
              <div>
                <p className="font-semibold">{activity.title}</p>
                <p className="text-gray-400 text-sm">{activity.date}</p>
              </div>
            </div>

            {/* Right side: amount */}
            <p className="font-bold text-green-400">₦{activity.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
