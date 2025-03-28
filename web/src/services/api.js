import baseUrl from "../assets/constants";

/**
 * Функция для получения токена аутентификации из локального хранилища
 * @returns {string|null} Токен аутентификации или null, если токен не найден
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
 * Функция для сохранения токена аутентификации в локальном хранилище
 * @param {string} token - Токен аутентификации
 */
export const saveAuthToken = (token) => {
  console.log(
    "Saving auth token to localStorage:",
    token ? "Token provided" : "No token"
  );
  localStorage.setItem("auth_token", token);
};

/**
 * Функция для удаления токена аутентификации из локального хранилища
 */
export const removeAuthToken = () => {
  console.log("Removing auth token from localStorage");
  localStorage.removeItem("auth_token");
};

/**
 * Универсальная функция для выполнения API-запросов с авторизацией
 * @param {string} endpoint - Конечная точка API (относительный путь)
 * @param {Object} options - Параметры запроса (метод, тело и т.д.)
 * @returns {Promise<any>} Результат запроса в формате JSON
 */
export const apiRequest = async (endpoint, options = {}) => {
  const isPublicEndpoint = endpoint.includes("public");
  const token = getAuthToken();

  // Подготовка заголовков
  const headers = {
    ...options.headers,
  };

  // Добавляем заголовок авторизации, если это не публичный эндпоинт и токен доступен
  if (!isPublicEndpoint && token) {
    headers["Authorization"] = `Bearer ${token}`; // Обратите внимание на использование квадратных скобок
    console.log(
      `Adding Authorization header for endpoint ${endpoint}:`,
      headers.Authorization
    );
  } else {
    console.log(
      `Not adding Authorization header for endpoint ${endpoint}. Public: ${isPublicEndpoint}, Token exists: ${!!token}`
    );
  }

  // Если данные отправляются как FormData, не добавляем Content-Type,
  // браузер сам установит правильный заголовок с boundary
  if (
    !(options.body instanceof FormData) &&
    !headers["Content-Type"] &&
    options.method !== "GET"
  ) {
    headers["Content-Type"] = "application/json";
  }

  // Полный URL запроса
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

    // Если ответ не успешен из-за проблем с авторизацией, попробовать обновить токен
    if (response.status === 401 && !isPublicEndpoint) {
      console.log("Received 401 Unauthorized response, token might be invalid");

      // Удаляем текущий токен
      removeAuthToken();

      // Здесь можно выбросить специальную ошибку, которую обработает UI
      throw new Error("UNAUTHORIZED");
    }

    // Проверка на успешность ответа для других ошибок
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // Для метода DELETE обычно нет JSON ответа
    if (options.method === "DELETE") {
      return { success: true };
    }

    // Для остальных методов парсим JSON ответ
    return await response.json();
  } catch (error) {
    // Если это наша специальная ошибка авторизации, пробрасываем её дальше
    if (error.message === "UNAUTHORIZED") {
      throw error;
    }

    // Другие ошибки логируем и преобразуем в понятный формат
    console.error("API Request failed:", error);
    throw new Error(`API Request failed: ${error.message}`);
  }
};

/**
 * Функция для отправки GET-запроса
 * @param {string} endpoint - Конечная точка API
 * @param {Object} options - Дополнительные параметры запроса
 * @returns {Promise<any>} Результат запроса в формате JSON
 */
export const get = (endpoint, options = {}) => {
  return apiRequest(endpoint, { ...options, method: "GET" });
};

/**
 * Функция для отправки POST-запроса
 * @param {string} endpoint - Конечная точка API
 * @param {Object|FormData} data - Данные для отправки
 * @param {Object} options - Дополнительные параметры запроса
 * @returns {Promise<any>} Результат запроса в формате JSON
 */
export const post = (endpoint, data, options = {}) => {
  // Если данные не являются FormData, преобразуем их в JSON
  const body = data instanceof FormData ? data : JSON.stringify(data);

  return apiRequest(endpoint, {
    ...options,
    method: "POST",
    body,
  });
};

/**
 * Функция для отправки PATCH-запроса
 * @param {string} endpoint - Конечная точка API
 * @param {Object|FormData} data - Данные для отправки
 * @param {Object} options - Дополнительные параметры запроса
 * @returns {Promise<any>} Результат запроса в формате JSON
 */
export const patch = (endpoint, data, options = {}) => {
  // Если данные не являются FormData, преобразуем их в JSON
  const body = data instanceof FormData ? data : JSON.stringify(data);

  return apiRequest(endpoint, {
    ...options,
    method: "PATCH",
    body,
  });
};

/**
 * Функция для отправки DELETE-запроса
 * @param {string} endpoint - Конечная точка API
 * @param {Object} options - Дополнительные параметры запроса
 * @returns {Promise<any>} Результат запроса в формате JSON
 */
export const del = (endpoint, options = {}) => {
  return apiRequest(endpoint, { ...options, method: "DELETE" });
};
