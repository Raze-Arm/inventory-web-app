import {GET_ACTIVITY_PAGE, GET_ACTIVITY_PAGE_BY_USERNAME, GET_USER_ACTIVITY_PAGE} from "./types";


export const getUserActivityPage = ({page, size,sort = 'id',search = ''}) => {
    return {type: GET_USER_ACTIVITY_PAGE.LOAD , payload: {page, size, sort, search}};
}

export const getUserActivityPageSuccess = (activityPage) => {
    return {type: GET_USER_ACTIVITY_PAGE.SUCCESS, payload: activityPage};
}
export const getUserActivityPageFailed = (error) => {
    return {type: GET_USER_ACTIVITY_PAGE.FAILED, payload: error};
}


export const getActivityPage = ({page, size,sort = 'id',search = ''}) => {
    return {type: GET_ACTIVITY_PAGE.LOAD, payload: {page, size, sort, search}};
}
export const getActivityPageSuccess = (activityPage) => {
    return {type: GET_ACTIVITY_PAGE.SUCCESS, payload: activityPage};
}
export const getActivityPageFailed = (error) => {
    return {type: GET_ACTIVITY_PAGE.FAILED, payload: error};
}


export const getActivityPageByUsername = ({username, page, size,sort = 'id',search = ''}) => {
    return {type: GET_ACTIVITY_PAGE_BY_USERNAME.LOAD, payload: {username, page, size, sort, search}};
}
export const getActivityPageByUsernameSuccess = (activityPage) => {
    return {type: GET_ACTIVITY_PAGE_BY_USERNAME.SUCCESS, payload: activityPage };
}

export const getActivityPageByUsernameFailed = (error) => {
    return {type: GET_ACTIVITY_PAGE_BY_USERNAME.FAILED, payload: error};
}