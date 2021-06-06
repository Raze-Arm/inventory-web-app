import {take , call ,fork,put, cancel, cancelled ,select} from 'redux-saga/effects';
import history from "../history";

import Api from '../apis/inventory-api';
import {LOGIN, LOGOUT} from "../actions/types";
import {login, logout} from "../services/auth";
import {loginFailed, loginSuccess, logoutSuccess} from "../actions/auth";
import { showLoadingScreen, showModalErrorMessage, stopLoadingScreen} from "../actions/app-message";
import {getProfilePhoto} from "../actions/profile";
import jwtDecode from "../utility/jwt-decode";

const getAuth = state => state.auth;


function* authWatcher() {
    while (true) {
        try {
            const token = yield call(autoLoginFlow);
            if(!token) {
                const {payload} = yield take(LOGIN.LOAD);
                yield put(showLoadingScreen());
                const task = yield fork(loginFlow, payload);

                yield take([LOGIN.FAILED, LOGOUT.LOAD] );
                yield put(stopLoadingScreen());

                yield cancel(task);
                const {isLoggedIn} = yield select(getAuth);
                if(isLoggedIn)yield  call(logoutFlow);
            }
        }catch (e) {
            yield put(stopLoadingScreen());

        }
    }

}


function* loginFlow(action) {
    const {username,password} = action;
    try {
        const token = yield call(login, {username,password});
        yield put(loginSuccess(token));
        yield put(stopLoadingScreen());
        Api.defaults.headers.common['Authorization'] = token;
        yield put(getProfilePhoto(username));
        localStorage.setItem('token', token);
        history.push('/');
    } catch (e) {
        yield put(loginFailed('e'));
        yield put(showModalErrorMessage({title: 'Failed', content: 'Failed to login , Please try later', details: e}));
    }finally {
        if(yield  cancelled()) {
            history.push('/login');
        }
    }
}

function*  logoutFlow() {

    try {
        yield fork(logout);
        yield put(logoutSuccess());
        localStorage.removeItem('token');
        Api.defaults.headers.common['Authorization'] = '';
    }catch (e) {
    }finally {

    }
}


function* autoLoginFlow() {
    const token = localStorage.getItem('token');
    if (token) {
        yield put(loginSuccess(token));
        yield put(stopLoadingScreen());
        Api.defaults.headers.common['Authorization'] = token;
        const decoded = jwtDecode(token);
        yield put(getProfilePhoto(decoded.sub));
        // history.push('/');
        yield take([LOGOUT.LOAD]);
        yield put(stopLoadingScreen());
        yield call(logoutFlow);
        return token;
    }

}

export default authWatcher();