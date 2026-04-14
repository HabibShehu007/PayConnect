import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function BarChart({ data }) {
  const chartData = {
    labels: ["Airtime", "Data", "Utility", "Exam", "Credit", "Debit"],
    datasets: [
      {
        label: "Success",
        data: data.success,
        backgroundColor: "rgba(34,197,94,0.7)", // green
      },
      {
        label: "Pending",
        data: data.pending,
        backgroundColor: "rgba(234,179,8,0.7)", // yellow
      },
      {
        label: "Failed",
        data: data.failed,
        backgroundColor: "rgba(239,68,68,0.7)", // red
      },
    ],
  };

  return <Bar data={chartData} />;
}
