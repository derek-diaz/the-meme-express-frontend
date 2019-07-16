import axios from 'axios';
import {SERVICE_BASE_URL} from "../../constants";
import qs from "qs";

export const actions = {
    FAVORITE_ADD_REQUEST: 'FAVORITE_ADD_REQUEST',
    FAVORITE_ADD_SUCCESS: 'FAVORITE_ADD_SUCCESS',
    FAVORITE_ADD_FAILED: 'FAVORITE_ADD_FAILED',
    FAVORITE_LIST_REQUEST: 'FAVORITE_LIST_REQUEST',
    FAVORITE_LIST_SUCCESS: 'FAVORITE_LIST_SUCCESS',
    FAVORITE_LIST_FAILED: 'FAVORITE_LIST_FAILED',
    FAVORITE_UPDATE_REQUEST: 'FAVORITE_UPDATE_REQUEST',
    FAVORITE_UPDATE_SUCCESS: 'FAVORITE_UPDATE_SUCCESS',
    FAVORITE_UPDATE_FAILED: 'FAVORITE_UPDATE_FAILED',
    FAVORITE_DELETE_REQUEST: 'FAVORITE_DELETE_REQUEST',
    FAVORITE_DELETE_SUCCESS: 'FAVORITE_DELETE_SUCCESS',
    FAVORITE_DELETE_FAILED: 'FAVORITE_DELETE_FAILED',
};

export function addFavoriteRequest() {
    return { type: actions.FAVORITE_ADD_REQUEST }
}

export function addFavoriteSuccess(response) {
    return { type: actions.FAVORITE_ADD_SUCCESS, status: response.status }
}

export function addFavoriteFailed(error) {
    return { type: actions.FAVORITE_ADD_FAILED, error }
}

export function listFavoriteRequest() {
    return { type: actions.FAVORITE_LIST_REQUEST }
}

export function listFavoriteSuccess(response) {
    return { type: actions.FAVORITE_LIST_SUCCESS, status: response.status, data: response.data.data }
}

export function listFavoriteFailed(error) {
    return { type: actions.FAVORITE_LIST_FAILED, error }
}

export function updateFavoriteRequest() {
    return { type: actions.FAVORITE_UPDATE_REQUEST }
}

export function updateFavoriteSuccess(response) {
    return { type: actions.FAVORITE_UPDATE_SUCCESS, status: response.status }
}

export function updateFavoriteFailed(error) {
    return { type: actions.FAVORITE_UPDATE_FAILED, error }
}

export function deleteFavoriteRequest() {
    return { type: actions.FAVORITE_DELETE_REQUEST }
}

export function deleteFavoriteSuccess(response) {
    return { type: actions.FAVORITE_DELETE_SUCCESS, status: response.status }
}

export function deleteFavoriteFailed(error) {
    return { type: actions.FAVORITE_DELETE_FAILED, error }
}

export const addFavorite = (token, category, giphy_id) => (dispatch) => {
    dispatch(addFavoriteRequest());

    const serviceURL = SERVICE_BASE_URL + 'giphy/';

    const payload = qs.stringify({
        category,
        giphy_id
    });

    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': token
        }
    };

    axios.post(serviceURL, payload, config)
        .then(function (response) {
            console.log(response);
            dispatch(addFavoriteSuccess(response));
        })
        .catch(function (error) {
            console.log(error);
            dispatch(addFavoriteFailed(error));
        });
};

export const listFavorite = (token) => (dispatch) => {
    dispatch(listFavoriteRequest());

    const serviceURL = SERVICE_BASE_URL + 'giphy/';

    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': token
        }
    };

    axios.get(serviceURL, config)
        .then(function (response) {
            console.log(response);
            dispatch(listFavoriteSuccess(response));
        })
        .catch(function (error) {
            console.log(error);
            dispatch(listFavoriteFailed(error));
        });
};

export const updateFavorite = (giphy_id, token, category) => (dispatch) => {
    dispatch(updateFavoriteRequest());

    const serviceURL = SERVICE_BASE_URL + 'giphy/' + giphy_id;

    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': token
        }
    };

    const payload = qs.stringify({
        category
    });

    axios.put(serviceURL, payload, config)
        .then(function (response) {
            console.log(response);
            dispatch(updateFavoriteSuccess(response));
        })
        .catch(function (error) {
            console.log(error);
            dispatch(updateFavoriteFailed(error));
        });
};

export const deleteFavorite = (giphy_id, token) => (dispatch) => {
    dispatch(deleteFavoriteRequest());

    const serviceURL = SERVICE_BASE_URL + 'giphy/' + giphy_id;

    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': token
        }
    };

    axios.delete(serviceURL, config)
        .then(function (response) {
            console.log(response);
            dispatch(deleteFavoriteSuccess(response));
        })
        .catch(function (error) {
            console.log(error);
            dispatch(deleteFavoriteFailed(error));
        });
};
