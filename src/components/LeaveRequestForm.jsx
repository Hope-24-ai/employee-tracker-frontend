import React, { useState } from 'react';
import { createLeaveRequest } from '../utils/api';

function LeaveRequestForm({ employeeId, onSuccess }) {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newRequest = {
      employee_id: employeeId,         // ✅ match backend
      leave_type: leaveType,           // ✅ match backend
      start_date: startDate,           // ✅ match backend
      end_date: endDate,               // ✅ match backend
      reason,                          // ✅
      status: 'Pending'                // ✅ default
    };

    setSubmitting(true);

    try {
      const data = await createLeaveRequest(newRequest);
      if (onSuccess) onSuccess(data);

      setLeaveType('');
      setStartDate('');
      setEndDate('');
      setReason('');
      setErrors({});
      alert('Your leave request has been submitted successfully!');
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert(`Failed to submit leave request: ${error.message || 'Please try again.'}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Request Leave</h3>

      <div className="form-group">
        <label htmlFor="leaveType">Leave Type</label>
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
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        {errors.startDate && <p className="error-message">{errors.startDate}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        {errors.endDate && <p className="error-message">{errors.endDate}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="reason">Reason</label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Briefly describe your reason for leave..."
        />
        {errors.reason && <p className="error-message">{errors.reason}</p>}
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
}

export default LeaveRequestForm;
