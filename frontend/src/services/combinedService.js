import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api";

const getCombinedData = async (month) => {
  try {
    const params = { month };
    const response = await axios.get(`${API_BASE_URL}/combined`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching combined data:", error);
    throw error;
  }
};

export default { getCombinedData };
