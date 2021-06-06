import Api from '../apis/inventory-api';

export const fetchUserActivityPage = async ({page, size, sort, search}) => {
    const response = await Api.get('/profile/activity', {params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}

export const fetchActivityPage = async ({page, size, sort, search}) => {
    const response = await Api.get('/activity', {params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}

export const fetchActivityPageByUsername = async ({username, page, size, sort, search}) => {
    const response = await Api.get(`/activity`, {params: {
            username,
            page,
            size,
            sort,
            search
        }});
    return response.data;
}