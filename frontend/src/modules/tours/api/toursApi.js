// toursApi.js (FULLY FIXED)

const API_BASE = import.meta.env.VITE_API_URL;

/**
 * Validate API base URL early
 */
if (!API_BASE) {
  console.error("❌ VITE_API_URL is not defined. Check your .env files.");
}

/**
 * Admin token helper (match your other modules)
 */
function getToken() {
  try {
    return localStorage.getItem("adminToken"); // ✅ unified key
  } catch {
    return null;
  }
}

/**
 * Core request wrapper
 * ✅ Ensures all requests go to /api/*
 */
async function request(path, options = {}) {
  const base = API_BASE?.endsWith("/") ? API_BASE.slice(0, -1) : API_BASE;
  const url = `${base}/api${path}`;

  const res = await fetch(url, {
    credentials: "omit",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const message =
      data?.message || data?.error || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data;
}

/* =========================================================
   PUBLIC APIs
========================================================= */

/**
 * Fetch active tours (public)
 * Backend route: GET /api/tours
 */
export async function fetchActiveTours() {
  return request("/tours");
}

/**
 * Create booking (public)
 * Backend route: POST /api/bookings
 */
export async function createBooking(payload) {
  return request("/bookings", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/* =========================================================
   ADMIN AUTH
========================================================= */

/**
 * Admin login
 * Backend route: POST /api/auth/admin/login
 */
export async function adminLogin(payload) {
  return request("/auth/admin/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/* =========================================================
   ADMIN TOURS
========================================================= */

function adminHeaders() {
  const token = getToken();
  if (!token) {
    throw new Error("Admin not authenticated. Please login again.");
  }
  return { Authorization: `Bearer ${token}` };
}

export async function fetchAdminTours() {
  return request("/admin/tours", {
    headers: adminHeaders(),
  });
}

export async function createTour(payload) {
  return request("/admin/tours", {
    method: "POST",
    headers: adminHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function updateTour(id, payload) {
  return request(`/admin/tours/${id}`, {
    method: "PUT",
    headers: adminHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function deleteTour(id) {
  return request(`/admin/tours/${id}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
}

export async function toggleTourActive(id, active) {
  return request(`/admin/tours/${id}/active`, {
    method: "PATCH",
    headers: adminHeaders(),
    body: JSON.stringify({ active }),
  });
}
