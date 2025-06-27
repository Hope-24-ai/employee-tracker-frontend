import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="font-bold text-lg">Employee Tracker</div>
      <div className="space-x-4">
        {user.role === "admin" && (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/employees" className="hover:underline">Employees</Link>
            <Link to="/profile" className="hover:underline">Profile</Link>
          </>
        )}
        {user.role === "employee" && (
          <>
            <Link to="/employee-home" className="hover:underline">Home</Link>
            <Link to="/profile" className="hover:underline">Profile</Link>
          </>
        )}
        {user.name && (
          <button onClick={handleLogout} className="ml-4 bg-red-500 px-3 py-1 rounded hover:bg-red-600">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
