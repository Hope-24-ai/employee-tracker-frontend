

import React, { useState } from "react";
import axios from "../services/api"; 
import AddDepartmentFormUI from "../components/AddDepartmentFormUI"; 

export default function AddDepartmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const res = await axios.post("/departments", formData); 
      setSuccessMessage(`Department "${res.data.name}" added successfully!`);
     
      setFormData({
        name: "",
        description: "",
      });
      console.log("New department added:", res.data);
    } catch (err) {
      console.error("Failed to add department:", err.response?.data || err);
      setError(
        err.response?.data?.error ||
          "Failed to add department. Please check your inputs."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddDepartmentFormUI
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
      successMessage={successMessage}
    />
  );
}
