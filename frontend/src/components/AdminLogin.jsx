import { useState } from "react";
import axios from "axios";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("admin@property.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ ENV based backend URL (local + production)
  const backendBaseUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${backendBaseUrl}/api/admin/properties/login`,
        { email, password }
      );

      // ✅ REAL JWT (used by backend adminMiddleware)
      localStorage.setItem("adminToken", res.data.token);

      // ✅ ONLY for Hotels UI
      localStorage.setItem("hotelAdminToken", "authenticated");

      onLogin(true);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
      onLogin(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Admin Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2 w-full mb-3"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-3 py-2 w-full mb-4"
            required
          />

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <button
          onClick={() => onLogin(false)}
          className="mt-4 text-gray-500 underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
