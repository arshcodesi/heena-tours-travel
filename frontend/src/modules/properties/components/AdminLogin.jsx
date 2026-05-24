import { useState } from "react";
import axios from "axios";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
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

      const token = res.data?.token;
      if (!token) {
        setError("Login failed: token not received");
        return;
      }

      // ✅ Main JWT used everywhere
      localStorage.setItem("adminToken", token);

      // ✅ Optional legacy key (safe)
      localStorage.setItem("propertyAdminToken", token);

      onLogin(true);
    } catch (e) {
      setError(e.response?.data?.error || "Login failed");
      onLogin(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="mb-4 w-full p-2 border"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="mb-4 w-full p-2 border"
          />

          {error && <div className="text-red-500 mb-2">{error}</div>}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
