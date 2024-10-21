import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AttackSourcesGraph({ data }: { data: any }) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: "y",
    plugins: {
      legend: {
        display: true,
        labels: {
          font: { family: "Fira sans", size: 14 },
        },
      },
    },
  };

  return <Bar options={options} data={data} />;
}
