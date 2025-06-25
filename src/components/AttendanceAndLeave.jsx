import React, { useState, useEffect } from 'react';
import SignInOutButton from './SignInOutButton';
import LeaveRequestForm from './LeaveRequestForm';
import RecentAttendance from './RecentAttendance';
import MyLeaveStatus from './MyLeaveStatus';

function AttendanceAndLeave({ employeeId }) {
  const [myAttendance, setMyAttendance] = useState([]);
  const [myLeaveRequests, setMyLeaveRequests] = useState([]);
  const [clockedIn, setClockedIn] = useState(false);
  const [currentAttendanceRecordId, setCurrentAttendanceRecordId] = useState(null);

  const API = 'http://localhost:3001';

  useEffect(() => {
    const fetchData = async () => {
      const resAtt = await fetch(`${API}/attendanceRecords`);
      const resLeave = await fetch(`${API}/leaveRequests`);

      const allAttendance = await resAtt.json();
      const allLeaves = await resLeave.json();

      const filteredAttendance = allAttendance.filter(rec => rec.employeeId === employeeId);
      const filteredLeaves = allLeaves.filter(rec => rec.employeeId === employeeId);

      setMyAttendance(filteredAttendance);
      setMyLeaveRequests(filteredLeaves);

      const today = new Date().toISOString().split('T')[0];
      const todayRecord = filteredAttendance.find(
        rec => rec.date === today && rec.checkOut === null
      );

      if (todayRecord) {
        setClockedIn(true);
        setCurrentAttendanceRecordId(todayRecord.id);
      } else {
        setClockedIn(false);
        setCurrentAttendanceRecordId(null);
      }
    };

    fetchData();
  }, [employeeId]);

  const handleClockIn = async () => {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    const timeString = today.toLocaleTimeString('en-US', {
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

    const res = await fetch(`${API}/attendanceRecords`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord),
    });

    const savedRecord = await res.json();
    setMyAttendance([...myAttendance, savedRecord]);
    setClockedIn(true);
    setCurrentAttendanceRecordId(savedRecord.id);
    alert(`Clocked in at ${timeString}`);
  };

  const handleClockOut = async () => {
    if (!currentAttendanceRecordId) return;

    const today = new Date();
    const timeString = today.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const res = await fetch(`${API}/attendanceRecords/${currentAttendanceRecordId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkOut: timeString }),
    });

    const updatedRecord = await res.json();
    const updatedAttendance = myAttendance.map(rec =>
      rec.id === updatedRecord.id ? updatedRecord : rec
    );

    setMyAttendance(updatedAttendance);
    setClockedIn(false);
    setCurrentAttendanceRecordId(null);
    alert(`Clocked out at ${timeString}`);
  };

  const handleLeaveSubmit = async (leaveData) => {
    const newRequest = {
      ...leaveData,
      employeeId,
      status: 'Pending',
    };

    const res = await fetch(`${API}/leaveRequests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRequest),
    });

    const savedRequest = await res.json();
    setMyLeaveRequests([...myLeaveRequests, savedRequest]);
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
