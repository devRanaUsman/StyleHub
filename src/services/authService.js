import api from "./api";

const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  signup: async (name, email, password, role) => {
    const response = await api.post("/auth/signup", { name, email, password, role });
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

export default authService;
