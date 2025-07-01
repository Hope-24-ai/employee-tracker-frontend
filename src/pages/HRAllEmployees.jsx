import { useEffect, useState } from "react";
import axios from "../services/api"; // Assuming your axios instance is here

export default function HRAllEmployees() {
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    title: "",
    department: "",
  });
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeesAndDepartments = async () => {
      setLoading(true);
      try {
        const employeesRes = await axios.get("/employees");
        setEmployees(employeesRes.data);

        // Fetch departments for the filter dropdown
        const departmentsRes = await axios.get("/departments");
        const departmentNames = departmentsRes.data.map((dept) => dept.name);
        setDepartmentOptions(departmentNames);
      } catch (err) {
        console.error("Failed to fetch all employees for HR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeesAndDepartments();
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const fullName = `${emp.first_name} ${emp.last_name}`.toLowerCase();
    const title = emp.job_title_name?.toLowerCase() || "";
    const department = emp.department_name?.toLowerCase() || "";

    const nameMatch = filters.name
      ? fullName.includes(filters.name.toLowerCase())
      : true;
    const titleMatch = filters.title
      ? title.includes(filters.title.toLowerCase())
      : true;
    const departmentMatch = filters.department
      ? department === filters.department.toLowerCase()
      : true;

    return nameMatch && titleMatch && departmentMatch;
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        All Employees Overview
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Search by Name
          </label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            className="p-2 border rounded w-48"
            value={filters.name}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Search by Job Title
          </label>
          <input
            type="text"
            placeholder="e.g. Software Engineer"
            className="p-2 border rounded w-48"
            value={filters.title}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Filter by Department
          </label>
          <select
            className="p-2 border rounded w-48"
            value={filters.department}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, department: e.target.value }))
            }
          >
            <option value="">All Departments</option>
            {departmentOptions.map((deptName) => (
              <option key={deptName} value={deptName}>
                {deptName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-600 mt-4">Loading employees...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Full Name</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Job Title</th>
                <th className="px-4 py-2 text-left">Department</th>{" "}
                {/* New column */}
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">
                      {emp.first_name} {emp.last_name}
                    </td>
                    <td className="px-4 py-2">{emp.user_type_name || "—"}</td>
                    <td className="px-4 py-2">{emp.job_title_name || "—"}</td>
                    <td className="px-4 py-2">
                      {emp.department_name || "—"}
                    </td>{" "}
                    {/* Display department */}
                    <td className="px-4 py-2">{emp.email}</td>
                    <td className="px-4 py-2">{emp.phone || "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No matching employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
