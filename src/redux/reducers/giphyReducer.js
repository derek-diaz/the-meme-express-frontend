/**
 * Giphy Redux - Reducer
 *
 * @file   giphyReducer.js
 * @author Derek Diaz Correa
 * @since  7.17.2019
 */
import {actions} from '../actions/giphyActions';

const initialState = {
    loading: false,
    error: false,
    errorMessage: "",
    status: "",
    data: []
};

function giphyReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GIPHY_SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: "",
                status: ""
            };
        case actions.GIPHY_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: "",
                status: action.status,
                data: action.data
            };
        case actions.GIPHY_SEARCH_FAILED:
            return {
                ...state,
                loading: false,
                errorMessage: action.error,
                status: action.status,
                error: true
            };
        default:
            return state
    }
}

export default giphyReducer