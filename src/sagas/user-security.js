import {takeEvery, call, put} from 'redux-saga/effects';
import {USER_SECURITY} from "../actions/types";
import {forgotPassword} from "../services/auth";
import history from "../history";
import {showModalErrorMessage} from "../actions/app-message";




function* securityWatcher() {
    yield takeEvery(USER_SECURITY.FORGOT, resetPasswordFlow);
}


function* resetPasswordFlow(action) {
    const {username, email} = action.payload;
    try {
         yield call(forgotPassword, username, email);
         history.push('/login/passwordrecovery/success')
    }catch (e) {
        console.log('error', e);
        yield put(showModalErrorMessage({title: 'خطا' , content: 'متأسفانه ، خطای غیرمنتظره ای روی داد لطفا بعداً امتحان کنید', details: e.response.data.message}));

    }
}


export default securityWatcher();