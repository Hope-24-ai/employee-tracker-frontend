import React, { useState } from 'react';
import EmployeeDashboard from './components/EmployeeDashboard';
import LoginScreen from './components/LoginScreen';
import './App.css'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);

  const handleLogin = (employeeId) => {
    if (employeeId) {
      setCurrentEmployeeId(employeeId);
      setIsLoggedIn(true);
    } else {
      alert('Please enter your Employee ID.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentEmployeeId(null);
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <EmployeeDashboard
          employeeId={currentEmployeeId}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
