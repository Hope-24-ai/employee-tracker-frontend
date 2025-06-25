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
    setCurrentEmployeeId(employeeId);
    setIsLoggedIn(true);
    localStorage.setItem('employeeId', employeeId); // persist login
  };

  const handleLogout = () => {
    setCurrentEmployeeId(null);
    setIsLoggedIn(false);
    localStorage.removeItem('employeeId');
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
