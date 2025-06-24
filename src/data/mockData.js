

const departments = [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Human Resources' },
  { id: 3, name: 'Marketing' },
  { id: 4, name: 'Sales' },
  { id: 5, name: 'Operations' },
];

const employees = [
  {
    id: 'EMP001',
    name: 'Fancy Byegon',
    email: 'fancy.byegon@example.com',
    phone: '111-222-3333',
    departmentId: 1, // Engineering
    role: 'Software Engineer',
    hireDate: '2022-01-15',
    profilePic: 'https://i.pinimg.com/736x/58/de/7a/58de7a1b21e47cbd272c06ade840629d.jpg',
    currentStatus: 'Clocked In' 
  },
  {
    id: 'EMP002',
    name: 'Hope Wasonga',
    email: 'hope.wasonga@example.com',
    phone: '444-555-6666',
    departmentId: 2, // Human Resources
    role: 'HR Manager',
    hireDate: '2020-05-20',
    profilePic: 'https://i.pinimg.com/736x/05/ca/de/05caded06ff8a2809f077e846d0edb1b.jpg',
    currentStatus: 'Clocked In'
  },
  {
    id: 'EMP003',
    name: 'Carlos Kiplangat',
    email: 'carlos.kiplangat@example.com',
    phone: '777-888-9999',
    departmentId: 1, // Engineering
    role: 'Senior Developer',
    hireDate: '2019-11-01',
    profilePic: 'https://i.pinimg.com/736x/34/22/e5/3422e5e839e22ce44d81e77d6fb50e22.jpg',
    currentStatus: 'On Leave'
  },
  {
    id: 'EMP004',
    name: 'Michael Munga',
    email: 'michael.munga@example.com',
    phone: '000-111-2222',
    departmentId: 3, // Marketing
    role: 'Marketing Specialist',
    hireDate: '2023-03-10',
    profilePic: 'https://i.pinimg.com/736x/27/47/65/2747652536af847beb2b1500784d41b1.jpg',
    currentStatus: 'Clocked Out'
  },
  {
    id: 'EMP005',
    name: 'Chris Chege',
    email: 'chris.chege@example.com',
    phone: '333-444-5555',
    departmentId: 4, // Sales
    role: 'Sales Representative',
    hireDate: '2021-08-01',
    profilePic: 'https://i.pinimg.com/736x/53/b5/59/53b5598474fc9edb445608221d6456cb.jpg',
    currentStatus: 'Clocked In'
  },
];


let attendanceRecords = [
  { id: 1, employeeId: 'EMP001', date: '2025-06-19', status: 'Present', checkIn: '08:55', checkOut: '17:05' },
  { id: 2, employeeId: 'EMP001', date: '2025-06-20', status: 'Present', checkIn: '09:01', checkOut: '17:00' },
  { id: 3, employeeId: 'EMP001', date: '2025-06-21', status: 'Leave', details: 'Annual Leave', checkIn: null, checkOut: null },
  { id: 4, employeeId: 'EMP001', date: '2025-06-22', status: 'Present', checkIn: '08:58', checkOut: '17:02' },
  { id: 5, employeeId: 'EMP001', date: '2025-06-23', status: 'Present', checkIn: '09:05', checkOut: '17:10' },
  { id: 6, employeeId: 'EMP001', date: '2025-06-24', status: 'Absent', details: 'Sick (No notice)', checkIn: null, checkOut: null }, 
];


let leaveRequests = [
  { id: 1, employeeId: 'EMP001', type: 'Sick Leave', startDate: '2025-06-25', endDate: '2025-06-25', reason: 'Feeling unwell', status: 'Pending' },
  { id: 2, employeeId: 'EMP001', type: 'Annual Leave', startDate: '2025-07-01', endDate: '2025-07-05', reason: 'Vacation to the coast', status: 'Approved' },
  { id: 3, employeeId: 'EMP003', type: 'Annual Leave', startDate: '2025-06-15', endDate: '2025-06-30', reason: 'Extended break', status: 'Approved' },
];


const addAttendanceRecord = (newRecord) => {
  newRecord.id = attendanceRecords.length + 1; 
  attendanceRecords.push(newRecord);
  return newRecord;
};


const updateAttendanceRecord = (id, updates) => {
  const index = attendanceRecords.findIndex(record => record.id === id);
  if (index !== -1) {
    attendanceRecords[index] = { ...attendanceRecords[index], ...updates };
    return attendanceRecords[index];
  }
  return null;
};


const addLeaveRequest = (newRequest) => {
  newRequest.id = leaveRequests.length + 1; 
  newRequest.submissionDate = new Date().toISOString().split('T')[0]; 
  newRequest.status = 'Pending'; 
  leaveRequests.push(newRequest);
  return newRequest;
};



const getDepartmentName = (departmentId) => {
  const dept = departments.find(d => d.id === departmentId);
  return dept ? dept.name : 'Unknown';
};

export {
  employees,
  departments,
  attendanceRecords, 
  leaveRequests,    
  addAttendanceRecord,
  updateAttendanceRecord,
  addLeaveRequest,
  getDepartmentName
};