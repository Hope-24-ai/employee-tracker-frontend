import React, { useEffect, useState } from 'react';

function TeamRoster({ currentEmployeeId }) {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState({});

  useEffect(() => {
    // Fetch employees
    fetch('http://localhost:3000/employees')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(emp => emp.id !== currentEmployeeId);
        setEmployees(filtered);
      })
      .catch(err => {
        console.error("Failed to fetch employees:", err);
      });

    // Fetch departments
    fetch('http://localhost:3000/departments')
      .then(res => res.json())
      .then(data => {
        const departmentMap = {};
        data.forEach(dep => {
          departmentMap[dep.id] = dep.name;
        });
        setDepartments(departmentMap);
      })
      .catch(err => {
        console.error("Failed to fetch departments:", err);
      });
  }, [currentEmployeeId]);

  return (
    <div className="card">
      <h2>Team Roster</h2>
      <p>Here you can see all your colleagues across different departments.</p>
      <div className="employee-grid">
        {employees.map(employee => (
          <div key={employee.id} className="employee-card">
            <img src={employee.profilePic} alt={`${employee.name}'s profile`} />
            <h4>{employee.name}</h4>
            <p><strong>ID:</strong> {employee.id}</p>
            <p><strong>Role:</strong> {employee.role}</p>
            <p><strong>Department:</strong> {departments[employee.departmentId] || 'Loading...'}</p>
            <p>
              <span className={`status-badge ${employee.currentStatus.replace(/\s/g, '')}`}>
                {employee.currentStatus}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamRoster;
