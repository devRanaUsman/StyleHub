import axios from "axios";

// Access token interceptor with auto-refresh logic
const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // Important: allows setting/getting cookies
});

// Response interceptor to handle 401s globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Disallow retry on loops or specifically auth endpoints
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (err) {
        // Refresh token failed, meaning the user must login again
        // Here we could potentially dispatch a logout action
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
