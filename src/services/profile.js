import Api from '../apis/inventory-api';

const VER ='/v1'


export const fetchProfile = async (username) => {
    const response = await Api.get(VER + `/profile/${username}` ,);
    return response.data;
}



export const updateProfile = async (profile) => {
    const data = new FormData();
    const profilePhoto = profile?.photo;
    if(profilePhoto) {
        data.append('photo',profilePhoto);
    }
    data.append('id',profile.id);
    data.append('firstName', profile.firstName);
    data.append('lastName', profile.lastName);
    data.append('username', profile.username);
    data.append('password', profile.password);
    const response = await Api.put(VER + '/profile', data );
    return response.data;
}


export const downloadProfilePhoto = async  (username) => {
    const response = await Api.get(VER + `/download/profile/${username}` , {responseType: "blob" ,});
        let blob = new Blob([response.data] ,);
    return blob;
}