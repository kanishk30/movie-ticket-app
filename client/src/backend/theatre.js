import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// ADD theatre method
export const addTheatre = async (payload) => {
  try {
    const response = await api.post("/api/theatre/add", payload);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "SOmething went wriong.",
    };
  }
};

// update theatre method
export const updateTheatre = async (payload, res) => {
  try {
    const response = await api.put("/api/theatre/update", payload);

    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "SOmething went wriong.",
    };
  }
};

// get all theatres for the owner method.
export const getAllTheatres = async (payload) => {
  try {
    const response = await api.post(
      "/api/theatre/get-all-theatres-by-owner",
      payload
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "SOmething went wriong.",
    };
  }
};

export const getAllTheatresForAdmin = async (payload) => {
  try {
    const response = await api.get("/api/theatre/all");
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "SOmething went wriong.",
    };
  }
};
