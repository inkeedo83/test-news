import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_AUDIENCE,
} from "../../assets/env";

const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();

  const domain = AUTH0_DOMAIN;
  const clientId = AUTH0_CLIENT_ID;
  const audience = AUTH0_AUDIENCE;

  if (!domain || !clientId) {
    console.error("Missing Auth0 domain or client ID");
    console.log("Domain:", domain, "ClientId:", clientId);
    return null;
  }

  // Function called after authentication is completed
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
        audience: audience, // Specify audience for access token
        scope: "openid profile email",
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage" // Store state in localStorage
      useRefreshTokens={true} // Enable refresh tokens
    >
      {children}
    </Auth0Provider>
  );
};

Auth0ProviderWithHistory.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Auth0ProviderWithHistory;
