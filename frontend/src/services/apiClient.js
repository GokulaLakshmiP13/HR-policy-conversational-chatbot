import axios from "axios";

// Create a reusable axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 20000 // 20 seconds
});

// OPTIONAL: Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// OPTIONAL: Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data, // directly return data
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
