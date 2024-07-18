import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api";

// Function to fetch bar chart data for a specific month
const getBarChartData = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/barchart/${month}`);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    throw error; // Throw the error for handling in the calling function
  }
};

export default getBarChartData;
