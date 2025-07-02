import React, { useEffect, useState } from "react";
import axios from "../services/api";

export default function DepartmentListForManager() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);

        const response = await axios.get("/departments");
        setDepartments(response.data);
      } catch (err) {
        console.error("Failed to fetch departments for manager:", err);

        setError(
          "Failed to load departments. Please ensure the backend is running and you have access."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        Company Departments
      </h2>

      {/* Error Message Display */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <p className="text-gray-600 mt-4">Loading departments...</p>
      ) : (
        <div className="overflow-x-auto">
          {/* No Departments Found State */}
          {departments.length === 0 ? (
            <p className="text-gray-600 mt-4">
              No departments found. Please add some departments in the HR
              dashboard.
            </p>
          ) : (
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Department Name</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Manager</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{dept.name}</td>
                    <td className="px-4 py-2">{dept.description || "—"}</td>
                    <td className="px-4 py-2">{dept.manager_name || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
