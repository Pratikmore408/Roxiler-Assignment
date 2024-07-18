import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api";

// Function to fetch pie chart data for a specific month
const getPieChartData = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/piechart/${month}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    throw error;
  }
};

export default getPieChartData;
