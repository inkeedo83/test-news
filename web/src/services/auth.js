/**
 * Functions for working with authorization and Auth0 tokens
 */

// Key for storing the token in localStorage
const AUTH_TOKEN_KEY = "auth_token";

/**
 * Saves the authorization token to localStorage
 * @param {string} token - Authorization token
 */
export const saveAuthToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

/**
 * Gets the authorization token from localStorage
 * @returns {string|null} Authorization token or null if token doesn't exist
 */
export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Removes the authorization token from localStorage
 */
export const removeAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

/**
 * Checks if authorization token exists in localStorage
 * @returns {boolean} true if token exists, otherwise false
 */
export const hasAuthToken = () => {
  return !!getAuthToken();
};
