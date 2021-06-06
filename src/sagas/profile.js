import {takeEvery, call, put} from 'redux-saga/effects';
import {
    GET_PROFILE_PHOTO,
    GET_PROFILE,
    UPDATE_PROFILE
} from "../actions/types";
import {
    downloadProfilePhoto,
    fetchProfile,
    updateProfile
} from "../services/profile";
import {
    getProfilePhotoSuccess,
    getProfileSuccess,
    updateProfileSuccess
} from "../actions/profile";
import {showErrorMessage, showModalErrorMessage, showSuccessMessage} from "../actions/app-message";



function* profileWatcher() {
    yield takeEvery(GET_PROFILE.LOAD, getProfileFlow);
    yield takeEvery(UPDATE_PROFILE.LOAD, updateProfileFlow);
    yield takeEvery(GET_PROFILE_PHOTO.LOAD, getProfilePhotoFlow);
}



function* getProfileFlow(action) {
    const username = action.payload;

    try {
        const profile = yield call(fetchProfile, username);
        console.log('profile', profile);
        yield put(getProfileSuccess(profile));
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
        yield put(updateProfileSuccess(updatedProfile));
        yield put(showSuccessMessage({title: 'Updated Successfully',content: 'Profile updated successfully'}))
    }catch (e) {
        console.log('error', e);
        yield put(showErrorMessage({title: 'Error' , content: 'Failed to update profile'}));
    }
}

function* getProfilePhotoFlow(action) {
    const username = action.payload;
    try {
        const photo = yield call(downloadProfilePhoto, username);
        console.log('user photo ', photo);
        yield put(getProfilePhotoSuccess(photo));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'Error' , content: 'Failed to get  profile', details: e}));
    }
}

export default profileWatcher();