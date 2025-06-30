
import { useEffect, useState } from "react";
import axios from "../services/api";
import ReviewCard from "../components/ReviewCard";

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/reviews")
      .then((res) => setReviews(res.data))
      .catch(() => setError("Failed to load reviews."));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-blue-900">My Reviews</h2>

      {error && <p className="text-red-500">{error}</p>}

      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="grid gap-4">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}
    </div>
  );
}
