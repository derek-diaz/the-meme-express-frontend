import axios from 'axios';
import {SERVICE_BASE_URL, API_KEY, GIPHY_BASE_URL} from "../../constants";
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
    FAVORITE_GIPHY_REQUEST: 'FAVORITE_GIPHY_REQUEST',
    FAVORITE_GIPHY_SUCCESS: 'FAVORITE_GIPHY_SUCCESS',
    FAVORITE_GIPHY_FAILED: 'FAVORITE_GIPHY_FAILED',
};

export function favoriteRequest(type) {
    return { type }
}

export function favoriteSuccess(type, response) {
    if(type === actions.FAVORITE_LIST_SUCCESS || type === actions.FAVORITE_GIPHY_SUCCESS)
        return { type, status: response.status, data: response.data.data };
    else {
        return {type, status: response.status};
    }

}

export function favoriteFailed(type, error) {
    return { type, error }
}

export const addFavorite = (token, category, giphy_id) => (dispatch) => {
    dispatch(favoriteRequest(actions.FAVORITE_ADD_REQUEST));

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
            dispatch(favoriteSuccess(actions.FAVORITE_ADD_SUCCESS, response));
        })
        .catch(function (error) {
            console.log(error);
            dispatch(favoriteFailed(actions.FAVORITE_ADD_FAILED, error));
        });
};

export const listFavorite = (token) => (dispatch) => {
    dispatch(favoriteRequest(actions.FAVORITE_LIST_REQUEST));

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
            dispatch(favoriteSuccess(actions.FAVORITE_LIST_SUCCESS, response));

            const ids = response.data.data.favorites.map((gif, index) => (
                    gif.giphy
            ));
            const parsedIds = ids.join();
            dispatch(getGiphys(parsedIds));
        })
        .catch(function (error) {
            console.log(error);
            dispatch(favoriteFailed(actions.FAVORITE_LIST_FAILED, error));
        });
};

export const updateFavorite = (giphy_id, token, category) => (dispatch) => {
    dispatch(favoriteRequest(actions.FAVORITE_UPDATE_REQUEST));

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
            dispatch(favoriteSuccess(actions.FAVORITE_UPDATE_SUCCESS, response));
            dispatch(listFavorite(token));
        })
        .catch(function (error) {
            console.log(error);
            dispatch(favoriteFailed(actions.FAVORITE_UPDATE_FAILED, error));
        });
};

export const deleteFavorite = (giphy_id, token) => (dispatch) => {
    dispatch(favoriteRequest(actions.FAVORITE_DELETE_REQUEST));

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
            dispatch(favoriteSuccess(actions.FAVORITE_DELETE_SUCCESS, response));
            dispatch(listFavorite(token));
        })
        .catch(function (error) {
            console.log(error);
            dispatch(favoriteFailed(actions.FAVORITE_DELETE_FAILED, error));
        });
};

export const getGiphys = (ids) => (dispatch) => {
    dispatch(favoriteRequest(actions.FAVORITE_GIPHY_REQUEST));
    const serviceURL = GIPHY_BASE_URL + '?api_key=' + API_KEY + '&ids=' + ids;
    axios.get(serviceURL)
        .then(function (response) {
            dispatch(favoriteSuccess(actions.FAVORITE_GIPHY_SUCCESS, response));
        })
        .catch(function (error) {
            console.log(error);
            dispatch(favoriteFailed(actions.FAVORITE_GIPHY_FAILED, error));
        });
};
