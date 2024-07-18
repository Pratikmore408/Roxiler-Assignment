import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import getPieChartData from "../services/pieChartService";

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// TransactionsPieChart component displays a pie chart for transaction data
const TransactionsPieChart = ({ selectedMonth }) => {
  // State to hold pie chart data
  const [pieChartData, setPieChartData] = useState({
    labels: [], // Labels for the pie segments
    datasets: [
      {
        label: "Number of Items", // Dataset label
        data: [], // Dataset values
        backgroundColor: [
          // Background colors for each segment
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          // Hover background colors for each segment
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  });

  // Fetch pie chart data based on selected month
  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        // Fetch data from the service
        const data = await getPieChartData(selectedMonth);
        // Extract labels and chart data from fetched data
        const labels = data.map((item) => item.category); // Extracting categories for labels
        const chartData = data.map((item) => item.count); // Extracting counts for dataset
        // Update pieChartData state with fetched data
        setPieChartData({
          labels,
          datasets: [
            {
              label: "Number of Items", // Dataset label
              data: chartData, // Dataset values
              backgroundColor: [
                // Background colors for each segment
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
              hoverBackgroundColor: [
                // Hover background colors for each segment
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchPieChartData();
  }, [selectedMonth]); // Dependency array ensures effect runs when selectedMonth changes

  // Render the pie chart component
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "80%", maxWidth: "600px" }}>
        {/* Title for the pie chart */}
        <h2 style={{ textAlign: "center" }}>
          Transaction Pie Chart for {selectedMonth}
        </h2>
        {/* Pie chart component */}
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default TransactionsPieChart;
