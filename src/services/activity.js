import Api from '../apis/inventory-api';

const VER ='/v1'

export const fetchUserActivityPage = async ({page, size, sort, search}) => {
    const response = await Api.get(VER + '/profile/activity', {params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}

export const fetchActivityPage = async ({page, size, sort, search}) => {
    const response = await Api.get(VER + '/activity', {params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}

export const fetchActivityPageByUsername = async ({username, page, size, sort, search}) => {
    const response = await Api.get(VER + `/activity`, {params: {
            username,
            page,
            size,
            sort,
            search
        }});
    return response.data;
}