import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function AdminGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, true = authenticated, false = not

  useEffect(() => {
    // Check for admin token in localStorage (adjust if your token key differs)
    const token = localStorage.getItem("adminToken");
    if (token) {
      // Optional: Validate token with backend (e.g., call /api/admin/verify)
      // For now, assume token presence means authenticated
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return <div className="text-center py-10">Checking authentication...</div>;
  }

  // If not authenticated, redirect to home or login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the protected component
  return children;
}