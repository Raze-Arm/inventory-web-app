import {takeEvery, call, put} from 'redux-saga/effects';
import {DELETE_USER, GET_USER, GET_USER_PAGE, GET_USER_PHOTO, SAVE_USER, UPDATE_USER} from "../actions/types";
import {showErrorMessage, showModalErrorMessage, showSuccessMessage} from "../actions/app-message";

import  {fetchUser, fetchUserPage, postUser, updateUser, downloadUserPhoto, deleteUser} from '../services/user';
import {
    deleteUserSuccess,
    getUserPageSuccess, getUserPhotoSuccess,
    getUserSuccess,
    saveUserSuccess,
    updateUserSuccess
} from "../actions/user";
import history from "../history";


function* userWatcher() {
    yield takeEvery(GET_USER_PAGE.LOAD, getUserPageFlow);
    yield takeEvery(GET_USER.LOAD, getUserFlow);
    yield takeEvery(SAVE_USER.LOAD, saveUserFlow);
    yield takeEvery(UPDATE_USER.LOAD, updateUserFlow);
    yield takeEvery(DELETE_USER.LOAD, deleteUserFlow);
    yield takeEvery(GET_USER_PHOTO.LOAD , getUserPhotoFlow);
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
        yield put(showModalErrorMessage({title: 'Error' , content: 'Failed to get  user list', details: e}))
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
        yield put(showErrorMessage({title: 'Error' , content: 'Failed to get user'}));
    }
}


function* saveUserFlow(action) {
    const user = action.payload;
    try {
        const id = yield call(postUser, user);
        user.id = id;
        yield put(saveUserSuccess(user));
        history.push(`/user/show/${id}`);
        yield put(showSuccessMessage({title: 'Saved Successfully',content: 'User created successfully'}));

    }catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'Error' , content: 'Failed to save user '}));
    }
}

function* updateUserFlow(action) {
    const user = action.payload;
    try {
        const updatedUser = yield call(updateUser, user);
        console.log('updated user', updatedUser);
        yield put(updateUserSuccess(updatedUser));
        yield put(showSuccessMessage({title: 'Updated Successfully',content: 'User updated successfully'}))
    }catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'Error' , content: 'Failed to update user'}));
    }
}

function* deleteUserFlow(action) {
    const id = action.payload;
    try {
        yield call(deleteUser, id);
        console.log('deleted user', id);
        yield put(deleteUserSuccess(id));
        yield put(showSuccessMessage({title: 'User Deleted ',content: 'User deleted successfully'}));
        history.push('/user');
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'Error' , content: 'Failed to delete User', details: e}));
    }
}

function* getUserPhotoFlow(action) {
    const id = action.payload;
    try {
        const photo = yield call(downloadUserPhoto, id);
        console.log('user photo ', photo);
        yield put(getUserPhotoSuccess({id, photo}));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'Error' , content: 'Failed to get  user', details: e}));
    }
}


export default userWatcher();