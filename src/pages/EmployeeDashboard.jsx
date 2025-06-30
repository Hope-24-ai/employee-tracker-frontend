
import { Outlet, Link } from "react-router-dom";
import { User, ListChecks, CalendarCheck } from "lucide-react";
import EmployeeNavbar from "../components/EmployeeNavbar";

export default function EmployeeDashboard() {
  const dashboardLinks = [
    {
      to: "/employee/profile",
      label: "My Profile",
      icon: <User size={28} />,
    },
    {
      to: "/employee/reviews",
      label: "My Reviews",
      icon: <ListChecks size={28} />,
    },
    {
      to: "/employee/attendance",
      label: "My Attendance",
      icon: <CalendarCheck size={28} />,
    },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <EmployeeNavbar />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-blue-900">Welcome</h1>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {dashboardLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="bg-blue-900 text-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center hover:bg-blue-800 transition duration-300"
            >
              <div className="mb-2">{link.icon}</div>
              <span className="text-lg font-semibold">{link.label}</span>
            </Link>
          ))}
        </div>

        <Outlet />
      </main>
    </div>
  );
}
