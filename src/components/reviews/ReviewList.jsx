import ReviewCard from "../ReviewCard";

export default function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return <p className="text-gray-500">No reviews match the filter.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
