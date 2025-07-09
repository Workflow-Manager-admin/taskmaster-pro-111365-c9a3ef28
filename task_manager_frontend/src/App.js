import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskBoard from "./pages/TaskBoard";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import "./App.css";

/**
 * Route wrapper that requires authentication for access.
 * Redirects unauthenticated users to the login page.
 */
// PUBLIC_INTERFACE
function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

// PUBLIC_INTERFACE
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sidebar responsivity on small screens
  useEffect(() => {
    function handleResize() {
      setSidebarOpen(window.innerWidth > 768);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="main-bg">
          <Header />
          <div className="container-layout">
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <main className="main-content">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <PrivateRoute>
                      <TaskBoard />
                    </PrivateRoute>
                  } 
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
