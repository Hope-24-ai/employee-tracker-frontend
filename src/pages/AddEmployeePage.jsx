

import React, { useState, useEffect } from "react";
import axios from "../services/api";
import AddEmployeeForm from "../components/AddEmployeeForm";

export default function AddEmployeePage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    user_type_name: "",
    job_title_name: "",
    department_id: "",
  });

  const [userTypes, setUserTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      setLoading(true);
      try {
        const [userTypesRes, departmentsRes] =
          await Promise.all([
            axios.get("/user-types"),
            axios.get("/departments"),
          ]);

        setUserTypes(userTypesRes.data);
        setDepartments(departmentsRes.data);
      } catch (err) {
        console.error("Failed to fetch dropdown options:", err);
        setError("Failed to load form options. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setFormSubmitting(true);

    try {
      const payload = {
        ...formData,
        department_id: parseInt(formData.department_id),
      };

      const res = await axios.post("/employees", payload);
      setSuccessMessage(
        `Employee ${res.data.first_name} ${res.data.last_name} added successfully!`
      );
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        user_type_name: "",
        job_title_name: "", 
        department_id: "",
      });
      console.log("New employee added:", res.data);
    } catch (err) {
      console.error("Failed to add employee:", err.response?.data || err);
      setError(
        err.response?.data?.error ||
          "Failed to add employee. Please check your inputs."
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <AddEmployeeForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      userTypes={userTypes}
      departments={departments}
      error={error}
      successMessage={successMessage}
      loading={loading || formSubmitting}
    />
  );
}
