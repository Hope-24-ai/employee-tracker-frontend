import { useEffect, useState } from "react";
import axios from "../services/api";
import ReviewFilters from "../components/reviews/ReviewFilters";
import ReviewList from "../components/reviews/ReviewList";

export default function EmployeeReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    year: "",
    rating: "",
    name: "",
  });

  useEffect(() => {
    axios
      .get("/reviews")
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch reviews", err);
        setLoading(false);
      });
  }, []);

  const filteredReviews = reviews.filter((r) => {
    const year = new Date(r.review_date).getFullYear();
    const matchYear = filters.year ? year === parseInt(filters.year) : true;
    const matchRating = filters.rating
      ? r.rating === parseInt(filters.rating)
      : true;
    const matchName = filters.name
      ? r.employee_name?.toLowerCase().includes(filters.name.toLowerCase())
      : true;
    return matchYear && matchRating && matchName;
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Performance Reviews</h2>
      <ReviewFilters filters={filters} setFilters={setFilters} />
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <ReviewList reviews={filteredReviews} />
      )}
    </div>
  );
}
