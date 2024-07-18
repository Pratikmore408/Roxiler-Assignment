import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import TransactionsStats from "./components/TransactionsStats";
import TransactionsBarChart from "./components/TransactionsBarChart";
import TransactionsPieChart from "./components/TransactionsPieChart";
import MonthSelector from "./components/MonthSelector";

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("january");

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  return (
    <div>
      <MonthSelector
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      />
      <TransactionsStats selectedMonth={selectedMonth} />
      <TransactionsBarChart selectedMonth={selectedMonth} />
      <TransactionsPieChart selectedMonth={selectedMonth} />
      <TransactionsTable selectedMonth={selectedMonth} />
    </div>
  );
};

export default App;
