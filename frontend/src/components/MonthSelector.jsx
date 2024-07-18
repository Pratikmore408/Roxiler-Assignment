import React from "react";

const MonthSelector = ({ selectedMonth, onMonthChange }) => {
  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const handleMonthChange = (event) => {
    onMonthChange(event.target.value);
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "10px" }}>
      <label style={{ marginRight: "10px" }}>Select Month:</label>
      <select
        value={selectedMonth}
        onChange={handleMonthChange}
        style={{
          padding: "5px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
        }}
      >
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;
