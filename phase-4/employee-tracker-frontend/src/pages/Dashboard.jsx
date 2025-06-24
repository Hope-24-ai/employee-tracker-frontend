import Layout from '../components/Layout'

export default function Dashboard() {
  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 shadow rounded">
          <p className="text-gray-500">Total Employees</p>
          <h3 className="text-2xl font-bold text-blue-600">23</h3>
        </div>
        <div className="bg-white p-6 shadow rounded">
          <p className="text-gray-500">Pending Reviews</p>
          <h3 className="text-2xl font-bold text-blue-600">5</h3>
        </div>
      </div>
    </Layout>
  )
}

