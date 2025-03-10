// transactionService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/transactions";

// Function to fetch transactions based on specified parameters
const getTransactions = async (month, search, page, perPage = 10) => {
  const response = await axios.get(API_URL, {
    params: {
      month,
      search,
      page,
      perPage,
    },
  });
  return response.data;
};

export default getTransactions;
