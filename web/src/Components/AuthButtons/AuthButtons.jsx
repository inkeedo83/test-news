import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { saveAuthToken, removeAuthToken } from "../../services/api";

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  // Automatically get token when component mounts and save it
  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          console.log("AuthButtons: Getting access token...");
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: "https://auth0-m2m-back.com",
              scope: "openid profile email",
            },
          });
          console.log("AuthButtons: Token received, saving to localStorage");
          saveAuthToken(token);
        } catch (error) {
          console.error("Error getting access token:", error);
        }
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  // Function for logging out
  const handleLogout = () => {
    // Remove token from localStorage
    removeAuthToken();

    // Call standard Auth0 logout
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className="text-center pt-72 mt-4">
      {!isAuthenticated ? (
        <button
          onClick={() => loginWithRedirect()}
          className="text-white rounded-xl bg-red-800 p-3"
        >
          Login
        </button>
      ) : (
        <button
          onClick={handleLogout}
          className="text-white rounded-xl bg-red-800 p-3"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default AuthButtons;
