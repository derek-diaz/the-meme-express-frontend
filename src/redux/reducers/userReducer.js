/**
 * User Redux - Reducer
 *
 * @file   userReducer.js
 * @author Derek Diaz Correa
 * @since  7.17.2019
 */
import {actions} from '../actions/userActions';

const initialState = {
    loading: false,
    error: false,
    errorMessage: "",
    status: "",
    data: []
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case actions.USER_LOGIN_REQUEST:
        case actions.USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: "",
                status: ""
            };
        case actions.USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: "",
                status: action.status,
                data: action.data
            };
        case actions.USER_LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                errorMessage: action.error,
                status: action.status,
                error: true
            };
        case actions.USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: "",
                status: action.status
            };
        case actions.USER_REGISTER_FAILED:
            return {
                ...state,
                loading: false,
                errorMessage: action.error.message,
                status: action.status,
                error: true
            };
        default:
            return state
    }
}

export default userReducer