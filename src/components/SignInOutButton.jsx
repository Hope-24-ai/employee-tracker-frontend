import React, { useState, useEffect } from 'react';

function SignInOutButton({ employeeId }) {
  const [clockedIn, setClockedIn] = useState(false);
  const [currentRecordId, setCurrentRecordId] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    fetch(`http://localhost:3000/attendanceRecords?employeeId=${employeeId}&date=${today}`)
      .then(res => res.json())
      .then(data => {
        const record = data.find(rec => rec.checkOut === null);
        if (record) {
          setClockedIn(true);
          setCurrentRecordId(record.id);
        }
      });
  }, [employeeId]);

  const handleClockIn = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    const newRecord = {
      employeeId,
      date,
      status: 'Present',
      checkIn: time,
      checkOut: null,
      details: 'Clocked In'
    };

    fetch('http://localhost:3000/attendanceRecords', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord)
    })
      .then(res => res.json())
      .then(record => {
        setClockedIn(true);
        setCurrentRecordId(record.id);
        alert(`Clocked in at ${time}`);
      });
  };

  const handleClockOut = () => {
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    fetch(`http://localhost:3000/attendanceRecords/${currentRecordId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkOut: time })
    })
      .then(res => res.json())
      .then(() => {
        setClockedIn(false);
        setCurrentRecordId(null);
        alert(`Clocked out at ${time}`);
      });
  };

  return (
    <div>
      {clockedIn ? (
        <button className="danger" onClick={handleClockOut}>
          Clock Out
        </button>
      ) : (
        <button onClick={handleClockIn}>
          Clock In
        </button>
      )}
    </div>
  );
}

export default SignInOutButton;
