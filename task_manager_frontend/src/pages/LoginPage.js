import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Page: Login for existing users (integrates JWT authentication).
 */
function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(form.username, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <div className="auth-center">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          Username
          <input
            name="username"
            required
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            autoFocus
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            required
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          />
        </label>
        {error && <div className="auth-error">{error}</div>}
        <button className="auth-btn" type="submit">
          Login
        </button>
        <div className="auth-link">
          No account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
