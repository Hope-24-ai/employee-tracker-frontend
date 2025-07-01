import {
  FaStar,
  FaUserTie,
  FaUserAlt,
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaCommentDots,
} from "react-icons/fa";

const ReviewCard = ({ review }) => {
  // Get and normalize user role
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.user_type?.name || user?.user_type_name;

  const formattedDate = new Date(review.review_date).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < rating ? "text-yellow-500" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200">
      {/* Only show employee details if viewer is a Manager oR HR */}
      {role === "Manager" ||
        (role === "HR" && (
          <div className="mb-3 space-y-1 text-sm text-gray-800">
            <div className="flex items-center gap-2">
              <FaUserAlt className="text-purple-600" />
              <span className="font-semibold">Employee:</span>{" "}
              {review.employee_name}
            </div>
            <div className="flex items-center gap-2">
              <FaBriefcase className="text-green-600" />
              <span className="font-semibold">Title:</span>{" "}
              {review.employee_job_title || "N/A"}
            </div>
            <div className="flex items-center gap-2">
              <FaBuilding className="text-blue-600" />
              <span className="font-semibold">Department:</span>{" "}
              {review.employee_department || "N/A"}
            </div>
          </div>
        ))}

      {/* Reviewer */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <FaUserTie className="text-blue-500" />
        <span className="font-semibold">Reviewer:</span> {review.reviewer}
      </div>

      {/* Notes */}
      <div className="text-gray-700 text-sm mb-3">
        <FaCommentDots className="inline mr-1 text-gray-400" />
        {review.notes}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        {renderStars(review.rating)}
      </div>

      {/* Date */}
      <div className="flex items-center text-xs text-gray-400">
        <FaCalendarAlt className="mr-1" />
        {formattedDate}
      </div>
    </div>
  );
};

export default ReviewCard;
