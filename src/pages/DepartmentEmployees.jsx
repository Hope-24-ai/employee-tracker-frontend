import { useEffect, useState } from "react";
import axios from "../services/api";

export default function AllEmployees() {
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    title: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/employees")
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch employees", err);
        setLoading(false);
      });
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const fullName = `${emp.first_name} ${emp.last_name}`.toLowerCase();
    const title = emp.job_title_name?.toLowerCase() || "";
    const nameMatch = filters.name
      ? fullName.includes(filters.name.toLowerCase())
      : true;
    const titleMatch = filters.title
      ? title.includes(filters.title.toLowerCase())
      : true;
    return nameMatch && titleMatch;
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Team Members Overview</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Search by Name
          </label>
          <input
            type="text"
            placeholder="e.g. Bob Marley"
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
            placeholder="e.g. Developer"
            className="p-2 border rounded w-48"
            value={filters.title}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Full Name</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Job Title</th>
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
                    <td className="px-4 py-2">{emp.email}</td>
                    <td className="px-4 py-2">{emp.phone || "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
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
