import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import TransactionsStats from "./components/TransactionsStats";
import TransactionsBarChart from "./components/TransactionsBarChart";
import TransactionsPieChart from "./components/TransactionsPieChart";
import MonthSelector from "./components/MonthSelector";

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");

  // Function to handle month change from MonthSelector component
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", textAlign: "center" }}>
      {/* MonthSelector component for selecting the month */}
      <MonthSelector
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      />

      {/* TransactionsTable component to display transaction details */}
      <TransactionsTable selectedMonth={selectedMonth} />

      {/* TransactionsStats component to display statistical data */}
      <TransactionsStats selectedMonth={selectedMonth} />

      {/* TransactionsBarChart component to display bar chart */}
      <TransactionsBarChart selectedMonth={selectedMonth} />

      {/* TransactionsPieChart component to display pie chart */}
      <TransactionsPieChart selectedMonth={selectedMonth} />
    </div>
  );
};

export default App;
