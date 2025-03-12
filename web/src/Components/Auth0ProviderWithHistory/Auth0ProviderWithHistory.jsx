import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();

  const domain =
    import.meta.env.VITE_AUTH0_DOMAIN ?? "dev-l68rxy2gc8yazd51.eu.auth0.com";
  const clientId =
    import.meta.env.VITE_AUTH0_CLIENT_ID ?? "69RyT89I9EMjNPQLB1CBXl8V52K87lzX";

  if (!domain || !clientId) {
    console.error("Missing Auth0 domain or client ID");
    return null;
  }

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || "/admin");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
