import React from 'react';

function RecentAttendance({ attendanceData }) {
  
  const sortedAttendance = [...attendanceData].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!sortedAttendance || sortedAttendance.length === 0) {
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
        {sortedAttendance.map((record) => (
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