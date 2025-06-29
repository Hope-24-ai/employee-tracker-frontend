import React, { useState } from 'react';
import { getEmployeeByUniqueStringId } from '../utils/api';

function LoginScreen({ onLogin }) {
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanedId = String(employeeId).trim().toUpperCase();

    if (!cleanedId) {
      setError('Employee ID cannot be empty.');
      setLoading(false);
      return;
    }

    try {
      const foundEmployee = await getEmployeeByUniqueStringId(cleanedId);

      if (foundEmployee) {
        onLogin(cleanedId);
      } else {
        setError('Invalid Employee ID. Please try again (e.g., EMP001, EMP002).');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(`Failed to connect to server or fetch employee data: ${err.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
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
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="e.g., EMP001"
            required
            disabled={loading}
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginScreen;
