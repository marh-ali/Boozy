import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://2826-68-33-16-202.ngrok-free.app/api", // Replace with your Expo development URL and the backend server's port
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

export default api;

//   baseURL: "http://192.168.0.104:3001", // Replace with your Expo development URL and the backend server's port
