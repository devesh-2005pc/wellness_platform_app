import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import MySessions from './pages/MySessions';
import CreateSession from './pages/CreateSession'; // ✅ new
import SessionEditor from './pages/SessionEditor'; // ✅ for editing only

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function ProtectedLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-sessions"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <MySessions />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* ✅ Create Session Route */}
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <CreateSession />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* ✅ Edit Session Route */}
        <Route
          path="/editor/:id"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <SessionEditor />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
