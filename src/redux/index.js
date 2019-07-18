/**
 * Redux
 *
 * @file   index.js
 * @author Derek Diaz Correa
 * @since  7.17.2019
 */
import {combineReducers} from "redux";
import userReducer from "./reducers/userReducer";
import giphyReducer from "./reducers/giphyReducer";
import favoritesReducer from "./reducers/favoritesReducer";

const reducers = combineReducers({
    userReducer,
    giphyReducer,
    favoritesReducer
});

export default reducers;
