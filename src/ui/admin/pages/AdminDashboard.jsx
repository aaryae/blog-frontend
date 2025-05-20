const AdminDashboard = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-100 via-gray-200 to-blue-100 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl  p-10 ">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 tracking-tight">
          Welcome, Admin!
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-600">
          This is your control center. Here you can manage users, blogs, categories, and more with confidence.
        </p>
      
      </div>
    </div>
  )
}

export default AdminDashboard
