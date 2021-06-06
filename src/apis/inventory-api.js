import axios from "axios";
import store from "../store";
import {logout} from "../actions/auth";
console.log(process.env.BACKEND_API);
const api = axios.create({
    baseURL: process.env.BACKEND_API,
});

api.interceptors.response.use(function (response) {
        return response;
    }
, function (error) {
    if(error.response.status === 401) {
        store.dispatch(logout());
        console.log('unauthenticated user');
    }
    return Promise.reject(error)
});

export default api;