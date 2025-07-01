import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HrNavbar() {
  const navigate = useNavigate();
  const [hrName, setHrName] = useState("HR User"); 

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.first_name && user?.last_name) {
        setHrName(`${user.first_name} ${user.last_name}`);
      }
    } catch (e) {
      console.error("Error reading user from localStorage", e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage on logout
    navigate("/"); // Redirect to login page
  };

  return (
    <nav className="w-full h-16 bg-blue-800 text-white flex items-center justify-between px-6 shadow fixed top-0 z-50">
      <h1 className="text-xl font-semibold">HR Dashboard</h1>
      <div className="flex items-center gap-6">
        <span className="text-sm">
          Logged in as: <strong>{hrName}</strong>
        </span>
        <Bell className="cursor-pointer" /> 
        <LogOut className="cursor-pointer" onClick={handleLogout} />{" "}
      </div>
    </nav>
  );
}
