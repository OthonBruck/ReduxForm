import axios from "axios";
import { endpoints } from "./endpoints.js";

const api = axios.create({
  baseURL: endpoints.API_URL,
});

export default api;
