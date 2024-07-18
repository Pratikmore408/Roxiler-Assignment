import React, { useEffect, useState } from "react";
import getMonthlyStats from "../services/statsService";

const TransactionsStats = ({ selectedMonth }) => {
  const [stats, setStats] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getMonthlyStats(selectedMonth);
        setStats(data); // Assuming data matches the structure { totalSaleAmount, totalSoldItems, totalNotSoldItems }
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStats();
  }, [selectedMonth]);

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#f0f0f0",
        padding: "20px",
      }}
    >
      <h2>Transaction Statistics for {selectedMonth}</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white",
        }}
      >
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Category</th>
            <th style={tableHeaderStyle}>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tableCellStyle}>Total Sale Amount</td>
            <td style={tableCellStyle}>{stats.totalSaleAmount}</td>
          </tr>
          <tr>
            <td style={tableCellStyle}>Total Sold Items</td>
            <td style={tableCellStyle}>{stats.totalSoldItems}</td>
          </tr>
          <tr>
            <td style={tableCellStyle}>Total Not Sold Items</td>
            <td style={tableCellStyle}>{stats.totalNotSoldItems}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Style for table headers
const tableHeaderStyle = {
  background: "#f2f2f2",
  padding: "8px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  borderRight: "1px solid #ddd",
};

// Style for table cells
const tableCellStyle = {
  padding: "8px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  borderRight: "1px solid #ddd",
};

export default TransactionsStats;
