import {takeEvery, call, put} from 'redux-saga/effects';
import {
    GET_PROFILE,
    UPDATE_PROFILE
} from "../actions/types";
import {
    fetchProfile,
    updateProfile
} from "../services/profile";
import {
    getProfileSuccess,
    updateProfileSuccess
} from "../actions/profile";
import {showErrorMessage, showSuccessMessage} from "../actions/app-message";



function* profileWatcher() {
    yield takeEvery(GET_PROFILE.LOAD, getProfileFlow);
    yield takeEvery(UPDATE_PROFILE.LOAD, updateProfileFlow);
}



function* getProfileFlow(action) {
    const username = action.payload;

    try {
        const profile = yield call(fetchProfile, username);
        console.log('profile', profile);
        yield put(getProfileSuccess(profile));
    } catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید'}));
    }
}


function* updateProfileFlow(action) {
    const profile = action.payload;
    try {
        yield call(updateProfile, profile);
        console.log('updated profile', profile);
        if(profile.photo) {
            profile.imageAvailable = true;
        }
        yield put(updateProfileSuccess(profile));
        yield put(showSuccessMessage({title: 'عملیات موفق',content: 'مشخصات با موفقیت ویرایش شد'}))
    }catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید'}));
    }
}



export default profileWatcher();