import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const addTheatre = async (payload) => {
  try {
    const response = await api.post("/api/theatre/add", payload);
    return response.data;
  } catch (error) {
    console.log("addTheatre", error);
  }
};

export const updateTheatre = async (payload) => {
  try {
    const response = await api.put("/api/theatre/update", payload);
    return response.data;
  } catch (error) {
    console.log("updateTheatre", error);
  }
};
