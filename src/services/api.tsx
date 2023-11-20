import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const axiosClient: AxiosInstance = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
});

axiosClient.interceptors.request.use((config) => {
  config.headers["x-api-key"] =
    "live_kNijf9Brj0AN4jitPTrdxPfLGmjHx2l0zUrZcbn9f06ZOyN7F9cRkdgB2CiyagVq";

  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    if (error.response) {
      console.error("Response error:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
