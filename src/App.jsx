<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
=======
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
>>>>>>> 53fcf48 (Initial commit for frontend)
