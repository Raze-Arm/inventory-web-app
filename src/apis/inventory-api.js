import axios from "axios";


console.log(process.env.REACT_APP_HOST);
const api = axios.create({

    baseURL: process.env.REACT_APP_HOST,
    url: '/api/v1'
});
export default api;