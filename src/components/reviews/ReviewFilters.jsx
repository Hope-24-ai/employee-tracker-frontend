export default function ReviewFilters({ filters, setFilters ,departmentOptions =[]}) {
  const fields = [
    {
      label: "Filter by Year",
      type: "number",
      placeholder: "e.g. 2023",
      key: "year",
      inputType: "input",
    },
    {
      label: "Filter by Rating",
      key: "rating",
      inputType: "select",
      options: ["", 5, 4, 3, 2, 1],
    },
    {
      label: "Filter by Name",
      type: "text",
      placeholder: "e.g. John",
      key: "name",
      inputType: "input",
    },
    {
      label: "Filter by Department",
      key: "department", 
      inputType: "select",
      options: departmentOptions, 
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {fields.map((field) => (
        <div key={field.key}>
          <label className="block text-sm text-gray-600 mb-1">
            {field.label}
          </label>
          {field.inputType === "input" ? (
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="border p-2 rounded w-32"
              value={filters[field.key]}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
            />
          ) : (
              // select inputs
            <select
              className="border p-2 rounded w-32"
              value={filters[field.key]}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
              >
                {/* default option */}
              <option value="">All</option>
              {field.options 
                .filter((opt) => opt !== "")
                .map((opt) => (
                  <option key={opt} value={opt}>
                    {opt} {field.key === "rating" ? "Stars" : ""}
                  </option>
                ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
}
