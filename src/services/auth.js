import Api from  '../apis/inventory-api';



export const login = async ({username ,password}) => {
    const response = await Api.post('/login', {username, password});
    const token = response.headers.authorization;
    return token;
}

export const logout = async () => {
    console.log('sending logout post');
    const response = await Api.post('/logout');
    return response.data;
}