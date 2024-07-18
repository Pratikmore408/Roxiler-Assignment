import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import getBarChartData from "../services/barChartService";

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionsBarChart = ({ selectedMonth }) => {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Items",
        data: [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const data = await getBarChartData(selectedMonth);
        const labels = data.map((item) => item.range);
        const chartData = data.map((item) => item.count);
        setBarChartData({
          labels,
          datasets: [
            {
              label: "Number of Items",
              data: chartData,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    fetchBarChartData();
  }, [selectedMonth]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1, // Adjust this value as needed
        },
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <h2 style={{ textAlign: "center" }}>
          Transaction Bar Chart for {selectedMonth}
        </h2>
        <Bar data={barChartData} options={options} />
      </div>
    </div>
  );
};

export default TransactionsBarChart;
