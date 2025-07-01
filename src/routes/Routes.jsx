
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login";
// import ManagerLayout from "../layouts/ManagerLayout";  ----->not in use anymore
import DepartmentManager from "../pages/DepartmentManagerDashboard";
import HumanResourcesDashboard from "../pages/HumanResourceDashBoard";
import EmployeeReviews from "../pages/EmployeeReviews";
import AllEmployees from "../pages/DepartmentEmployees";
import AddReview from "../pages/AddReview";
import HRAllPerformanceReviews from "../pages/HRAllPerformanceReviews";
import HRAllEmployees from "../pages/HRAllEmployees";
// import Attendance from "../pages/Attendance";

// employee

import EmployeeDashboard from "../pages/EmployeeDashboard";
import EmployeeProfile from "../pages/EmployeeProfile";
import MyReviews from "../pages/MyReviews";
import MyAttendance from "../pages/MyAttendance";

// Get user type name  from localStorage
const getUserRoleType = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.user_type?.name || user?.user_type_name || null;
  } catch {
    return null;
  }
};

// Protect route based on user type
const ProtectedRoute = ({ children, allowedType }) => {
  const token = localStorage.getItem("access_token");
  const userType = getUserRoleType();
  const location = useLocation();

  if (!token) return <Navigate to="/" state={{ from: location }} replace />;
  if (allowedType && userType !== allowedType)
    return <Navigate to="/" state={{ from: location }} replace />;

  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        Manager
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedType="Manager">
              {/* <ManagerLayout /> */}
              <DepartmentManager />
            </ProtectedRoute>
          }
        >
          <Route path="reviews" element={<EmployeeReviews />} />
          <Route path="employees" element={<AllEmployees />} />
          {/* <Route path="attendance" element={<Attendance />} /> */}
          <Route path="add-review" element={<AddReview />} />
        </Route>
        {/* employee */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedType="Employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<EmployeeProfile />} />
          <Route path="reviews" element={<MyReviews />} />
          <Route path="attendance" element={<MyAttendance />} />
        </Route>
        {/* HR Dashboard and its nested routes */}
        <Route
          path="/hr"
          element={
            <ProtectedRoute allowedType="HR">
              <HumanResourcesDashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested route for HR to view ALL performance reviews */}
          <Route
            path="performance-reviews"
            element={<HRAllPerformanceReviews />}
          />
          <Route path="all-employees" element={<HRAllEmployees />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
