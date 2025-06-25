import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import MyProfile from './MyProfile';
import TeamRoster from './TeamRoster';
import AttendanceAndLeave from './AttendanceAndLeave';

function EmployeeDashboard({ employeeId, onLogout }) {
  const [activeView, setActiveView] = useState('profile'); 
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/employees/${employeeId}`)
      .then(res => {
        if (!res.ok) throw new Error("Employee not found");
        return res.json();
      })
      .then(data => setCurrentEmployee(data))
      .catch(error => {
        console.error("Error fetching employee:", error);
        onLogout(); // Log out if employee not found
      });
  }, [employeeId, onLogout]);

  if (!currentEmployee) {
    return <div className="card">Loading employee data...</div>; 
  }

  return (
    <>
      <div className="dashboard-header" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ marginBottom: 0 }}>Welcome, {currentEmployee.name}!</h1>
        <button onClick={onLogout} className="danger">Logout</button>
      </div>

      <Navbar activeView={activeView} onSelectView={setActiveView} />

      <div className="dashboard-content" style={{ width: '100%' }}>
        {activeView === 'profile' && <MyProfile employee={currentEmployee} />}
        {activeView === 'team' && <TeamRoster currentEmployeeId={employeeId} />}
        {activeView === 'attendanceLeave' && <AttendanceAndLeave employeeId={employeeId} />}
      </div>
    </>
  );
}

export default EmployeeDashboard;
