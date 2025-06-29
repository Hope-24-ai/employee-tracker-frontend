import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import MyProfile from './MyProfile';
import TeamRoster from './TeamRoster';
import AttendanceAndLeave from './AttendanceAndLeave';
import { getEmployeeByUniqueStringId } from '../utils/api';

function EmployeeDashboard({ employeeId, onLogout }) {
  const [activeView, setActiveView] = useState('profile');
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const data = await getEmployeeByUniqueStringId(employeeId);
        if (!data) {
          setError('Employee not found.');
        } else {
          setCurrentEmployee(data);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load employee data.');
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchEmployee();
    } else {
      setError('Missing employee ID.');
    }
  }, [employeeId]);

  if (loading) {
    return <div className="card">Loading...</div>;
  }

  if (error) {
    return (
      <div className="card error-message">
        <p>{error}</p>
        <button onClick={onLogout}>Log out</button>
      </div>
    );
  }

  return (
    <>
      <div
        className="dashboard-header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h1>Welcome, {currentEmployee.name}!</h1>
        <button onClick={onLogout} className="danger">Logout</button>
      </div>

      {/* ✅ Role passed to Navbar */}
      <Navbar
        activeView={activeView}
        onSelectView={setActiveView}
        role={currentEmployee.role}
      />

      <div className="dashboard-content">
        {activeView === 'profile' && <MyProfile employee={currentEmployee} />}
        {activeView === 'team' && currentEmployee.role === 'HR Manager' && (
          <TeamRoster currentEmployeeId={currentEmployee.employeeId} />
        )}
        {activeView === 'attendanceLeave' && (
          <AttendanceAndLeave
            employeeId={currentEmployee.employeeId}
            role={currentEmployee.role}
          />
        )}
      </div>
    </>
  );
}

export default EmployeeDashboard;
