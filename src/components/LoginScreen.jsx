import React, { useState } from 'react';
import { employees } from '../data/mockData'; 

function LoginScreen({ onLogin }) {
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); 
    
    const foundEmployee = employees.find(emp => emp.id === employeeId.toUpperCase());

    if (foundEmployee) {
      onLogin(foundEmployee.id); 
    } else {
      setError('Invalid Employee ID. Please try again (e.g., EMP001, EMP002).');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Employee Login</h2>
      <p>Enter your Employee ID to access the dashboard.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employeeId">Employee ID:</label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value.toUpperCase())} 
            placeholder="e.g., EMP001"
            required
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginScreen;