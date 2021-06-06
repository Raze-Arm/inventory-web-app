import {takeEvery, call, put} from 'redux-saga/effects';
import {GET_ACTIVITY_PAGE, GET_ACTIVITY_PAGE_BY_USERNAME, GET_USER_ACTIVITY_PAGE} from "../actions/types";
import {fetchActivityPage, fetchActivityPageByUsername, fetchUserActivityPage} from "../services/activity";
import {
    getActivityPageByUsernameSuccess,
    getActivityPageSuccess,
    getUserActivityPageSuccess
} from "../actions/activity";
import {showModalErrorMessage} from "../actions/app-message";



function* activityWatcher() {
    yield takeEvery(GET_USER_ACTIVITY_PAGE.LOAD, getUserActivityPageFlow);
    yield takeEvery(GET_ACTIVITY_PAGE.LOAD, getActivityPageFlow);
    yield takeEvery(GET_ACTIVITY_PAGE_BY_USERNAME.LOAD, getActivityByUsernameFlow);
}

function* getUserActivityPageFlow(action) {
    const {page, size, sort, search} = action.payload;
    try {
        const activityPage = yield call(fetchUserActivityPage, {page, size, sort, search});
        console.log('activity page', activityPage);
        yield put(getUserActivityPageSuccess(activityPage));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'Error' , content: 'Failed to get  activity list', details: e}));
    }
}

function* getActivityPageFlow(action) {
    const {page, size, sort, search} = action.payload;
    try {
        const activityPage = yield call(fetchActivityPage, {page, size, sort, search});
        console.log('activity page', activityPage);
        yield put(getActivityPageSuccess(activityPage));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'Error' , content: 'Failed to get  activity list', details: e}));
    }
}

function* getActivityByUsernameFlow(action) {
    const {username, page, size, sort, search} = action.payload;
    try {
        const activityPage = yield call(fetchActivityPageByUsername, {username, page, size, sort, search});
        console.log('activity page', activityPage);
        yield put(getActivityPageByUsernameSuccess(activityPage));
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'Error' , content: 'Failed to get  activity list', details: e}));
    }
}


export default activityWatcher();