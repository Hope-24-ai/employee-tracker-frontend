import React, { useEffect, useState } from 'react';
import { getAllAttendanceRecords } from '../utils/api'; 

function RecentAttendance({ employeeId }) {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchAttendanceData = async () => {
      setLoading(true); 
      setError(null);   
      try {
        
        const allAttendance = await getAllAttendanceRecords();

        
        const filteredAttendance = allAttendance.filter(rec => rec.employeeId === employeeId);

        
        const sorted = filteredAttendance.sort((a, b) => {
          
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime(); 
        });

        setAttendanceRecords(sorted);
      } catch (err) {
        console.error('Error fetching attendance records:', err);
        setError(`Failed to load attendance records: ${err.message}. Please try again.`);
      } finally {
        setLoading(false); 
      }
    };

    if (employeeId) { 
      fetchAttendanceData();
    } else {
        setLoading(false); 
        setError("No employee ID provided for attendance records.");
    }
  }, [employeeId]); 

  
  if (loading) {
    return <p>Loading attendance records...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

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
            <td>{record.checkIn || '-'}</td> {}
            <td>{record.checkOut || '-'}</td> {}
            <td>{record.details || '-'}</td> {}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RecentAttendance;