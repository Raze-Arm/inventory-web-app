import {LOADING, LOGIN, LOGOUT} from "../actions/types";
import jwtDecode from '../utility/jwt-decode';

const INITIAL_VALUES = {
    token: '',
    username: '',
    isLoggedIn: false,
    authorities: [],
    isLoading: false,
}

export const authReducer = ( state = INITIAL_VALUES, action) => {
    switch (action.type) {
        case LOGIN.SUCCESS: {
            const decoded = jwtDecode(action.payload);
            return {...state , token: action.payload, isLoggedIn: true ,authorities: decoded.authorities.map(e => e['authority']),username: decoded.sub };
        }
        case LOADING.START: {
            return  {...state, isLoading: true};
        }

        case LOADING.STOP: {
            return  {...state, isLoading: false};
        }
        case LOGIN.FAILED: {
            return  {...INITIAL_VALUES};
        }
        case LOGOUT.SUCCESS: {
            return  {...INITIAL_VALUES};
        }

        default: {
            return state;
        }
    }
}