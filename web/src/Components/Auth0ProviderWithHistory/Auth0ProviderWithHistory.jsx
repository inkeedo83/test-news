import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = "https://auth0-m2m-back.com"; // Целевая аудиенция для API

  if (!domain || !clientId) {
    console.error("Missing Auth0 domain or client ID");
    console.log("Domain:", domain, "ClientId:", clientId);
    return null;
  }

  // Функция вызывается после завершения аутентификации
  const onRedirectCallback = (appState) => {
    console.log(
      "Auth0 redirect callback called, navigating to:",
      appState?.returnTo || "/admin"
    );
    navigate(appState?.returnTo || "/admin");
  };

  console.log("Auth0Provider initialized with audience:", audience);

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience, // Указываем аудиторию для получения токена доступа
        scope: "openid profile email",
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage" // Сохраняем состояние в localStorage
      useRefreshTokens={true} // Включаем использование refresh токенов
    >
      {children}
    </Auth0Provider>
  );
};

Auth0ProviderWithHistory.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Auth0ProviderWithHistory;
