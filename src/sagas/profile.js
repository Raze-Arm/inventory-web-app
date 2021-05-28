import {takeEvery, call, put} from 'redux-saga/effects';
import {GET_USER_PROFILE, UPDATE_USER_PROFILE} from "../actions/types";
import {fetchProfile, updateProfile} from "../services/profile";
import {getUserProfileSuccess, updateUserProfileSuccess} from "../actions/profile";
import {showErrorMessage, showSuccessMessage} from "../actions/app-message";



function* profileWatcher() {
    yield takeEvery(GET_USER_PROFILE.LOAD, getProfileFlow);
    yield takeEvery(UPDATE_USER_PROFILE.LOAD, updateProfileFlow);
}


function* getProfileFlow(action) {
    const username = action.payload;

    try {
        const profile = yield call(fetchProfile, username);
        console.log('profile', profile);
        yield put(getUserProfileSuccess(profile));
    } catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'Error' , content: 'Failed to get profile'}));
    }
}

function* updateProfileFlow(action) {
    const profile = action.payload;

    try {
        const updatedProfile = yield call(updateProfile, profile);
        console.log('updated profile', updatedProfile);
        yield put(updateUserProfileSuccess(updatedProfile));
        yield put(showSuccessMessage({title: 'Updated Successfully',content: 'Profile updated successfully'}))
    }catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'Error' , content: 'Failed to update profile'}));
    }
}

export default profileWatcher();