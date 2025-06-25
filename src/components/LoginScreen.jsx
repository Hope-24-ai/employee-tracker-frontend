import React, { useState } from 'react';

function LoginScreen({ onLogin }) {
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    fetch(`http://localhost:3000/employees?id=${employeeId}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          onLogin(data[0].id); // Pass the employee's ID
        } else {
          setError('Invalid Employee ID. Please try again (e.g., EMP001, EMP002).');
        }
      })
      .catch(() => {
        setError('Failed to connect to server. Is json-server running?');
      });
  };

  return (
    <div className="card login-card">
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
