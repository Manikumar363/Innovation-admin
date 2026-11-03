import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CmsHomePage } from "./pages/CmsHomePage";
import { getAuthToken, getStoredUserData } from "./lib/api";

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const token = getAuthToken();
  const user = getStoredUserData();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Root Redirector based on session
const RootRedirect: React.FC = () => {
  const token = getAuthToken();
  const user = getStoredUserData();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/dashboard" replace />;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Root Redirect */}
        <Route path="/" element={<RootRedirect />} />

        {/* Main Application Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cms"
          element={
            <ProtectedRoute>
              <CmsHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cms/home"
          element={
            <ProtectedRoute>
              <CmsHomePage />
            </ProtectedRoute>
          }
        />

        {/* Backward Compatibility Fallback Routes */}
        <Route
          path="/agent/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/university/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent/cms"
          element={
            <ProtectedRoute>
              <CmsHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent/cms/home"
          element={
            <ProtectedRoute>
              <CmsHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/university/cms"
          element={
            <ProtectedRoute>
              <CmsHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/university/cms/home"
          element={
            <ProtectedRoute>
              <CmsHomePage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
