// src/services/api.js
// (Remains the same as original, no changes needed)
import axios from "axios";

const API_URL = "http://localhost:5000/api/absensi";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllAbsensi = async (params = {}) => {
  try {
    const response = await api.get("/", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAbsensiById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createAbsensi = async (data) => {
  try {
    const response = await api.post("/", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateAbsensi = async (id, data) => {
  try {
    const response = await api.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteAbsensi = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
