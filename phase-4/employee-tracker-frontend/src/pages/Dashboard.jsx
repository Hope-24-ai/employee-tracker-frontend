export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">📊 Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded">Total Employees: 23</div>
        <div className="p-4 bg-white shadow rounded">Pending Reviews: 5</div>
      </div>
    </div>
  )
}

