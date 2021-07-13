import {takeEvery, call, put} from 'redux-saga/effects';
import {
    DELETE_USER, GET_PHOTO_BY_USERNAME,
    GET_USER,
    GET_USER_BY_USERNAME,
    GET_USER_PAGE,
    GET_USER_PHOTO,
    SAVE_USER,
    UPDATE_USER
} from "../actions/types";
import {showErrorMessage, showModalErrorMessage, showSuccessMessage} from "../actions/app-message";

import {
    fetchUser,
    fetchUserPage,
    postUser,
    updateUser,
    deleteUser,
    fetchUserByUsername
} from '../services/user';
import {
    deleteUserSuccess, getUserByUsernameSuccess,
    getUserPageSuccess,
    getUserSuccess,
    saveUserSuccess,
    updateUserSuccess
} from "../actions/user";
import history from "../history";


function* userWatcher() {
    yield takeEvery(GET_USER_PAGE.LOAD, getUserPageFlow);
    yield takeEvery(GET_USER.LOAD, getUserFlow);
    yield takeEvery(GET_USER_BY_USERNAME.LOAD, getUserByUsernameFlow);
    yield takeEvery(SAVE_USER.LOAD, saveUserFlow);
    yield takeEvery(UPDATE_USER.LOAD, updateUserFlow);
    yield takeEvery(DELETE_USER.LOAD, deleteUserFlow);

}

function* getUserPageFlow(action) {
    const {page, size, sort, search} =  action.payload;
    try {
        console.log('fetching users' );
        const userPage =  yield call(fetchUserPage, {page, size, sort, search});
        console.log('user page', userPage);
        yield put(getUserPageSuccess(userPage));
    } catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید', details: e}))
    }
}

function* getUserFlow(action) {
    const id = action.payload;

    try {
        const user = yield call(fetchUser, id);
        console.log('user', user);
        yield put(getUserSuccess(user));
    } catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید'}));
    }
}
function* getUserByUsernameFlow(action) {
    const username =action.payload;

    try{
        const user = yield call(fetchUserByUsername, username);
        console.log('user', user);
        yield put(getUserByUsernameSuccess(user));
    }catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید'}))
    }
}

function* saveUserFlow(action) {
    const user = action.payload;
    try {
        const id = yield call(postUser, user);
        user.id = id;
        yield put(saveUserSuccess(user));
        history.push(`/user/show/${id}`);
        yield put(showSuccessMessage({title: 'عملیات موفق',content: 'کاربر با موفقیت ایجاد شد'}));

    }catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید'}));
    }
}

function* updateUserFlow(action) {
    const user = action.payload;
    try {
        const updatedUser = yield call(updateUser, user);
        console.log('updated user', updatedUser);
        yield put(updateUserSuccess(updatedUser));
        yield put(showSuccessMessage({title: 'عملیات موفق',content: 'کاربر با موفقیت ویرایش شد'}))
    }catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید'}));
    }
}

function* deleteUserFlow(action) {
    const id = action.payload;
    try {
        yield call(deleteUser, id);
        console.log('deleted user', id);
        yield put(deleteUserSuccess(id));
        yield put(showSuccessMessage({title: 'عملیات موفق',content: 'کاربر با موفقیت حذف شد'}));
        history.push('/user');
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید', details: e}));
    }
}



export default userWatcher();