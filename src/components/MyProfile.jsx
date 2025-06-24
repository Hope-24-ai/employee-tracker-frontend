import React from 'react';
import { getDepartmentName } from '../data/mockData';

function MyProfile({ employee }) {
  const departmentName = getDepartmentName(employee.departmentId);

  return (
    <div className="card profile-card">
      <h2>My Profile</h2>
      <img src={employee.profilePic} alt={`${employee.name}'s profile`} />
      <div className="profile-info">
        <h3>{employee.name}</h3>
        <p><strong>Employee ID:</strong> {employee.id}</p>
        <p><strong>Role:</strong> {employee.role}</p>
        <p><strong>Department:</strong> {departmentName}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Hire Date:</strong> {employee.hireDate}</p>
        <p><strong>Current Status:</strong> <span className={`status-badge ${employee.currentStatus.replace(/\s/g, '')}`}>{employee.currentStatus}</span></p>
      </div>
    </div>
  );
}

export default MyProfile;