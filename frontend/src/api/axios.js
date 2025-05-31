import axios from "axios";
import { api_url } from '../settings/apiUrl';

const api = axios.create({
    baseURL: api_url,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;