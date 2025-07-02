import React from "react";
import { Building } from "lucide-react"; 

export default function AddDepartmentFormUI({
  formData,
  handleChange,
  handleSubmit,
  loading,
  error,
  successMessage,
}) {
  const fields = [
    {
      label: "Department Name",
      type: "text",
      name: "name",
      required: true,
      inputType: "input",
    },
    {
      label: "Description ",
      type: "textarea",
      name: "description",
      required: false,
      inputType: "textarea",
      rows: 3,
     
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
        <Building size={28} className="mr-2" /> Add New Department
      </h2>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
            </label>
            {field.inputType === "input" && (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required={field.required}
                disabled={loading}
                placeholder={field.placeholder}
              />
            )}
            {field.inputType === "textarea" && (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                rows={field.rows}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required={field.required}
                disabled={loading}
                placeholder={field.placeholder}
              ></textarea>
            )}
          </div>
        ))}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Department"}
          </button>
        </div>
      </form>
    </div>
  );
}
