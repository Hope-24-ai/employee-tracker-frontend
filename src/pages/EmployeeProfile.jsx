
export default function EmployeeProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl">
      <h2 className="text-xl font-bold mb-4 text-blue-900">My Profile</h2>
      <p>
        <strong>Name:</strong> {user.first_name} {user.last_name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone || "N/A"}
      </p>
    
      <p>
        <strong>Job Title:</strong> {user.job_title_name}
      </p>
    </div>
  );
}
