import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeHome from "./pages/EmployeeHome";
import Profile from "./pages/Profile";
import Employees from "./pages/Employees";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthenticatedLayout from "./components/AuthenticatedLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public route for login */}
        <Route path="/" element={<Login />} />

        {/* Shared layout with Navbar and role-based protection */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin", "employee"]}>
              <AuthenticatedLayout />
            </ProtectedRoute>
          }
        >
          {/* Admin-only route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Employee-only route */}
          <Route
            path="/employee-home"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <EmployeeHome />
              </ProtectedRoute>
            }
          />

          {/* Shared route */}
          <Route path="/profile" element={<Profile />} />

          {/* Optional admin-only route */}
          <Route
            path="/employees"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Employees />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
