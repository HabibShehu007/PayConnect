import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ data }) {
  const chartData = {
    labels: ["Success", "Pending", "Failed"],
    datasets: [
      {
        data: [data.success, data.pending, data.failed],
        backgroundColor: [
          "rgba(34,197,94,0.7)", // green
          "rgba(234,179,8,0.7)", // yellow
          "rgba(239,68,68,0.7)", // red
        ],
      },
    ],
  };

  return <Doughnut data={chartData} />;
}
