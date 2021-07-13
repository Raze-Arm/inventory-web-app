import axios from "axios";
import store from "../store";
import {logout} from "../actions/auth";
import {showModalErrorMessage} from "../actions/app-message";
import {BACKEND_API} from "./address";
import {put} from "redux-saga/effects";
const api = axios.create({
    baseURL: BACKEND_API,
    withCredentials: true,
});

api.interceptors.response.use(function (response) {
        return response;
    }
, function (error) {
    if(error.response.status === 401 && error.response.config.url !== '/login') {
        console.log('error.response.data', error.response.data);
        store.dispatch(showModalErrorMessage({title: 'ورود ناموفق' , content: 'ورود به سیستم انجام نشد ، لطفاً بعداً امتحان کنید' , details: error.response.data.message}));
        store.dispatch(logout());
        console.log('unauthenticated user');
    }
    if(error.response.status === 403) {
        store.dispatch(showModalErrorMessage({title: 'غیر مجاز' , content: 'متأسفانه ، درخواست شما قابل انجام نیست' , details: error.response.data.message}))
    }
    // return error;
    return Promise.reject(error)
});

export default api;