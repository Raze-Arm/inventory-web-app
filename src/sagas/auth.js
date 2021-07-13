import {take , call ,fork,put, cancel, cancelled ,select} from 'redux-saga/effects';
import history from "../history";

import {LOGIN, LOGOUT} from "../actions/types";
import {login, logout} from "../services/auth";
import {loginFailed, loginSuccess, logoutSuccess} from "../actions/auth";
import { showLoadingScreen, showModalErrorMessage, stopLoadingScreen} from "../actions/app-message";
import jwtDecode from "../utility/jwt-decode";

const getAuth = state => state.auth;


function* authWatcher() {
    while (true) {
        try {
            const userInfo = yield call(autoLoginFlow);
            if(!userInfo) {
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
            console.log('error', e);
            yield put(stopLoadingScreen());
            yield put(showModalErrorMessage({title: 'ورود ناموفق' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید' , details: e}))
        }
    }

}


function* loginFlow(action) {
    const {username,password} = action;
    try {
        const userInfo = yield call(login, {username,password});
        yield put(loginSuccess(userInfo));
        yield put(stopLoadingScreen());

        localStorage.setItem('user_info', userInfo);
        history.push('/');
    } catch (e) {
        yield put(loginFailed('e'));
        yield put(showModalErrorMessage({title: 'ورود ناموفق', content: 'ورود به سیستم انجام نشد ، لطفاً بعداً امتحان کنید', details: e}));
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
        localStorage.removeItem('user_info');
        localStorage.removeItem('chat');
    }catch (e) {
    }finally {

    }
}


function* autoLoginFlow() {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
        yield put(loginSuccess(userInfo));
        yield put(stopLoadingScreen());

        yield take([LOGOUT.LOAD]);
        yield put(stopLoadingScreen());
        yield call(logoutFlow);
        return userInfo;
    }

}

export default authWatcher();