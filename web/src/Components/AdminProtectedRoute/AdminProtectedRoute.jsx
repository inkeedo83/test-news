import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import AdminPanel from "../AdminPanel/AdminPanel";
import { saveAuthToken, removeAuthToken } from "../../services/auth";
import { AUTH0_AUDIENCE } from "../../assets/env";

const AdminProtectedRoute = () => {
  const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } =
    useAuth0();

  // Automatically get token when component mounts and save it
  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          console.log("AdminProtectedRoute: Getting access token...");
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: AUTH0_AUDIENCE,
              scope: "openid profile email",
            },
          });
          console.log(
            "AdminProtectedRoute: Token received, saving to localStorage"
          );
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

  if (!isAuthenticated) {
    return (
      <div className="text-center pt-32">
        <h1 className="text-2xl font-bold text-red-800">Admin Panel</h1>
        <button
          onClick={() =>
            loginWithRedirect({ appState: { returnTo: "/admin?" } })
          }
          className="text-white rounded-xl bg-red-800 p-3 mt-10 mb-10"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <AdminPanel getAccessTokenSilently={getAccessTokenSilently} />
      <button
        onClick={handleLogout}
        className="block text-white rounded-xl bg-red-800 p-3 mt-10 mb-10"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminProtectedRoute;
