import React, { useEffect, useState } from 'react';

function MyLeaveStatus({ employeeId }) {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/leaveRequests?employeeId=${employeeId}`)
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setLeaveRequests(sorted);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch leave requests:", error);
        setLoading(false);
      });
  }, [employeeId]);

  if (loading) return <p>Loading leave requests...</p>;

  if (!leaveRequests || leaveRequests.length === 0) {
    return <p>You have no submitted leave requests.</p>;
  }

  return (
    <table>
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
            <td>{request.type}</td>
            <td>{request.startDate}</td>
            <td>{request.endDate}</td>
            <td>{request.reason}</td>
            <td>{request.submissionDate || 'N/A'}</td>
            <td className={`status-badge ${request.status}`}>{request.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MyLeaveStatus;
