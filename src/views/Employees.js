import React, { useEffect, useState } from "react";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("members")) || [];
    setEmployees(stored);
  }, []);

  const deleteMember = (index) => {
    const updated = [...employees];
    updated.splice(index, 1);
    setEmployees(updated);
    localStorage.setItem("members", JSON.stringify(updated));
  };

  const downloadCSV = () => {
    const csv = [
      ["Name", "Role", "Department"],
      ...employees.map((e) => [e.name, e.role, e.department])
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employees.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 md:p-10 bg-blueGray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-800">Employee Tracker</h1>
        <div className="text-right">
          <button
            onClick={downloadCSV}
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
          >
            ⬇️ Download CSV File
          </button>
          <p className="text-sm text-blueGray-400 mt-1">
            Download employee records in CSV format.
          </p>
        </div>
      </div>

      {employees.length === 0 ? (
        <div className="text-gray-500 bg-white p-6 rounded shadow text-center">
          No employees found. Ask HR to add members.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-gray-600 font-medium">Name</th>
                <th className="text-left px-6 py-3 text-gray-600 font-medium">Role</th>
                <th className="text-left px-6 py-3 text-gray-600 font-medium">Department</th>
                <th className="text-left px-6 py-3 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{emp.name}</td>
                  <td className="px-6 py-4">{emp.role}</td>
                  <td className="px-6 py-4">{emp.department}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteMember(i)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
