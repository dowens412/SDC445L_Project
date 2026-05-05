import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SplitChart = ({ splits }) => {
  const labels = splits;

  const dataValues = splits.map((split) => {
    const name = split.toLowerCase();

    if (name.includes("full")) return 3;
    if (name.includes("upper")) return 4;
    if (name.includes("push")) return 6;
    if (name.includes("bro")) return 5;
    if (name.includes("3 day")) return 3;
    if (name.includes("4 day")) return 4;
    if (name.includes("5 day")) return 5;
    if (name.includes("strength")) return 4;
    if (name.includes("power")) return 4;
    if (name.includes("hybrid")) return 5;

    return 4;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Recommended Days Per Week",
        data: dataValues,
        backgroundColor: "#4f7cff",
        borderColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw} recommended training days per week`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "#333a46",
        },
      },
      y: {
        beginAtZero: true,
        max: 7,
        ticks: {
          color: "#ffffff",
          stepSize: 1,
        },
        grid: {
          color: "#333a46",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SplitChart;
