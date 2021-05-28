import {take , call ,fork,put, cancel, cancelled ,select} from 'redux-saga/effects';
import history from "../history";

import Api from '../apis/inventory-api';
import {LOGIN, LOGOUT} from "../actions/types";
import {login, logout} from "../services/auth";
import {loginFailed, loginSuccess, logoutSuccess} from "../actions/auth";
import {showErrorMessage, showLoadingScreen, stopLoadingScreen} from "../actions/app-message";

const getAuth = state => state.auth;


function* authWatcher() {
    while (true) {
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
    }

}


function* loginFlow(action) {
    const {username,password} = action;
    try {
        const token = yield call(login, {username,password});
        yield put(loginSuccess(token));
        yield put(stopLoadingScreen());
        Api.defaults.headers.common['Authorization'] = token;
        localStorage.setItem('token', token);
        history.push('/');
    } catch (e) {
        yield put(loginFailed('e'));
        yield put(showErrorMessage({title: 'Failed', content: 'Failed to login , Please try later'}));
    }finally {
        if(yield  cancelled()) {
            history.push('/login');
        }
    }
}

function*  logoutFlow() {

    try {
        yield put(logoutSuccess());
        Api.defaults.headers.common['Authorization'] = '';
        localStorage.removeItem('token');
        yield call(logout);
    }catch (e) {
    }finally {
        history.push('/login');

    }
}


function* autoLoginFlow() {
    const token = localStorage.getItem('token');
    if (token) {
        yield put(loginSuccess(token));
        yield put(stopLoadingScreen());
        Api.defaults.headers.common['Authorization'] = token;
        // history.push('/');
        yield take([LOGOUT.LOAD]);
        yield put(stopLoadingScreen());
        yield call(logoutFlow);
        return token;
    }

}

export default authWatcher();