import React, { useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import LoginScreen from './components/LoginScreen';
import EmployeeDashboard from './components/EmployeeDashboard';

function AppRoutes({ employeeId, onLogin, onLogout }) {
  const navigate = useNavigate();
  const initialLoad = useRef(true); // Prevent immediate navigation on first load

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return; // Avoid navigating on initial mount
    }

    if (employeeId) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, [employeeId, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LoginScreen onLogin={onLogin} />} />
      <Route
        path="/dashboard"
        element={
          employeeId ? (
            <EmployeeDashboard employeeId={employeeId} onLogout={onLogout} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<Navigate to={employeeId ? '/dashboard' : '/'} />} />
    </Routes>
  );
}

export default AppRoutes;
