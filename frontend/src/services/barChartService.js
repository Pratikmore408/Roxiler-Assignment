import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api";

const getBarChartData = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/barchart/${month}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    throw error;
  }
};

export default getBarChartData;
