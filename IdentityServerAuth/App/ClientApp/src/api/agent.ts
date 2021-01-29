import axios, {AxiosResponse} from "axios";
import {UserManager} from "oidc-client";


const settings = {
    authority: "https://identityserver41.azurewebsites.net",
    client_id: "client_id_react",
    response_type: "code",
    redirect_uri: "https://clientapp321.azurewebsites.net/callback",
    scope: "openid profile ApiOne",
    post_logout_redirect_uri: "https://clientapp321.azurewebsites.net/logout"
}
export const userManager = new UserManager(settings)

axios.defaults.baseURL = 'https://clientapp321.azurewebsites.net/';

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(async config => {
    try {
        const user = await userManager.getUser()
        if (user !== null) {
            const token = user.access_token;
            config.headers.Authorization = `Bearer ${token}`
        }
    } catch (error) {
        console.log(error)
    }
    return config
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(undefined, error => {
    const {status, data, config} = error.responsenpm
    if (status === 401) {
        console.log('Unauthorized, try to log in');
    }
    console.log('Unauthorized, try to log in');
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}

const authRequest = {
    getSecret: ():Promise<string> => requests.get('/Home/GetSecret')
}

export default {authRequest}