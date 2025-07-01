import { Outlet, Link } from "react-router-dom";
import {
  UserPlus, 
  Users, 
  FileText, 
  CalendarCheck, 
  ClipboardList, 
} from "lucide-react";
import HrNavbar from "../components/HrNavbar";
import { useEffect, useState } from "react";
import axios from "../services/api"; // Import axios

export default function HumanResourcesDashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [loadingTotal, setLoadingTotal] = useState(true); 

  useEffect(() => {
    const fetchTotalEmployees = async () => {
      try {
        setLoadingTotal(true);
        
        const response = await axios.get("/total-employees");
        setTotalEmployees(response.data.total_employees);
      } catch (error) {
        console.error("Failed to fetch total employees:", error);
        
        setTotalEmployees(0);
      } finally {
        setLoadingTotal(false);
      }
    };

    fetchTotalEmployees();
  }, []); //runs once on component mount

  const dashboardLinks = [
    {
      to: "/hr/add-employee",
      label: "Add New Employee",
      icon: <UserPlus size={28} />,
      description: "Onboard new team members.",
    },
    {
      to: "/hr/all-employees", 
      label: "Company Staff Members", 
      icon: <Users size={28} />,
      description: "View all staff across the company.", 
    },
    {
      to: "/hr/leave-approvals",
      label: "Approve Leave",
      icon: <ClipboardList size={28} />,
      description: "Manage and approve employee leave requests.",
    },
    {
      to: "/hr/performance-reviews",
      label: "Performance Reviews",
      icon: <FileText size={28} />,
      description: "Oversee all company performance reviews.",
    },
    {
      to: "/hr/attendance",
      label: "Employee Attendance",
      icon: <CalendarCheck size={28} />,
      description: "Monitor and manage employee attendance records.",
    },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <HrNavbar />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-blue-900">
          Human Resources Dashboard
        </h1>

        {/* Total Employees Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6 border-l-4 border-blue-600">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Employees
          </h2>
          {loadingTotal ? (
            <p className="text-2xl font-bold text-blue-800">Loading...</p>
          ) : (
            <p className="text-4xl font-bold text-blue-800">{totalEmployees}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Active employees in the organization
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {dashboardLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="bg-blue-900 text-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center text-center hover:bg-blue-800 transition duration-300 transform hover:scale-105"
            >
              <div className="mb-3">{link.icon}</div>
              <span className="text-lg font-semibold mb-1">{link.label}</span>
              <p className="text-sm opacity-90">{link.description}</p>
            </Link>
          ))}
        </div>

        <Outlet />
      </main>
    </div>
  );
}
