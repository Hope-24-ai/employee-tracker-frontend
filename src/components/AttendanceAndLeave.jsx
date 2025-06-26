import React, { useState, useEffect } from 'react';
import SignInOutButton from './SignInOutButton';
import LeaveRequestForm from './LeaveRequestForm';
import RecentAttendance from './RecentAttendance';
import MyLeaveStatus from './MyLeaveStatus';


import {
  getAllAttendanceRecords,
  createAttendanceRecord,
  updateAttendanceRecord,
  getAllLeaveRequests,
  createLeaveRequest,
  
} from '../utils/api'; 

function AttendanceAndLeave({ employeeId }) {
  const [myAttendance, setMyAttendance] = useState([]);
  const [myLeaveRequests, setMyLeaveRequests] = useState([]);
  const [clockedIn, setClockedIn] = useState(false);
  const [currentAttendanceRecordId, setCurrentAttendanceRecordId] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);   

  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      setError(null);   
      try {
        
        const allAttendance = await getAllAttendanceRecords();
        const filteredAttendance = allAttendance.filter(rec => rec.employeeId === employeeId);
        setMyAttendance(filteredAttendance);

        
        const allLeaves = await getAllLeaveRequests();
        const filteredLeaves = allLeaves.filter(rec => rec.employeeId === employeeId);
        setMyLeaveRequests(filteredLeaves);

        
        const today = new Date().toISOString().split('T')[0];
        
        const todayRecord = filteredAttendance.find(
          rec => rec.date === today && rec.checkIn && !rec.checkOut
        );

        if (todayRecord) {
          setClockedIn(true);
          setCurrentAttendanceRecordId(todayRecord.id);
        } else {
          setClockedIn(false);
          setCurrentAttendanceRecordId(null);
        }
      } catch (err) {
        console.error("Error fetching attendance/leave data:", err);
        setError(`Failed to load data: ${err.message}. Please try again.`);
      } finally {
        setLoading(false); 
      }
    };

    if (employeeId) { 
      fetchData();
    }
  }, [employeeId]); 

  const handleClockIn = async () => {
   
    if (clockedIn) {
      alert("You are already clocked in.");
      return;
    }

    const now = new Date();
    const dateString = now.toISOString().split('T')[0]; 
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }); 

    const newRecord = {
      employeeId,
      date: dateString,
      status: 'Present', 
      checkIn: timeString,
      checkOut: null, 
      details: 'Clocked In',
    };

    try {
      
      const savedRecord = await createAttendanceRecord(newRecord);
      setMyAttendance([...myAttendance, savedRecord]); 
      setClockedIn(true);
      setCurrentAttendanceRecordId(savedRecord.id);
      alert(`Clocked in at ${timeString}`);
    } catch (err) {
      console.error("Error clocking in:", err);
      alert(`Failed to clock in: ${err.message}`);
    }
  };

  const handleClockOut = async () => {
    if (!currentAttendanceRecordId) {
      alert("You are not currently clocked in.");
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }); 

    const updatedData = {
      checkOut: timeString,
      
    };

    try {
      
      const updatedRecord = await updateAttendanceRecord(currentAttendanceRecordId, updatedData);
      
      const updatedAttendance = myAttendance.map(rec =>
        rec.id === updatedRecord.id ? updatedRecord : rec
      );
      setMyAttendance(updatedAttendance);
      setClockedIn(false);
      setCurrentAttendanceRecordId(null); 
      alert(`Clocked out at ${timeString}`);
    } catch (err) {
      console.error("Error clocking out:", err);
      alert(`Failed to clock out: ${err.message}`);
    }
  };

  const handleLeaveSubmit = async (leaveData) => {
    const newRequest = {
      ...leaveData,
      employeeId, 
      status: 'Pending', 
    };

    try {
      
      const savedRequest = await createLeaveRequest(newRequest);
      setMyLeaveRequests([...myLeaveRequests, savedRequest]); 
      alert('Your leave request has been submitted successfully!');
    } catch (err) {
      console.error("Error submitting leave request:", err);
      alert(`Failed to submit leave request: ${err.message}`);
    }
  };

  
  if (loading) {
    return <div className="card">Loading attendance and leave data...</div>;
  }

  if (error) {
    return <div className="card error-message">Error: {error}</div>;
  }

  return (
    <div className="card">
      <h2>Attendance & Leave Management</h2>

      <div className="card" style={{ marginBottom: '25px' }}>
        <h3>Your Daily Status</h3>
        <p>Manage your daily attendance here.</p>
        <SignInOutButton
          clockedIn={clockedIn}
          onClockIn={handleClockIn}
          onClockOut={handleClockOut}
        />
      </div>

      <div className="card" style={{ marginBottom: '25px' }}>
        <h3>Request New Leave / Day Off</h3>
        <LeaveRequestForm onSubmit={handleLeaveSubmit} employeeId={employeeId} />
      </div>

      <div className="card">
        <h3>Your Recent Attendance</h3>
        {/* Ensure RecentAttendance can handle the full attendance record with checkIn/checkOut */}
        <RecentAttendance attendanceData={myAttendance} />
      </div>

      <div className="card">
        <h3>Your Submitted Leave Requests</h3>
        <MyLeaveStatus leaveRequests={myLeaveRequests} />
      </div>
    </div>
  );
}

export default AttendanceAndLeave;