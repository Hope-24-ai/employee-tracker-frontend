import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import EmployeeDashboard from './components/EmployeeDashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);

  useEffect(() => {
    const savedId = localStorage.getItem('employeeId');
    if (savedId) {
      setCurrentEmployeeId(savedId);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (employeeId) => {
    localStorage.setItem('employeeId', employeeId.toUpperCase());
    setCurrentEmployeeId(employeeId.toUpperCase());
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('employeeId');
    setCurrentEmployeeId(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <EmployeeDashboard employeeId={currentEmployeeId} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
