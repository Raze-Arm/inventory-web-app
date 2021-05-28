import Api from '../apis/inventory-api';


export const fetchProfile = async (username) => {
    const response = await Api.get('/user' , {params: {
            username
        }});
    return response.data;
}

export const updateProfile = async (profile) => {
    const response = await Api.put('/user', profile );
    return response.data;
}