import axios from "axios";


console.log(process.env.REACT_APP_HOST);
const api = axios.create({

    baseURL: process.env.REACT_APP_HOST,
});
export default api;