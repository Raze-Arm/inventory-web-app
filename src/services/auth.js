import Api from  '../apis/inventory-api';



export const login = async ({username ,password}) => {
    const response = await Api.post('/v1/login', {username, password}, {withCredentials: true});
    console.log('userinfo###', response)

    const userInfo = getCookie('user_info');
    return userInfo;
}

export const logout = async () => {
    const response = await Api.post('/v1/logout');
    return response.data;
}


export const forgotPassword = async (username, email) => {
    const response = await Api.post('/v1/forgotpassword', {username, email});
    return response.data;
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}