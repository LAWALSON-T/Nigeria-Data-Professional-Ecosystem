import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

//ChartJS.defaults.elements.bar.borderWidth = 2;
export const options = {
  responsive: true,
  tooltips: {
    enabled: false,
  },
  plugins: {
    datalabels: {
      color: "blue",
      labels: {
        title: null,
      },
    },
  legend: {
    position: "bottom",
  }
  },
};
