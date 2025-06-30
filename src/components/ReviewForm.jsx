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
        label: `${star} Star${star > 1 ? "s" : ""}`,
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
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow mt-0">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">
          Add New Performance Review
        </h2>

        {successMsg && <p className="text-green-600 mb-3">{successMsg}</p>}
        {errorMsg && <p className="text-red-600 mb-3">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                {field.label}
              </label>

              {field.type === "select" && (
                <select
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                  rows="4"
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
