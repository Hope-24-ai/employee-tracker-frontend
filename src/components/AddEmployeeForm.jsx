
import React from "react";

export default function AddEmployeeForm({
  formData,
  handleChange,
  handleSubmit,
  userTypes,
  departments,
  error,
  successMessage,
  loading,
}) {
  const fields = [
    {
      label: "First Name",
      type: "text",
      name: "first_name",
      required: true,
      inputType: "input",
    },
    {
      label: "Last Name",
      type: "text",
      name: "last_name",
      required: true,
      inputType: "input",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      required: true,
      inputType: "input",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      required: true,
      inputType: "input",
    },
    {
      label: "Phone (Optional)",
      type: "text",
      name: "phone",
      required: false,
      inputType: "input",
    },
    {
      label: "User Type",
      name: "user_type_name",
      required: true,
      inputType: "select",
      options: userTypes,
      optionKey: "name",
    },
    {
      label: "Job Title",
      type: "text",
      name: "job_title_name",
      required: true,
      inputType: "input",
    },
    {
      label: "Department",
      name: "department_id",
      required: true,
      inputType: "select",
      options: departments,
      optionKey: "name",
      optionValueKey: "id",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-700">Loading form...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">
        Add New Employee
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

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
            </label>
            {field.inputType === "input" ? (
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
            ) : (
              // For select inputs
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required={field.required}
                disabled={loading}
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option
                    key={option.id}
                    value={
                      field.optionValueKey
                        ? option[field.optionValueKey]
                        : option[field.optionKey]
                    }
                  >
                    {option[field.optionKey]}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            disabled={loading}
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
}
