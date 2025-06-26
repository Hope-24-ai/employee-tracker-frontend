import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import MyProfile from './MyProfile';
import TeamRoster from './TeamRoster';
import AttendanceAndLeave from './AttendanceAndLeave';
import { getEmployeeByUniqueStringId } from '../utils/api'; 

function EmployeeDashboard({ employeeId, onLogout }) {
  const [activeView, setActiveView] = useState('profile');
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [loadingError, setLoadingError] = useState(null); 
  useEffect(() => {
    
    setCurrentEmployee(null);
    setLoadingError(null);

    const fetchEmployeeData = async () => {
      try {
        
        const data = await getEmployeeByUniqueStringId(employeeId);

        if (data) {
          
          setCurrentEmployee(data);
        } else {
          
          setLoadingError("Employee data not found or invalid ID. Please log in again.");
          onLogout(); 
        }
      } catch (error) {
        console.error("Error fetching employee in dashboard:", error);
        
        setLoadingError(`Failed to load employee data: ${error.message}. Please try again.`);
        onLogout(); 
      }
    };

    
    if (employeeId) {
      fetchEmployeeData();
    } else {
      
      setLoadingError("No employee ID provided. Redirecting to login.");
      onLogout();
    }
  }, [employeeId, onLogout]); 
  if (!currentEmployee && !loadingError) {
    return <div className="card">Loading employee data...</div>;
  }

  
  if (loadingError) {
    return (
      <div className="card error-message">
        <p>{loadingError}</p>
        <button onClick={onLogout}>Go Back to Login</button>
      </div>
    );
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
        {}
        {activeView === 'team' && <TeamRoster currentEmployeeId={employeeId} />}
        {activeView === 'attendanceLeave' && <AttendanceAndLeave employeeId={employeeId} />}
      </div>
    </>
  );
}

export default EmployeeDashboard;