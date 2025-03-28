import baseUrl from "../assets/constants";

/**
 * Function to get authentication token from local storage
 * @returns {string|null} Authentication token or null if token not found
 */
export const getAuthToken = () => {
  const token = localStorage.getItem("auth_token");
  console.log(
    "Getting auth token from localStorage:",
    token ? "Token exists" : "No token"
  );
  return token;
};

/**
 * Function to save authentication token in local storage
 * @param {string} token - Authentication token
 */
export const saveAuthToken = (token) => {
  console.log(
    "Saving auth token to localStorage:",
    token ? "Token provided" : "No token"
  );
  localStorage.setItem("auth_token", token);
};

/**
 * Function to remove authentication token from local storage
 */
export const removeAuthToken = () => {
  console.log("Removing auth token from localStorage");
  localStorage.removeItem("auth_token");
};

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
    headers["Authorization"] = `Bearer ${token}`; // Note the use of square brackets
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
    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log(`API response from ${url}, status: ${response.status}`);

    // If response is not successful due to authorization issues, try to refresh token
    if (response.status === 401 && !isPublicEndpoint) {
      console.log("Received 401 Unauthorized response, token might be invalid");

      // Remove current token
      removeAuthToken();

      // Here we can throw a special error that will be handled by UI
      throw new Error("UNAUTHORIZED");
    }

    // Check for success for other errors
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // For DELETE method usually there is no JSON response
    if (options.method === "DELETE") {
      return { success: true };
    }

    // For other methods parse JSON response
    return await response.json();
  } catch (error) {
    // If this is our special authorization error, pass it further
    if (error.message === "UNAUTHORIZED") {
      throw error;
    }

    // Log other errors and transform to a readable format
    console.error("API Request failed:", error);
    throw new Error(`API Request failed: ${error.message}`);
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
