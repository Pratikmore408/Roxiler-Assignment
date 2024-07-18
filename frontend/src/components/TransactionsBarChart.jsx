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

// Register the necessary Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// TransactionsBarChart component displays a bar chart for transaction data
const TransactionsBarChart = ({ selectedMonth }) => {
  // State to hold bar chart data
  const [barChartData, setBarChartData] = useState({
    labels: [], // Labels for the x-axis
    datasets: [
      {
        label: "Number of Items", // Dataset label
        data: [], // Dataset values
        backgroundColor: "rgba(75,192,192,0.4)", // Bar background color
        borderColor: "rgba(75,192,192,1)", // Bar border color
        borderWidth: 1, // Bar border width
      },
    ],
  });

  // Fetch bar chart data based on selected month
  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        // Fetch data from the service
        const data = await getBarChartData(selectedMonth);
        // Extract labels and chart data from fetched data
        const labels = data.map((item) => item.range); // Extracting ranges for labels
        const chartData = data.map((item) => item.count); // Extracting counts for dataset
        // Update barChartData state with fetched data
        setBarChartData({
          labels,
          datasets: [
            {
              label: "Number of Items", // Dataset label
              data: chartData, // Dataset values
              backgroundColor: "rgba(75,192,192,0.4)", // Bar background color
              borderColor: "rgba(75,192,192,1)", // Bar border color
              borderWidth: 1, // Bar border width
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    fetchBarChartData();
  }, [selectedMonth]); // Dependency array ensures effect runs when selectedMonth changes

  // Options for configuring the bar chart
  const options = {
    scales: {
      y: {
        beginAtZero: true, // Start y-axis at zero
        min: 0, // Minimum value on y-axis
        max: 5, // Maximum value on y-axis
        ticks: {
          stepSize: 1, // Step size between ticks on y-axis
        },
      },
    },
  };

  // Render the bar chart component
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
        {/* Title for the bar chart */}
        <h2 style={{ textAlign: "center" }}>
          Transaction Bar Chart for {selectedMonth}
        </h2>
        {/* Bar chart component */}
        <Bar data={barChartData} options={options} />
      </div>
    </div>
  );
};

export default TransactionsBarChart;
