import React, { useEffect, useState } from "react";
import getTransactions from "../services/transactionService";

// TransactionsTable component displays a table of transactions for a selected month
const TransactionsTable = ({ selectedMonth }) => {
  // State to hold transactions data
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  // Fetch transactions data when selectedMonth, search, page, or perPage changes
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Fetch transactions data from service
        const data = await getTransactions(
          selectedMonth,
          search,
          page,
          perPage
        );
        console.log("API response:", data);

        // Ensure the data is always an array
        if (Array.isArray(data)) {
          setTransactions(data);
        } else if (data.products && Array.isArray(data.products)) {
          setTransactions(data.products);
        } else {
          setTransactions([]);
        }

        // Calculate total pages based on total products and perPage
        const totalProducts =
          data.totalProducts || (data.products && data.products.length) || 0;
        setTotalPages(Math.ceil(totalProducts / perPage));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [selectedMonth, search, page, perPage]); // Dependency array ensures effect runs on relevant changes

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1); // Reset page to 1 when search changes
  };

  // Render table rows for transactions
  const renderTransactions = () => {
    return transactions.map((transaction, index) => (
      <tr
        key={transaction._id}
        style={{
          backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
          borderBottom: "1px solid #ddd",
        }}
      >
        <td style={tableCellStyle}>{transaction.title}</td>
        <td style={tableCellStyle}>{transaction.description}</td>
        <td style={tableCellStyle}>{transaction.price}</td>
        <td style={tableCellStyle}>{transaction.sold ? "Yes" : "No"}</td>
        <td
          style={{ ...tableCellStyle, maxWidth: "100px", overflow: "hidden" }}
        >
          <img
            src={transaction.image}
            alt={transaction.title}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </td>
      </tr>
    ));
  };

  // Render the TransactionsTable component
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: "20px",
      }}
    >
      {/* Title for the table */}
      <h2>List Of Transactions for {selectedMonth}</h2>
      {/* Search input */}
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search Product"
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      {/* Table container with horizontal scroll */}
      <div style={{ overflowX: "auto", width: "100%" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
            border: "1px solid #ddd",
          }}
        >
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Price</th>
              <th style={tableHeaderStyle}>Sold</th>
              <th style={tableHeaderStyle}>Image</th>
            </tr>
          </thead>
          <tbody>{renderTransactions()}</tbody>
        </table>
      </div>
      {/* Pagination controls */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page * perPage >= totalPages}
        >
          Next
        </button>
      </div>
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

export default TransactionsTable;
