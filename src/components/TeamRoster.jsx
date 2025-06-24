import React from 'react';
import { employees, getDepartmentName } from '../data/mockData';

function TeamRoster({ currentEmployeeId }) {
  
  const otherEmployees = employees.filter(emp => emp.id !== currentEmployeeId);

  return (
    <div className="card">
      <h2>Team Roster</h2>
      <p>Here you can see all your colleagues across different departments.</p>
      <div className="employee-grid">
        {otherEmployees.map(employee => (
          <div key={employee.id} className="employee-card">
            <img src={employee.profilePic} alt={`${employee.name}'s profile`} />
            <h4>{employee.name}</h4>
            <p><strong>ID:</strong> {employee.id}</p>
            <p><strong>Role:</strong> {employee.role}</p>
            <p><strong>Department:</strong> {getDepartmentName(employee.departmentId)}</p>
            <p><span className={`status-badge ${employee.currentStatus.replace(/\s/g, '')}`}>{employee.currentStatus}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamRoster;