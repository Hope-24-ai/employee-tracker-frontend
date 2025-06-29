const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Generic utility function to handle API requests.
 */
async function fetchData(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }
      throw new Error(
        errorData?.message || errorData?.error || `API error! Status: ${response.status} - ${response.statusText}`
      );
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error('Fetch operation error:', error);
    throw error;
  }
}

// === EMPLOYEES ===
export const getAllEmployees = async () => {
  try {
    const result = await fetchData('/employees');
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error('Error fetching employee list:', error);
    return [];
  }
};

export const getEmployeeByUniqueStringId = async (employeeId) => {
  const employees = await getAllEmployees();
  const normalizedId = employeeId.toUpperCase();
  return employees.find(emp => emp.employeeId.toUpperCase() === normalizedId) || null;
};

export const createEmployee = async (employeeData) =>
  fetchData('/employees', {
    method: 'POST',
    body: JSON.stringify(employeeData),
  });

export const updateEmployee = async (employeeId, employeeData) =>
  fetchData(`/employees/${employeeId}`, {
    method: 'PUT',
    body: JSON.stringify(employeeData),
  });

export const deleteEmployee = async (employeeId) =>
  fetchData(`/employees/${employeeId}`, {
    method: 'DELETE',
  });

// === ATTENDANCE ===
export const getAllAttendanceRecords = async () => fetchData('/attendance');

export const getAttendanceRecordById = async (id) => fetchData(`/attendance/${id}`);

export const createAttendanceRecord = async (recordData) => {
  const backendFormatted = {
    employee_id: recordData.employeeId,
    date: recordData.date,
    status: recordData.status,
    check_in_time: recordData.checkIn,
    check_out_time: recordData.checkOut,
    details: recordData.details || '',
  };

  return fetchData('/attendance', {
    method: 'POST',
    body: JSON.stringify(backendFormatted),
  });
};

export const updateAttendanceRecord = async (id, recordData) => {
  const backendFormatted = {
    check_out_time: recordData.checkOut,
    details: recordData.details || '',
  };

  return fetchData(`/attendance/${id}`, {
    method: 'PUT',
    body: JSON.stringify(backendFormatted),
  });
};

export const deleteAttendanceRecord = async (id) =>
  fetchData(`/attendance/${id}`, {
    method: 'DELETE',
  });

// === LEAVES ===
export const getAllLeaveRequests = async () => fetchData('/leaves');

export const getLeaveRequestById = async (id) => fetchData(`/leaves/${id}`);

export const createLeaveRequest = async (requestData) => {
  const backendFormatted = {
    employee_id: requestData.employeeId,
    leave_type: requestData.type,
    start_date: requestData.startDate,
    end_date: requestData.endDate,
    status: requestData.status,
    reason: requestData.reason,
  };

  return fetchData('/leaves', {
    method: 'POST',
    body: JSON.stringify(backendFormatted),
  });
};

export const updateLeaveRequest = async (id, requestData) => {
  const backendFormatted = {
    employee_id: requestData.employeeId,
    leave_type: requestData.type,
    start_date: requestData.startDate,
    end_date: requestData.endDate,
    status: requestData.status,
    reason: requestData.reason,
  };

  return fetchData(`/leaves/${id}`, {
    method: 'PUT',
    body: JSON.stringify(backendFormatted),
  });
};

export const deleteLeaveRequest = async (id) =>
  fetchData(`/leaves/${id}`, {
    method: 'DELETE',
  });
