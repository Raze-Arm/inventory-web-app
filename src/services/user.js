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
    const {firstName, lastName, email, username, password, role, photo} = user;
    if(photo) {
        data.append('photo',photo);
    }
    if(firstName)data.append('firstName', firstName);
    if(lastName)data.append('lastName', lastName);
    if(email)data.append('email', email);
    if(username)data.append('username', username);
    if(password)data.append('password', password);
    if(role)data.append('role', role);
    const response = await Api.post(VER +'/user', data );
    return response.data;
}

export const updateUser = async (user) => {
    const data = new FormData();
    const {id, firstName, lastName, email, username, password, role, photo} = user;
    if(photo) {
        data.append('photo',photo);
    }
    if(id)data.append('id',id);
    if(firstName)data.append('firstName', firstName);
    if(lastName)data.append('lastName', lastName);
    if(email)data.append('email', email);
    if(username)data.append('username', username);
    if(password)data.append('password', password);
    if(role)data.append('role', role);
    const response = await Api.put(VER +'/user', data );
    return response.data;
}




export const deleteUser = async  (id) => {
    const response = Api.delete(VER +`/user/${id}`);
    return response.data;
}