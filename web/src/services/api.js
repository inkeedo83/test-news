import baseUrl from "../assets/constants";
import { getAuthToken, removeAuthToken } from "./auth";
import axios from "axios";

/**
 * Universal function for making API requests with authorization
 * @param {string} endpoint - API endpoint (relative path)
 * @param {Object} options - Request parameters (method, body, etc.)
 * @returns {Promise<any>} Request result in JSON format
 */
export const apiRequest = async (endpoint, options = {}) => {
  const isPublicEndpoint = endpoint.includes("public");
  const token = getAuthToken();

  // Preparing headers
  const headers = {
    ...options.headers,
  };

  // Add authorization header if it's not a public endpoint and token is available
  if (!isPublicEndpoint && token) {
    headers["Authorization"] = `Bearer ${token}`;
    console.log(
      `Adding Authorization header for endpoint ${endpoint}:`,
      headers.Authorization
    );
  } else {
    console.log(
      `Not adding Authorization header for endpoint ${endpoint}. Public: ${isPublicEndpoint}, Token exists: ${!!token}`
    );
  }

  // If data is sent as FormData, don't add Content-Type,
  // browser will set the correct header with boundary
  if (
    !(options.body instanceof FormData) &&
    !headers["Content-Type"] &&
    options.method !== "GET"
  ) {
    headers["Content-Type"] = "application/json";
  }

  // Full request URL
  const url = `${baseUrl}${
    endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  }`;
  console.log(`API request to ${url}, method: ${options.method || "GET"}`);
  console.log("Request headers:", headers);

  try {
    const response = await axios({
      url,
      method: options.method || "GET",
      headers,
      data: options.body,
      validateStatus: (status) => status >= 200 && status < 300,
    });

    console.log(`API response from ${url}, status: ${response.status}`);

    // For DELETE method usually there is no JSON response
    if (options.method === "DELETE") {
      return { success: true };
    }

    return response.data;
  } catch (error) {
    // Handle 401 Unauthorized error
    if (error.response?.status === 401 && !isPublicEndpoint) {
      console.log("Received 401 Unauthorized response, token might be invalid");
      removeAuthToken();
      throw new Error("UNAUTHORIZED");
    }

    // Handle other errors
    console.error("API Request failed:", error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(
        `API Error: ${error.response.status} ${error.response.statusText}`
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Request setup failed: ${error.message}`);
    }
  }
};

/**
 * Function for sending GET request
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Additional request parameters
 * @returns {Promise<any>} Request result in JSON format
 */
export const get = (endpoint, options = {}) => {
  return apiRequest(endpoint, { ...options, method: "GET" });
};

/**
 * Function for sending POST request
 * @param {string} endpoint - API endpoint
 * @param {Object|FormData} data - Data to send
 * @param {Object} options - Additional request parameters
 * @returns {Promise<any>} Request result in JSON format
 */
export const post = (endpoint, data, options = {}) => {
  // If data is not FormData, convert to JSON
  const body = data instanceof FormData ? data : JSON.stringify(data);

  return apiRequest(endpoint, {
    ...options,
    method: "POST",
    body,
  });
};

/**
 * Function for sending PATCH request
 * @param {string} endpoint - API endpoint
 * @param {Object|FormData} data - Data to send
 * @param {Object} options - Additional request parameters
 * @returns {Promise<any>} Request result in JSON format
 */
export const patch = (endpoint, data, options = {}) => {
  // If data is not FormData, convert to JSON
  const body = data instanceof FormData ? data : JSON.stringify(data);

  return apiRequest(endpoint, {
    ...options,
    method: "PATCH",
    body,
  });
};

/**
 * Function for sending DELETE request
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Additional request parameters
 * @returns {Promise<any>} Request result in JSON format
 */
export const del = (endpoint, options = {}) => {
  return apiRequest(endpoint, { ...options, method: "DELETE" });
};
