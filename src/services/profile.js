import Api from '../apis/inventory-api';

const VER ='/v1'


export const fetchProfile = async (username) => {
    const response = await Api.get(VER + `/profile/${username}` ,);
    return response.data;
}



export const updateProfile = async (profile) => {
    const data = new FormData();
    const {id, firstName, lastName, email, username, password , photo} = profile;
    if(photo) {
        data.append('photo',photo);
    }
    if(id)data.append('id',id);
    if(firstName)data.append('firstName', firstName);
    if(lastName)data.append('lastName', lastName);
    if(email)data.append('email', email);
    if(username)data.append('username', username);
    if(password)data.append('password', password);
    const response = await Api.put(VER + '/profile', data );
    return response.data;
}
