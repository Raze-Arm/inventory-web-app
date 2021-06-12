import Api from '../apis/inventory-api';

const VER ='/v1'


export const fetchProfile = async (username) => {
    const response = await Api.get(VER + `/profile/${username}` ,);
    return response.data;
}



export const updateProfile = async (profile) => {
    const data = new FormData();
    const {id, firstName, lastName, username, password , photo} = profile;
    if(photo) {
        data.append('photo',photo);
    }
    if(id)data.append('id',id);
    if(firstName)data.append('firstName', firstName);
    if(lastName)data.append('lastName', lastName);
    if(username)data.append('username', username);
    if(password)data.append('password', password);
    const response = await Api.put(VER + '/profile', data );
    return response.data;
}


export const downloadProfilePhoto = async  (username) => {
    const response = await Api.get(VER + `/download/profile/${username}` , {responseType: "blob" ,});
        let blob = new Blob([response.data] ,);
    return blob;
}