import React from 'react'; 

function MyProfile({ employee }) {
  
  
  if (!employee) {
    return <div className="card profile-card">Loading profile data...</div>;
  }

  return (
    <div className="card profile-card">
      <h2>My Profile</h2>
      {}
      {employee.profilePic && (
        <img src={employee.profilePic} alt={`${employee.name}'s profile`} className="profile-pic" />
      )}
      {!employee.profilePic && (
        <div className="profile-pic-placeholder">No Profile Pic</div>
      )}

      <div className="profile-info">
        <h3>{employee.name}</h3>
        {}
        <p><strong>Employee ID:</strong> {employee.employeeId}</p>
        {}
        <p><strong>Role:</strong> {employee.role || 'N/A'}</p>
        {}
        <p><strong>Department:</strong> {employee.department || 'N/A'}</p>
        {}
        <p><strong>Email:</strong> {employee.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {employee.phone || 'N/A'}</p>
        <p><strong>Hire Date:</strong> {employee.hireDate || 'N/A'}</p>
        <p>
          <strong>Current Status:</strong>{' '}
          <span className={`status-badge ${employee.currentStatus ? employee.currentStatus.replace(/\s/g, '') : 'Unknown'}`}>
            {employee.currentStatus || 'N/A'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default MyProfile;