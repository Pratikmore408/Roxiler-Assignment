import React from "react";

// MonthSelector component allows users to select a month from a dropdown list
const MonthSelector = ({ selectedMonth, onMonthChange }) => {
  // Array of months for the dropdown options
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

  // Function to handle month change event
  const handleMonthChange = (event) => {
    onMonthChange(event.target.value); // Calls the onMonthChange prop with the selected month value
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: "10px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <label style={{ marginRight: "10px" }}>Select Month:</label>

      {/* Dropdown select element */}
      <select
        defaultValue={"March"}
        value={selectedMonth} // Current selected month value
        onChange={handleMonthChange} // Event handler for when a month is selected
        style={{
          padding: "5px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Map through months array to create dropdown options */}
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label} {/* Display month label */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;
