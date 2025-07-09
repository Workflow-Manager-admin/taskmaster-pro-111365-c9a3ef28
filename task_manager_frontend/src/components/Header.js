import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Minimal, modern app header bar with navigation and user info.
 */
function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="header-bar">
      <div className="header-content">
        <span className="app-title">Task Manager</span>
        <nav className="header-nav">
          {user ? (
            <>
              <span className="user-label">Hello, {user.username}</span>
              <button className="header-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {location.pathname !== "/login" && (
                <Link to="/login" className="header-btn">Login</Link>
              )}
              {location.pathname !== "/register" && (
                <Link to="/register" className="header-btn header-btn-accent">Register</Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
