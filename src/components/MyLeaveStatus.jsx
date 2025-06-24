import React from 'react';

function MyLeaveStatus({ leaveRequests }) {
  
  const sortedLeaveRequests = [...leaveRequests].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  if (!sortedLeaveRequests || sortedLeaveRequests.length === 0) {
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
        {sortedLeaveRequests.map((request) => (
          <tr key={request.id}>
            <td>{request.type}</td>
            <td>{request.startDate}</td>
            <td>{request.endDate}</td>
            <td>{request.reason}</td>
            <td>{request.submissionDate}</td>
            <td className={`status-badge ${request.status}`}>{request.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MyLeaveStatus;