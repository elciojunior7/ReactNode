import axios from "axios";

//devo trocar pelo ip onde está o backend
const api = axios.create({
    baseURL: "http://192.168.0.4:3333",
})

export default api;