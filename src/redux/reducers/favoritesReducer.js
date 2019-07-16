import {actions} from '../actions/favoriteActions';

const initialState = {
    loading: false,
    error: false,
    errorMessage: "",
    status: "",
    data: []
};

function userReducer (state = initialState, action){
    switch (action.type){
        case actions.FAVORITE_ADD_REQUEST:
        case actions.FAVORITE_UPDATE_REQUEST:
        case actions.FAVORITE_DELETE_REQUEST:
        case actions.FAVORITE_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: "",
                status: ""
            };
        case actions.FAVORITE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: "",
                status: action.status,
                data: action.data
            };
        case actions.FAVORITE_ADD_SUCCESS:
        case actions.FAVORITE_UPDATE_SUCCESS:
        case actions.FAVORITE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: "",
                status: action.status,
                data: ''
            };
        case actions.FAVORITE_ADD_FAILED:
        case actions.FAVORITE_UPDATE_FAILED:
        case actions.FAVORITE_DELETE_FAILED:
        case actions.FAVORITE_LIST_FAILED:
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

export default userReducer