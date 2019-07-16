import {SERVICE_BASE_URL} from '../../constants/'
import axios from 'axios';
import qs from 'qs';

export const actions = {
    USER_REGISTER_REQUEST: 'USER_REGISTER_REQUEST',
    USER_REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
    USER_REGISTER_FAILED: 'USER_REGISTER_FAILED',
    USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAILED: 'USER_LOGIN_FAILED'
};


export function registerRequest() {
    return { type: actions.USER_REGISTER_REQUEST }
}

export function registerSuccess(response) {
    return { type: actions.USER_REGISTER_SUCCESS, status: response.status }
}

export function registerFailed(error) {
    return { type: actions.USER_REGISTER_FAILED, error }
}

export function loginRequest() {
    return { type: actions.USER_LOGIN_REQUEST }
}

export function loginSuccess(response) {
    return { type: actions.USER_LOGIN_SUCCESS, data: response.data.data, status: response.status};
}

export function loginFailed(error) {
    return { type: actions.USER_LOGIN_FAILED, error}
}

export const registerUser = (email, password, name) => (dispatch) => {
    dispatch(registerRequest());

    const serviceURL = SERVICE_BASE_URL + 'user/register';

    const payload = qs.stringify({
        name,
        email,
        password
    });

    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    axios.post(serviceURL, payload, config)
        .then(function (response) {
            console.log(response);
            dispatch(registerSuccess(response));
        })
        .catch(function (error) {
            console.log(error);
            dispatch(registerFailed(error));
        });
};

export const loginUser = (email, password) => (dispatch) => {
    dispatch(loginRequest());

    const serviceURL = SERVICE_BASE_URL + 'user/login';

    const payload = qs.stringify({
        email,
        password
    });

    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    axios.post(serviceURL, payload, config)
        .then(function (response) {
            console.log(response);
            if (response.data.status === "error"){
                dispatch(loginFailed("Invalid Username or Password"));
            }else{
                dispatch(loginSuccess(response));
            }
        })
        .catch(function (error) {
            console.log(error);
            dispatch(loginFailed(error));
        });
};