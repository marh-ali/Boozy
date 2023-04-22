import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://54ab-68-33-16-202.ngrok-free.app/api", // Replace with your Expo development URL and the backend server's port
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor for handling errors in responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response); // Display the full error response
    return Promise.reject(error);
  }
);

export default api;
