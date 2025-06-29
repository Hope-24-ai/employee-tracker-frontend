import { useEffect, useState } from "react";
import axios from "../services/api";

export default function ReviewForm() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: "",
    rating: 3,
    notes: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios
      .get("/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => {
        console.error("Error fetching employees", err);
        setErrorMsg("Failed to load employees");
      });
  }, []);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.employee_id || !formData.notes) {
      setErrorMsg("Please complete all fields");
      return;
    }

    axios
      .post("/reviews", formData)
      .then(() => {
        setSuccessMsg("Review added successfully!");
        setFormData({ employee_id: "", rating: 3, notes: "" });
        setErrorMsg("");
      })
      .catch((err) => {
        console.error("Error adding review", err);
        setErrorMsg("Failed to add review");
      });
  };

  // Fields
  const fields = [
    {
      name: "employee_id",
      label: "Select Employee",
      type: "select",
      options: employees.map((emp) => ({
        value: emp.id,
        label: `${emp.first_name} ${emp.last_name}`,
      })),
    },
    {
      name: "rating",
      label: "Rating",
      type: "select",
      options: [5, 4, 3, 2, 1].map((star) => ({
        value: star,
        label: `${star} Stars`,
      })),
    },
    {
      name: "notes",
      label: "Review Notes",
      type: "textarea",
      placeholder: "Write your review here...",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add New Performance Review</h2>

      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 text-sm font-medium">
              {field.label}
            </label>

            {field.type === "select" && (
              <select
                value={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">-- Select --</option>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {field.type === "textarea" && (
              <textarea
                value={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full p-2 border rounded"
                rows="4"
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
