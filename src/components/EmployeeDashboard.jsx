import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import MyProfile from './MyProfile';
import TeamRoster from './TeamRoster';
import AttendanceAndLeave from './AttendanceAndLeave';
import { employees } from '../data/mockData'; 

function EmployeeDashboard({ employeeId, onLogout }) {
  const [activeView, setActiveView] = useState('profile'); 
  const [currentEmployee, setCurrentEmployee] = useState(null);

  
  useEffect(() => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      setCurrentEmployee(employee);
    } else {
    
      console.error("Employee not found after login, logging out.");
      onLogout();
    }
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