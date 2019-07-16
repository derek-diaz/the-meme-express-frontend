import {GIPHY_BASE_URL, API_KEY} from '../../constants/'
import axios from 'axios';

export const actions = {
    GIPHY_SEARCH_REQUEST: 'GIPHY_SEARCH_REQUEST',
    GIPHY_SEARCH_SUCCESS: 'GIPHY_SEARCH_SUCCESS',
    GIPHY_SEARCH_FAILED: 'GIPHY_SEARCH_FAILED',
};

export function giphyRequest() {
    return { type: actions.GIPHY_SEARCH_REQUEST }
}

export function giphySuccess(response) {
    return { type: actions.GIPHY_SEARCH_SUCCESS, status: response.status, data: response.data.data }
}

export function giphyFailed(error) {
    return { type: actions.GIPHY_SEARCH_FAILED, error }
}

export const searchGiphy = (query, offset) => (dispatch) => {
    dispatch(giphyRequest());
    const serviceURL = GIPHY_BASE_URL + '/search?api_key=' + API_KEY + '&q=' + query + '&limit=25&offset=' + offset + '&rating=G&lang=en';
    axios.get(serviceURL)
        .then(function (response) {
            dispatch(giphySuccess(response));
        })
        .catch(function (error) {
            console.log(error);
            dispatch(giphyFailed(error));
        });
};