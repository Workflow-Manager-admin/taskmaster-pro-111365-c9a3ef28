import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** Replace with your actual backend API URL */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

/**
 * Minimal fetch wrapper to include JWT token, handle responses.
 */
function useApi(token) {
  return {
    get: async (path) => {
      const r = await fetch(API_BASE_URL + path, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (!r.ok) throw new Error(await r.text());
      return await r.json();
    },
    post: async (path, body) => {
      const r = await fetch(API_BASE_URL + path, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!r.ok) throw new Error(await r.text());
      return await r.json();
    },
    put: async (path, body) => {
      const r = await fetch(API_BASE_URL + path, {
        method: "PUT",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!r.ok) throw new Error(await r.text());
      return await r.json();
    },
    delete: async (path) => {
      const r = await fetch(API_BASE_URL + path, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!r.ok) throw new Error(await r.text());
      return await r.json();
    }
  };
}

const AuthContext = createContext();

/**
 * PUBLIC_INTERFACE
 * Hook providing authentication context and JWT-based API helpers.
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * PUBLIC_INTERFACE
 * JWT-based authentication provider for app.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const data = localStorage.getItem("user_info");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("jwt_token") || "");
  const api = useApi(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) localStorage.setItem("jwt_token", token);
    else localStorage.removeItem("jwt_token");
    // Optionally, re-parse user info from JWT here.
  }, [token]);

  // Handle login, registration, logout
  async function login(username, password) {
    const res = await api.post("/auth/login", { username, password });
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem("user_info", JSON.stringify(res.user));
  }
  async function register(username, password) {
    const res = await api.post("/auth/register", { username, password });
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem("user_info", JSON.stringify(res.user));
  }
  function logout() {
    setUser(null);
    setToken("");
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_info");
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
}
