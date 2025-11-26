import axios from "axios";

const backend_url = import.meta.env.VITE_BACKEND_URL || "";

const apiClient = axios.create({
  ...(backend_url ? { baseURL: backend_url } : undefined),
});

export default apiClient;
