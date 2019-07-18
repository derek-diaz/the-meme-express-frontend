/**
 * Utilities - Form Validation
 *
 * @file   favorites.js
 * @author Derek Diaz Correa
 * @since  7.17.2019
 */



/**
 * Validate if an Email is valid
 * @param email - String
 * @returns {boolean}
 */
export function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Validate if a Passowrd is valid
 * @param password - String
 * @returns {boolean}
 */
export function passwordValidator(password) {
    let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    return passwordRegex.test(password);
}