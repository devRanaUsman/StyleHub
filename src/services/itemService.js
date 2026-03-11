import axios from "axios";
const apiUrl = "http://localhost:8080/items/api";
const itemService = {
  getItems: async () => {
    const response = await axios.get(`${apiUrl}/`);
    console.log("response items",response);
    return response.data;
  },
  getSection1: async (section, category, q) => { 
    const params = new URLSearchParams();
    if (section) params.set("section", section);
    if (category !== undefined) params.set("category", category);
    if (q !== undefined) params.set("q", q);
    const url = params.toString() ? `${apiUrl}?${params}` : `${apiUrl}`;

    console.log(url);
    const response = await axios.get(url);
    return response.data;
  },
  createUser: async (userData) => {
    const response = await axios.post(`${apiUrl}/createUser`, userData);
    return response.data;
  },
  addItem: (item) => {
    return axios.post(`${apiUrl}/`, item, { withCredentials: true });
  },
  getSellerItems: async () => {
    // Need to send cookies for token verification
    const response = await axios.get(`${apiUrl}/seller/items`, { withCredentials: true });
    return response.data;
  },
  getItemById: async (id) => {
    const response = await axios.get(`${apiUrl}/details/${id}`);
    return response.data;
  },
  deleteItemById: async (id) => {
    const response = await axios.delete(`${apiUrl}/${id}`, { withCredentials: true });
    return response.data;
  },
  updateItemById: async (id, item) => {
    const response = await axios.put(`${apiUrl}/${id}`, item, { withCredentials: true });
    return response.data;
  },
};

export default itemService;
