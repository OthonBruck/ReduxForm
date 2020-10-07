import axios from "axios";
import { endpoints } from "./endpoints.jsx";

const api = axios.create({
  baseURL: endpoints.API_URL,
});

export default api;
