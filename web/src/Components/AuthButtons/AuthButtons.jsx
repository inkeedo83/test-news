import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div className="text-center mt-4">
      {!isAuthenticated ? (
        <button
          onClick={() => loginWithRedirect()}
          className="text-white rounded-xl bg-red-800 p-3"
        >
          Login
        </button>
      ) : (
        <button
          onClick={() => logout({ returnTo: window.location.origin })}
          className="text-white rounded-xl bg-red-800 p-3"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default AuthButtons;
