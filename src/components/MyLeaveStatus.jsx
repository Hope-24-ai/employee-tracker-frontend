import React, { useEffect, useState } from 'react';
import { getAllLeaveRequests } from '../utils/api'; 

function MyLeaveStatus({ employeeId }) {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchLeaveData = async () => {
      setLoading(true); 
      setError(null);   

      try {
        const allLeaves = await getAllLeaveRequests();

        const filteredLeaves = allLeaves.filter(
          (rec) => rec.employee_id === employeeId
        );

        const sorted = filteredLeaves.sort((a, b) => {
          const dateA = new Date(a.created_at || a.start_date);
          const dateB = new Date(b.created_at || b.start_date);
          return dateB - dateA;
        });

        setLeaveRequests(sorted);
      } catch (err) {
        console.error("Failed to fetch leave requests:", err);
        setError(`Failed to load leave requests: ${err.message}`);
      } finally {
        setLoading(false); 
      }
    };

    if (employeeId) {
      fetchLeaveData();
    } else {
      setError("No employee ID provided for leave status.");
      setLoading(false);
    }
  }, [employeeId]); 

  if (loading) return <p>Loading leave requests...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!leaveRequests.length) return <p>You have no submitted leave requests.</p>;

  return (
    <table className="leave-status-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Reason</th>
          <th>Submission Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {leaveRequests.map((request) => (
          <tr key={request.id}>
            <td>{request.leave_type}</td>
            <td>{request.start_date}</td>
            <td>{request.end_date}</td>
            <td>{request.reason}</td>
            <td>
              {request.created_at
                ? new Date(request.created_at).toLocaleDateString()
                : 'N/A'}
            </td>
            <td className={`status-badge ${request.status.toLowerCase()}`}>
              {request.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MyLeaveStatus;
