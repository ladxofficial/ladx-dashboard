import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:10000/api/v1",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});


