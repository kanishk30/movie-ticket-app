import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const getAllMovies = async () => {
  try {
    const response = await api.get("/api/movie/all");
    console.log(response);
    return response.data;
  } catch (error) {}
};

export const addMovie = async (values) => {
  try {
    const response = await api.post("/api/movie/add", values);
    return response.data;
  } catch (error) {
    console.log("addMovie", error);
  }
};

export const updateMovie = async (values) => {
  try {
    const response = await api.put("/api/movie/update", values);
    return response.data;
  } catch (error) {
    console.log("updateMovie", error);
  }
};

export const getSingleMovie = async (id) => {
  try {
    const response = await api.get(`/api/movie/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {}
};
