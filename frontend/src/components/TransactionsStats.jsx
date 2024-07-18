import React, { useEffect, useState } from "react";
import getMonthlyStats from "../services/statsService";

const TransactionsStats = ({ selectedMonth }) => {
  const [stats, setStats] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const filteredStats = () => {
    // Filter the stats based on the search term
    return Object.entries(stats).filter(([key, value]) =>
      key.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStats().slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#f0f0f0",
        padding: "20px",
      }}
    >
      <h2>Transaction Statistics for {selectedMonth}</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
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
          {currentItems.map(([key, value], index) => (
            <tr key={index}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Style for table headers
const tableHeaderStyle = {
  borderBottom: "1px solid #ddd",
  background: "#f2f2f2",
  padding: "8px",
  textAlign: "left",
};

export default TransactionsStats;
