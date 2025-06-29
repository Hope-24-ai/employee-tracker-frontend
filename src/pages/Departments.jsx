import React, { useEffect, useState } from 'react';

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/employees')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((employees) => {
        const deptMap = {};

        employees.forEach((emp) => {
          const deptName = emp.department || 'Unknown';
          if (!deptMap[deptName]) {
            deptMap[deptName] = { name: deptName, employees: [] };
          }
          deptMap[deptName].employees.push(emp);
        });

        setDepartments(Object.values(deptMap));
      })
      .catch((err) => console.error('Error fetching employees:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-8 text-white font-sans">
      <h1 className="text-5xl text-center mb-16   ">
         Department Hub
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        {departments.map((dept, index) => {
          const totalSalary = dept.employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);

          return (
            <div
              key={dept.name}
              className="bg-white/10 backdrop-blur-xl border border-cyan-400/50 rounded-2xl p-6 shadow-xl hover:scale-[1.02] hover:shadow-cyan-500/30 transition-transform duration-500"
              style={{ animation: `fadeIn 0.4s ease ${index * 0.15}s forwards`, opacity: 0 }}
            >
              <h2 className="text-3xl font-bold text-cyan-300 mb-4 tracking-wide">
                {dept.name}
              </h2>

              <p className="text-sm text-gray-300 mb-6 italic">
                {dept.employees.length} {dept.employees.length === 1 ? 'Employee' : 'Employees'} • 
                Total Salary: <span className="font-semibold text-cyan-100">${totalSalary.toLocaleString()}</span>
              </p>

              <div className="space-y-3">
                {dept.employees.map((emp) => (
                  <div key={emp.id} className="bg-white/5 p-4 rounded-xl border border-white/10 shadow-sm hover:bg-white/10 transition">
                    <h3 className="text-lg font-semibold text-white">{emp.name}</h3>
                    <p className="text-sm text-gray-300"> {emp.position}</p>
                    <p className="text-sm text-gray-400"> ${emp.salary?.toLocaleString() || 'N/A'}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

     
      <style>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0px);
          }
          from {
            opacity: 0;
            transform: translateY(10px);
          }
        }
      `}
      </style>
      
    </div>
  );
};

export default Departments;