import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/departments') // Make sure this URL is correct!
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setDepartments(data))
      .catch((error) => console.error('Error fetching departments:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        Departments Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-xl shadow-md border border-blue-200 p-6 hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {dept.name}
            </h2>

            <p className="text-sm text-gray-500 mb-2">
              {dept.employees?.length || 0} Employee
              {dept.employees?.length !== 1 ? 's' : ''}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {dept.employees?.map((emp) => (
                <Link
                  to={`/employees/${emp.id}`}
                  key={emp.id}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm shadow-sm hover:bg-blue-200 transition duration-200"
                >
                  {emp.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;