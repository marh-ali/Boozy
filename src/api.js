import axios from "axios";

const api = axios.create({
  baseURL: "https://2826-68-33-16-202.ngrok-free.app/api", // Replace with your Expo development URL and the backend server's port
});

export default api;

//   baseURL: "http://192.168.0.104:3001", // Replace with your Expo development URL and the backend server's port
