import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import giphyReducer from "./reducers/giphyReducer";
import favoritesReducer from "./reducers/favoritesReducer";

const reducers = combineReducers({
    userReducer,
    giphyReducer,
    favoritesReducer
});

export default reducers;
