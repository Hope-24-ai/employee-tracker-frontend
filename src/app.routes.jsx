import React, { useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import LoginScreen from './components/LoginScreen';
import EmployeeDashboard from './components/EmployeeDashboard';

function AppRoutes({ employeeId, onLogin, onLogout }) {
  const navigate = useNavigate();
  const initialLoad = useRef(true);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return; // Prevent redirect on first render
    }

    if (employeeId) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, [employeeId, navigate]);

  return (
    <Routes>
      {/* Public route: Login */}
      <Route path="/" element={<LoginScreen onLogin={onLogin} />} />

      {/* Protected route: Dashboard */}
      <Route
        path="/dashboard"
        element={
          employeeId ? (
            <EmployeeDashboard employeeId={employeeId} onLogout={onLogout} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Catch-all: Redirect based on login status */}
      <Route path="*" element={<Navigate to={employeeId ? '/dashboard' : '/'} replace />} />
    </Routes>
  );
}

export default AppRoutes;
