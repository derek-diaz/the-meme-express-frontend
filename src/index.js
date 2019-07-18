/**
 * Index
 *
 * @file   index.js
 * @author Derek Diaz Correa
 * @since  7.17.2019
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from "./redux"
import {loadState, saveState} from "./utils/localStorage";

const persistedState = loadState();
const store = createStore(reducers, persistedState, applyMiddleware(thunk),);

store.subscribe(() => {
    saveState(store.getState());
});



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
