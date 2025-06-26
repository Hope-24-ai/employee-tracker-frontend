import React, { useEffect, useState } from 'react';
import { getAllEmployees } from '../utils/api'; 
function TeamRoster({ currentEmployeeId }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);   

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true); 
      setError(null);   
      try {
        
        const allEmployees = await getAllEmployees();

        
        const filtered = allEmployees.filter(emp => emp.employeeId !== currentEmployeeId); 

        
        const sortedEmployees = filtered.sort((a, b) => a.name.localeCompare(b.name));

        setEmployees(sortedEmployees);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError(`Failed to load team roster: ${err.message}. Please try again.`);
      } finally {
        setLoading(false); 
      }
    };

    if (currentEmployeeId) { 
      fetchTeamData();
    } else {
        setLoading(false);
        setError("Current employee ID not provided, cannot load team roster.");
    }

    
  }, [currentEmployeeId]); 
  
  if (loading) {
    return <div className="card">Loading team roster...</div>;
  }

  if (error) {
    return <div className="card error-message">Error: {error}</div>;
  }

  if (!employees || employees.length === 0) {
    return (
        <div className="card">
            <p>No other team members found.</p>
        </div>
    );
  }

  return (
    <div className="card">
      <h2>Team Roster</h2>
      <p>Here you can see all your colleagues across different departments.</p>
      <div className="employee-grid">
        {employees.map(employee => (
          
          <div key={employee.id} className="employee-card">
            {}
            {employee.profilePic && (
              <img src={employee.profilePic} alt={`${employee.name}'s profile`} className="employee-profile-pic" />
            )}
            {!employee.profilePic && (
              <div className="employee-profile-pic-placeholder">No Pic</div>
            )}

            <h4>{employee.name}</h4>
            {}
            <p><strong>ID:</strong> {employee.employeeId}</p>
            {}
            <p><strong>Role:</strong> {employee.role || 'N/A'}</p>
            {}
            <p><strong>Department:</strong> {employee.department || 'N/A'}</p>
            <p>
              <span className={`status-badge ${employee.currentStatus ? employee.currentStatus.replace(/\s/g, '') : 'Unknown'}`}>
                {employee.currentStatus || 'N/A'}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamRoster;