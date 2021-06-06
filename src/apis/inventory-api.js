import axios from "axios";
import store from "../store";
import {logout} from "../actions/auth";
console.log(process.env.REACT_APP_HOST);
const api = axios.create({
    baseURL: process.env.REACT_APP_HOST,
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