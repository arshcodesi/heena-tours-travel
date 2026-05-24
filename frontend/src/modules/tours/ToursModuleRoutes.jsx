import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ToursPage from "./pages/ToursPage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import AdminToursPage from "./pages/AdminToursPage.jsx";
import AdminGuard from "./components/AdminGuard.jsx";
import AdminLayout from "./components/AdminLayout.jsx";

export default function ToursModuleRoutes() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin/tours");

  if (!isAdmin) {
    return (
      <Routes>
        <Route index element={<ToursPage />} />
        <Route path="*" element={<Navigate to="/tours" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="login" element={<AdminLoginPage />} />
      <Route
        index
        element={
          <AdminGuard>
            <AdminLayout>
              <AdminToursPage />
            </AdminLayout>
          </AdminGuard>
        }
      />
      <Route path="*" element={<Navigate to="/admin/tours" replace />} />
    </Routes>
  );
}