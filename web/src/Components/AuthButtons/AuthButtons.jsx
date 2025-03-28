import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { saveAuthToken } from "../../services/api";

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  // Автоматически получаем токен при монтировании компонента и сохраняем его
  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          console.log("AuthButtons: Getting access token...");
          const token = await getAccessTokenSilently({
            audience: "https://auth0-m2m-back.com",
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

  // Функция для выхода из системы
  const handleLogout = () => {
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
