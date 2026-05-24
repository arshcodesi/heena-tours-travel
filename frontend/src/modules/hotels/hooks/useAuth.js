import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [trigger, setTrigger] = useState(0);  // Added for re-checking

  useEffect(() => {
    // Check for admin token in localStorage
    const token = localStorage.getItem("adminToken");
    setIsAdmin(token === "authenticated");
  }, [trigger]);  // Re-run when trigger changes

  const logout = () => {
    localStorage.removeItem("adminToken");
    setIsAdmin(false);
  };

  const checkAuth = () => setTrigger(prev => prev + 1);  // Function to re-check auth

  return { isAdmin, logout, checkAuth };
};