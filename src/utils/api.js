
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * Generic utility function to handle API requests.
 * @param {string} endpoint - The API endpoint relative to API_BASE_URL (e.g., '/employees').
 * @param {object} [options={}] - Fetch options like method, headers, body.
 * @returns {Promise<any>} - The JSON response data.
 * @throws {Error} - Throws an error if the network request fails or the response is not OK.
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
            } catch (jsonError) {
                
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }
            
            throw new Error(errorData.message || `API error! Status: ${response.status} - ${response.statusText}`);
        }

        
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    } catch (error) {
        console.error('Fetch operation error:', error);
        throw error; 
    }
}


/**
 * Fetches all employees.
 * @returns {Promise<Array>} - An array of employee objects.
 */
export const getAllEmployees = async () => fetchData('/employees');

/**
 * Fetches a single employee by their unique string employeeId (e.g., "EMP001").
 * This function fetches all employees and filters them client-side.
 * Your backend's GET /employees/<employee_id_string> endpoint is also available if you prefer a direct lookup.
 * @param {string} employeeId - The unique string identifier of the employee.
 * @returns {Promise<object | null>} - The employee object or null if not found.
 */
export const getEmployeeByUniqueStringId = async (employeeId) => {
    // This assumes `getAllEmployees` is efficient enough.
    // Alternatively, if your backend supported `/employees?employeeId=XXX` or `/employees/unique_id/XXX`,
    // you could use fetchData('/employees/unique_id/${employeeId}') directly.
    const employees = await getAllEmployees();
    return employees.find(emp => emp.employeeId === employeeId) || null;
};

/**
 * Creates a new employee record.
 * @param {object} employeeData - Data for the new employee.
 * @returns {Promise<object>} - The created employee object with its ID.
 */
export const createEmployee = async (employeeData) => fetchData('/employees', {
    method: 'POST',
    body: JSON.stringify(employeeData)
});

/**
 * Updates an existing employee record.
 * @param {string} employeeId - The unique string identifier of the employee to update.
 * @param {object} employeeData - The data to update.
 * @returns {Promise<object>} - The updated employee object.
 */
export const updateEmployee = async (employeeId, employeeData) => fetchData(`/employees/${employeeId}`, {
    method: 'PUT', // Flask's PUT will handle partial updates via data.get()
    body: JSON.stringify(employeeData)
});

/**
 * Deletes an employee record.
 * @param {string} employeeId - The unique string identifier of the employee to delete.
 * @returns {Promise<null>} - Null on successful deletion.
 */
export const deleteEmployee = async (employeeId) => fetchData(`/employees/${employeeId}`, {
    method: 'DELETE'
});

// --- Attendance Endpoints ---

/**
 * Fetches all attendance records.
 * @returns {Promise<Array>} - An array of attendance record objects.
 */
export const getAllAttendanceRecords = async () => fetchData('/attendance');

/**
 * Creates a new attendance record.
 * @param {object} recordData - Data for the new attendance record.
 * @returns {Promise<object>} - The created attendance record object.
 */
export const createAttendanceRecord = async (recordData) => fetchData('/attendance', {
    method: 'POST',
    body: JSON.stringify(recordData)
});

/**
 * Updates an existing attendance record.
 * @param {number} id - The numeric ID of the attendance record to update.
 * @param {object} recordData - The data to update (e.g., { checkOut: "17:00" }).
 * @returns {Promise<object>} - The updated attendance record object.
 */
export const updateAttendanceRecord = async (id, recordData) => fetchData(`/attendance/${id}`, {
    method: 'PUT', // Flask's PUT handles this
    body: JSON.stringify(recordData)
});

/**
 * Deletes an attendance record.
 * @param {number} id - The numeric ID of the attendance record to delete.
 * @returns {Promise<null>} - Null on successful deletion.
 */
export const deleteAttendanceRecord = async (id) => fetchData(`/attendance/${id}`, {
    method: 'DELETE'
});

// --- Leave Request Endpoints ---

/**
 * Fetches all leave requests.
 * @returns {Promise<Array>} - An array of leave request objects.
 */
export const getAllLeaveRequests = async () => fetchData('/leaves');

/**
 * Creates a new leave request.
 * @param {object} requestData - Data for the new leave request.
 * @returns {Promise<object>} - The created leave request object.
 */
export const createLeaveRequest = async (requestData) => fetchData('/leaves', {
    method: 'POST',
    body: JSON.stringify(requestData)
});

/**
 * Updates an existing leave request.
 * @param {number} id - The numeric ID of the leave request to update.
 * @param {object} requestData - The data to update.
 * @returns {Promise<object>} - The updated leave request object.
 */
export const updateLeaveRequest = async (id, requestData) => fetchData(`/leaves/${id}`, {
    method: 'PUT',
    body: JSON.stringify(requestData)
});

/**
 * Deletes a leave request.
 * @param {number} id - The numeric ID of the leave request to delete.
 * @returns {Promise<null>} - Null on successful deletion.
 */
export const deleteLeaveRequest = async (id) => fetchData(`/leaves/${id}`, {
    method: 'DELETE'
});