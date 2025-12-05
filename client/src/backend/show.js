import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// add a show

export const addShow = async (payload) => {
  try {
    const response = await api.post("/api/shows/add", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
