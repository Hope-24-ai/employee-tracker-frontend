import React, { useEffect, useState } from 'react';

function RecentAttendance({ employeeId }) {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/attendanceRecords?employeeId=${employeeId}`)
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAttendanceRecords(sorted);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching attendance records:', error);
        setLoading(false);
      });
  }, [employeeId]);

  if (loading) return <p>Loading attendance records...</p>;

  if (!attendanceRecords || attendanceRecords.length === 0) {
    return <p>No recent attendance records found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Status</th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {attendanceRecords.map((record) => (
          <tr key={record.id}>
            <td>{record.date}</td>
            <td className={`status-badge ${record.status}`}>{record.status}</td>
            <td>{record.checkIn || '-'}</td>
            <td>{record.checkOut || '-'}</td>
            <td>{record.details || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RecentAttendance;
