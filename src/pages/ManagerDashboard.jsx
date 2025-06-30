// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { FaUsers, FaBuilding, FaCalendarCheck, FaSearch } from "react-icons/fa";

// const attendanceData = [
//   { day: "Mon", employees: 100 },
//   { day: "Tue", employees: 97 },
//   { day: "Wed", employees: 105 },
//   { day: "Thu", employees: 92 },
//   { day: "Fri", employees: 110 },
// ];

// const recentActivity = [
//   { name: "Ali Hassan", action: "Checked in", time: "9:05 AM" },
//   { name: "Nadia Yusuf", action: "Checked out", time: "2:15 PM" },
//   { name: "Ahmed Warsame", action: "Checked in", time: "8:47 AM" },
// ];

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

// export default function ManagerDashboard() {
//   const [employees, setEmployees] = useState([
//     { id: 1, name: "Ali Hassan", role: "Developer", department: "Engineering" },
//     { id: 2, name: "Nadia Yusuf", role: "HR Manager", department: "HR" },
//     { id: 3, name: "Ahmed Warsame", role: "Accountant", department: "Finance" },
//   ]);

//   const [newEmployee, setNewEmployee] = useState({
//     name: "",
//     role: "",
//     department: "",
//   });

//   const addEmployee = () => {
//     const id = Date.now();
//     if (!newEmployee.name || !newEmployee.role || !newEmployee.department)
//       return;
//     setEmployees([...employees, { ...newEmployee, id }]);
//     setNewEmployee({ name: "", role: "", department: "" });
//   };

//   const deleteEmployee = (id) => {
//     setEmployees(employees.filter((emp) => emp.id !== id));
//   };

//   const downloadData = () => {
//     const dataStr =
//       "data:text/json;charset=utf-8," +
//       encodeURIComponent(JSON.stringify(employees, null, 2));
//     const anchor = document.createElement("a");
//     anchor.setAttribute("href", dataStr);
//     anchor.setAttribute("download", "employees.json");
//     document.body.appendChild(anchor);
//     anchor.click();
//     anchor.remove();
//   };

//   const departmentData = Array.from(
//     employees.reduce((map, emp) => {
//       map.set(emp.department, (map.get(emp.department) || 0) + 1);
//       return map;
//     }, new Map()),
//     ([name, value]) => ({ name, value })
//   );

//   return (
//     <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold">Dashboard</h1>

//       {/* Stats Cards (Dynamic) */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="bg-white shadow-md p-4 rounded-2xl flex items-center space-x-4">
//           <FaUsers className="text-blue-500 text-3xl" />
//           <div>
//             <div className="text-sm text-gray-500">Total Employees</div>
//             <div className="text-xl font-semibold">{employees.length}</div>
//           </div>
//         </div>

//         <div className="bg-white shadow-md p-4 rounded-2xl flex items-center space-x-4">
//           <FaBuilding className="text-green-500 text-3xl" />
//           <div>
//             <div className="text-sm text-gray-500">Departments</div>
//             <div className="text-xl font-semibold">
//               {[...new Set(employees.map((emp) => emp.department))].length}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white shadow-md p-4 rounded-2xl flex items-center space-x-4">
//           <FaCalendarCheck className="text-purple-500 text-3xl" />
//           <div>
//             <div className="text-sm text-gray-500">Active Today</div>
//             <div className="text-xl font-semibold">
//               {Math.floor(Math.random() * employees.length) + 1}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white shadow-md p-4 rounded-2xl">
//           <h2 className="text-lg font-semibold mb-2">
//             Employees by Department
//           </h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie
//                 data={departmentData}
//                 dataKey="value"
//                 nameKey="name"
//                 outerRadius={80}
//               >
//                 {departmentData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white shadow-md p-4 rounded-2xl">
//           <h2 className="text-lg font-semibold mb-2">Weekly Attendance</h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={attendanceData}>
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="employees" fill="#4f46e5" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white shadow-md p-4 rounded-2xl">
//         <div className="flex items-center mb-4">
//           <FaSearch className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="Search employees..."
//             className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
//         <table className="w-full text-left">
//           <thead>
//             <tr className="text-gray-500 text-sm">
//               <th className="p-2">Name</th>
//               <th className="p-2">Action</th>
//               <th className="p-2">Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recentActivity.map((entry, idx) => (
//               <tr key={idx} className="border-t text-sm">
//                 <td className="p-2">{entry.name}</td>
//                 <td className="p-2">{entry.action}</td>
//                 <td className="p-2">{entry.time}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Manage Employees */}
//       <div className="bg-white shadow-md p-6 rounded-2xl">
//         <h2 className="text-2xl font-bold mb-4">Manage Employees</h2>

//         <div className="grid sm:grid-cols-3 gap-4 mb-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={newEmployee.name}
//             onChange={(e) =>
//               setNewEmployee({ ...newEmployee, name: e.target.value })
//             }
//             className="border p-2 rounded-md"
//           />
//           <input
//             type="text"
//             placeholder="Role"
//             value={newEmployee.role}
//             onChange={(e) =>
//               setNewEmployee({ ...newEmployee, role: e.target.value })
//             }
//             className="border p-2 rounded-md"
//           />
//           <input
//             type="text"
//             placeholder="Department"
//             value={newEmployee.department}
//             onChange={(e) =>
//               setNewEmployee({ ...newEmployee, department: e.target.value })
//             }
//             className="border p-2 rounded-md"
//           />
//         </div>

//         <div className="flex space-x-4 mb-4">
//           <button
//             onClick={addEmployee}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//           >
//             Add Employee
//           </button>
//           <button
//             onClick={downloadData}
//             className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//           >
//             Download Data
//           </button>
//         </div>

//         <table className="w-full text-left border-t">
//           <thead>
//             <tr className="text-sm text-gray-600">
//               <th className="p-2">Name</th>
//               <th className="p-2">Role</th>
//               <th className="p-2">Department</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((emp) => (
//               <tr key={emp.id} className="border-t text-sm">
//                 <td className="p-2">{emp.name}</td>
//                 <td className="p-2">{emp.role}</td>
//                 <td className="p-2">{emp.department}</td>
//                 <td className="p-2">
//                   <button
//                     onClick={() => deleteEmployee(emp.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
