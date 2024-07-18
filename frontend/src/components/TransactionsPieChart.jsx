import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import getPieChartData from "../services/pieChartService";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionsPieChart = ({ selectedMonth }) => {
  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Items",
        data: [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
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

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const data = await getPieChartData(selectedMonth);
        const labels = data.map((item) => item.category);
        const chartData = data.map((item) => item.count);

        setPieChartData({
          labels,
          datasets: [
            {
              label: "Number of Items",
              data: chartData,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
              hoverBackgroundColor: [
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
  }, [selectedMonth]);
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
        <h2 style={{ textAlign: "center" }}>
          Transaction Pie Chart for {selectedMonth}
        </h2>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default TransactionsPieChart;
