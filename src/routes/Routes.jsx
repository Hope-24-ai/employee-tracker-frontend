// src/routes/AppRoutes.jsx
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login";
import ManagerLayout from "../layouts/ManagerLayout";
import EmployeeReviews from "../pages/EmployeeReviews";
import AllEmployees from "../pages/DepartmentEmployees";
// import Attendance from "../pages/Attendance";
import AddReview from "../pages/AddReview";

// Get user type name safely from localStorage
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

        {/* Protected Manager Layout with Nested Routes */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedType="Manager">
              <ManagerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="reviews" element={<EmployeeReviews />} />
          <Route path="employees" element={<AllEmployees />} />
          {/* <Route path="attendance" element={<Attendance />} /> */}
          <Route path="add-review" element={<AddReview />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
