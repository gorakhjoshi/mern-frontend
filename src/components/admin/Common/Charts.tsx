import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

interface BarChartProps {
  horizontal?: boolean;
  data_1: number[];
  data_2: number[];
  bg_color1: string;
  bg_color2: string;
  title_1: string;
  title_2: string;
  labels?: string[];
}

interface DoughnutChartProps {
  labels: string[];
  data: number[];
  backgroundColor: string[];
  cutout?: string | number;
  legends?: boolean;
  offset?: number[];
}

interface PieChartProps {
  labels: string[];
  data: number[];
  backgroundColor: string[];
  offset?: number[];
}

interface LineChartProps {
  data: number[];
  label: string;
  backgroundColor: string;
  borderColor: string;
  labels?: string[];
}
const months = ["January", "February", "March", "April", "May", "June", "July"];

export function BarChart({
  horizontal = false,
  data_1 = [],
  data_2 = [],
  bg_color1,
  bg_color2,
  title_1,
  title_2,
  labels = months,
}: BarChartProps) {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        label: title_1,
        data: data_1,
        backgroundColor: bg_color1,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
      {
        label: title_2,
        data: data_2,
        backgroundColor: bg_color2,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export function DoughnutChart({
  labels,
  data,
  backgroundColor,
  cutout,
  legends = true,
  offset,
}: DoughnutChartProps) {
  const doughnutData: ChartData<"doughnut", number[], string> = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 0,
        offset,
      },
    ],
  };
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: legends,
        position: "bottom",
      },
    },
    cutout,
  };

  return <Doughnut options={options} data={doughnutData} />;
}
export function PieChart({
  labels,
  data,
  backgroundColor,
  offset,
}: PieChartProps) {
  const pieChartData: ChartData<"pie", number[], string> = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 0,
        offset,
      },
    ],
  };
  const options: ChartOptions<"pie"> = {
    responsive: true,
    // maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Pie options={options} data={pieChartData} />;
}

export function LineChart({
  data = [],
  label,
  backgroundColor,
  borderColor,
  labels = months,
}: LineChartProps) {
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const LineChartData: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        fill:true,
        label,
        data,
        backgroundColor,
        borderColor,
      },
    ],
  };

  return <Line options={options} data={LineChartData} />;
}
