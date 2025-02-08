import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AdminPanel from "../AdminPanel/AdminPanel";

const AdminProtectedRoute = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
      <AdminPanel />
      <button
        onClick={() => logout({ returnTo: window.location.origin })}
        className="block text-white rounded-xl bg-red-800 p-3 mt-10 mb-10"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminProtectedRoute;
