import axios from "axios";
import store from "../store";
import {logout} from "../actions/auth";
import {showModalErrorMessage} from "../actions/app-message";
import {BACKEND_API} from "./address";
console.log(BACKEND_API);
const api = axios.create({
    baseURL: BACKEND_API,
});

api.interceptors.response.use(function (response) {
        return response;
    }
, function (error) {
    if(error.response.status === 401) {
        store.dispatch(logout());
        console.log('unauthenticated user');
    }
    if(error.response.status === 403) {
        store.dispatch(showModalErrorMessage({title: 'غیر مجاز' , content: 'متأسفانه ، درخواست شما قابل انجام نیست' , details: error}))
    }
    // return error;
    return Promise.reject(error)
});

export default api;