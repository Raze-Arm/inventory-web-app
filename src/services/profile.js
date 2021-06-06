import Api from '../apis/inventory-api';



export const fetchProfile = async (username) => {
    const response = await Api.get(`/profile/${username}` ,);
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
    const response = await Api.put('/profile', data );
    return response.data;
}


export const downloadProfilePhoto = async  (username) => {
    const response = await Api.get(`/download/profile/${username}` , {responseType: "blob" ,});
        let blob = new Blob([response.data] ,);
    return blob;
}