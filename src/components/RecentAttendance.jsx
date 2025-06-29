import React, { useEffect, useState } from 'react';
import { getAllAttendanceRecords } from '../utils/api'; 

function RecentAttendance({ employeeId }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (!employeeId) {
        setError("No employee ID provided for attendance records.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const all = await getAllAttendanceRecords();

        // Normalize backend data keys
        const mapped = all.map(rec => ({
          id: rec.id,
          employeeId: rec.employee_id,
          date: rec.date,
          status: rec.status,
          checkIn: rec.check_in_time,
          checkOut: rec.check_out_time,
          details: rec.details,
        }));

        const mine = mapped.filter(rec => rec.employeeId === employeeId);

        // Sort by latest first
        mine.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecords(mine);
      } catch (err) {
        console.error('Error fetching attendance records:', err);
        setError(`Failed to load attendance records: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [employeeId]);

  if (loading) return <p>Loading attendance records...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (records.length === 0) return <p>No recent attendance records found.</p>;

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
        {records.map((rec) => (
          <tr key={rec.id}>
            <td>{rec.date}</td>
            <td className={`status-badge ${rec.status}`}>{rec.status}</td>
            <td>{rec.checkIn || '-'}</td>
            <td>{rec.checkOut || '-'}</td>
            <td>{rec.details || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RecentAttendance;
