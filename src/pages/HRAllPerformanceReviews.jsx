import { useEffect, useState } from "react";
import axios from "../services/api";
import ReviewFilters from "../components/reviews/ReviewFilters";
import ReviewList from "../components/reviews/ReviewList";

export default function HRAllPerformanceReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    year: "",
    rating: "",
    name: "",
    department: "",
  });
  const [departmentOptions, setDepartmentOptions] = useState([]);

  useEffect(() => {
    const fetchReviewsAndDepartments = async () => {
      setLoading(true);
      try {
        // Fetch reviews
        const reviewsRes = await axios.get("/reviews");
        setReviews(reviewsRes.data);

        //  Fetch departments
        const departmentsRes = await axios.get("/departments");
        const departmentNames = departmentsRes.data.map((dept) => dept.name);
        setDepartmentOptions(departmentNames);
      } catch (err) {
        console.error("Failed to fetch data for HR Performance Reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsAndDepartments();
  }, []);

  // Filter the reviews based on the current filter state
  const filteredReviews = reviews.filter((r) => {
    const reviewYear = new Date(r.review_date).getFullYear();
    const matchYear = filters.year
      ? reviewYear === parseInt(filters.year)
      : true;
    const matchRating = filters.rating
      ? r.rating === parseInt(filters.rating)
      : true;
    const matchName = filters.name
      ? r.employee_name?.toLowerCase().includes(filters.name.toLowerCase())
      : true;
    const matchDepartment = filters.department
      ? r.employee_department === filters.department
      : true;

    return matchYear && matchRating && matchName && matchDepartment;
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">
        PERFORMANCE REVIEWS FOR COMPANY STAFF MEMBERS
      </h2>
      <ReviewFilters
        filters={filters}
        setFilters={setFilters}
        departmentOptions={departmentOptions}
      />

      {loading ? (
        <p className="text-gray-600 mt-4">Loading all employee reviews...</p>
      ) : (
        <>
          {filteredReviews.length === 0 && !loading ? (
            <p className="text-gray-600 mt-4">
              No reviews found matching your criteria.
            </p>
          ) : (
            <ReviewList reviews={filteredReviews} />
          )}
        </>
      )}
    </div>
  );
}
