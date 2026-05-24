import { useMemo } from "react";

export default function useAdminAuth() {
  const token = useMemo(() => localStorage.getItem("adminToken"), []);
  const isLoggedIn = Boolean(localStorage.getItem("adminToken"));

  function logout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/tours/login";
  }

  return { token, isLoggedIn, logout };
}