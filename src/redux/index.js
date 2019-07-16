import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import giphyReducer from "./reducers/giphyReducer";

const reducers = combineReducers({
    userReducer,
    giphyReducer
});

export default reducers;
