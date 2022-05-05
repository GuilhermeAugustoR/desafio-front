import axios from "axios";

export const BASE_URL = "https://api-desafio-front.dev.qesh.ai";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

export default api;
