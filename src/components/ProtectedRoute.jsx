import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading, hasRole } = useAuth();

  // ⏳ While checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-red-600 text-xl font-semibold text-center">
          Access Denied <br />
          <span className="text-gray-600 text-base">
            You do not have permission to view this page.
          </span>
        </div>
      </div>
    );
  }

  // 🟢 All clear → Render protected content
  return <>{children}</>;
};

export default ProtectedRoute;
