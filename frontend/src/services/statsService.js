import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api";

// Function to fetch monthly statistics for a specific month
const getMonthlyStats = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics/${month}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly statistics:", error);
    throw error;
  }
};

export default getMonthlyStats;
