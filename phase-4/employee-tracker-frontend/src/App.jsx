import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeHome from "./pages/EmployeeHome";
import ProtectedRoute from "./components/protectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-home"
          element={
            <ProtectedRoute>
              <EmployeeHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
