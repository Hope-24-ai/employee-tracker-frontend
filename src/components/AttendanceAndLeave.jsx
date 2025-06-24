import React, { useState, useEffect } from 'react';
import SignInOutButton from './SignInOutButton';
import LeaveRequestForm from './LeaveRequestForm';
import RecentAttendance from './RecentAttendance';
import MyLeaveStatus from './MyLeaveStatus';
import {
  employees,
  attendanceRecords,
  leaveRequests,
  addAttendanceRecord,
  updateAttendanceRecord,
  addLeaveRequest
} from '../data/mockData'; 

function AttendanceAndLeave({ employeeId }) {
  const [myAttendance, setMyAttendance] = useState([]);
  const [myLeaveRequests, setMyLeaveRequests] = useState([]);
  const [clockedIn, setClockedIn] = useState(false); 
  const [currentAttendanceRecordId, setCurrentAttendanceRecordId] = useState(null);

  
  useEffect(() => {
    
    setMyAttendance(attendanceRecords.filter(record => record.employeeId === employeeId));
    
    setMyLeaveRequests(leaveRequests.filter(request => request.employeeId === employeeId));

    
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = attendanceRecords.find(
      record => record.employeeId === employeeId && record.date === today && record.checkOut === null
    );
    if (todayRecord) {
      setClockedIn(true);
      setCurrentAttendanceRecordId(todayRecord.id);
    } else {
      setClockedIn(false);
      setCurrentAttendanceRecordId(null);
    }
  }, [employeeId, attendanceRecords.length, leaveRequests.length]); 

  const handleClockIn = () => {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    const timeString = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    const newRecord = addAttendanceRecord({
      employeeId: employeeId,
      date: dateString,
      status: 'Present',
      checkIn: timeString,
      checkOut: null,
      details: 'Clocked In'
    });
    setMyAttendance([...myAttendance, newRecord]); 
    setClockedIn(true);
    setCurrentAttendanceRecordId(newRecord.id);
    alert(`Clocked in at ${timeString}`);
  };

  const handleClockOut = () => {
    const today = new Date();
    const timeString = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    if (currentAttendanceRecordId) {
      const updatedRecord = updateAttendanceRecord(currentAttendanceRecordId, { checkOut: timeString });
      if (updatedRecord) {
        setMyAttendance(myAttendance.map(rec => rec.id === updatedRecord.id ? updatedRecord : rec));
      }
    }
    setClockedIn(false);
    setCurrentAttendanceRecordId(null);
    alert(`Clocked out at ${timeString}`);
  };

  const handleLeaveSubmit = (leaveData) => {
    const newRequest = addLeaveRequest({
      ...leaveData,
      employeeId: employeeId,
    });
    setMyLeaveRequests([...myLeaveRequests, newRequest]);
    alert('Your leave request has been submitted successfully!');
  };

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