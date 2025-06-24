import React, { useState } from 'react';

function LeaveRequestForm({ onSubmit }) {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!leaveType) newErrors.leaveType = 'Leave type is required.';
    if (!startDate) newErrors.startDate = 'Start Date is required.';
    if (!endDate) newErrors.endDate = 'End Date is required.';

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      newErrors.endDate = 'End Date cannot be before Start Date.';
    }

    if (!reason.trim()) newErrors.reason = 'Reason is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        leaveType,
        startDate,
        endDate,
        reason,
      });
      
      setLeaveType('');
      setStartDate('');
      setEndDate('');
      setReason('');
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="leaveType">Leave Type:</label>
        <select
          id="leaveType"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        >
          <option value="">Select Leave Type</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Annual Leave">Annual Leave (Day Off)</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Bereavement Leave">Bereavement Leave</option>
          <option value="Maternity/Paternity Leave">Maternity/Paternity Leave</option>
        </select>
        {errors.leaveType && <p className="error-message">{errors.leaveType}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        {errors.startDate && <p className="error-message">{errors.startDate}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        {errors.endDate && <p className="error-message">{errors.endDate}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="reason">Reason:</label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Briefly describe your reason for leave..."
        ></textarea>
        {errors.reason && <p className="error-message">{errors.reason}</p>}
      </div>

      <button type="submit">Submit Request</button>
    </form>
  );
}

export default LeaveRequestForm;