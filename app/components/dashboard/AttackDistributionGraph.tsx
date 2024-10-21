import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, ArcElement, Tooltip, Legend, CategoryScale);

export default function AttackDistributionGraph({ data }: { data: any }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          font: { family: "Fira sans", size: 16 },
        },
      },
    },
  };

  return <Doughnut options={options} data={data} />;
}
