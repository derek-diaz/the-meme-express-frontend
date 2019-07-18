/**
 * Utilities - Local Storage
 *
 * @file   localStorage.js
 * @author Derek Diaz Correa
 * @since  7.17.2019
 */

/**
 * Load the state of Redux from Local Storage
 */
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

/**
 * Save the state of Redux into Local Storage
 * @param state - Object
 */
export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};
