import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Page: Register new users.
 */
function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await register(form.username, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  }

  return (
    <div className="auth-center">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
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
          Register
        </button>
        <div className="auth-link">
          Have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
