import Api from '../apis/inventory-api';
const VER ='/v1'


export const fetchUserPage = async ({page, size, sort, search}) => {
    const response = await Api.get(VER +'/user', {params: {
            page,
            size,
            sort,
            search
        }});
    return response.data;
}

export const fetchUser = async (id) => {
    const response = await Api.get(VER +`/user/${id}` ,);
    return response.data;
}

export const fetchUserByUsername = async (username) => {
    const response = await Api.get(VER +`/user` , {params: {
            username
        }});
    return response.data;
}

export const postUser = async (user) => {
    const data = new FormData();
    const userPhoto = user?.photo;
    if(userPhoto) {
        data.append('photo',userPhoto);
    }
    data.append('firstName', user.firstName);
    data.append('lastName', user.lastName);
    data.append('username', user.username);
    data.append('password', user.password);
    data.append('role', user.role);
    const response = await Api.post(VER +'/user', data );
    return response.data;
}

export const updateUser = async (user) => {
    const data = new FormData();
    const userPhoto = user?.photo;
    if(userPhoto) {
        data.append('photo',userPhoto);
    }
    data.append('id',user.id);
    data.append('firstName', user.firstName);
    data.append('lastName', user.lastName);
    data.append('username', user.username);
    data.append('password', user.password);
    data.append('role', user.role);
    const response = await Api.put(VER +'/user', data );
    return response.data;
}


export const downloadUserPhoto = async  (id) => {
    const response = await Api.get(VER +`/download/user/${id}` , {responseType: "blob" , });
    let blob = new Blob([response.data] ,);
    return blob;
}
export const downloadPhotoByUsername = async (username) => {
    const response = await Api.get(VER +`/download/user`, {params: {username}, responseType: 'blob'});
    let blob = new Blob([response.data]);
    return blob;
}

export const deleteUser = async  (id) => {
    const response = Api.delete(VER +`/user/${id}`);
    return response.data;
}