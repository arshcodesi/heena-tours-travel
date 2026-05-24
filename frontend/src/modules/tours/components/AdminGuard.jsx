import { Navigate, useLocation } from "react-router-dom";

/**
 * Simple admin guard:
 * - If token missing -> redirect to /admin/tours/login
 * - Does not touch Home page or global layout.
 */
export default function AdminGuard({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/tours/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}