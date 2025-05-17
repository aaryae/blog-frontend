// File: src/pages/admin/AdminDashboard.jsx
import { FileText, LayoutDashboard, LogOut, Users } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const adminMenu = [
  { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/admin' },
  { name: 'Manage Users', icon: <Users size={18} />, path: '/admin/users' },
  { name: 'Manage Blogs', icon: <FileText size={18} />, path: '/admin/blogs' },
]

const AdminDashboard = () => {
  const [active, setActive] = useState('/admin')

  const handleLogout = () => {
    console.log('Admin logged out')
    window.location.href = '/login'
  }

  return (
    <div className='min-h-screen flex'>
      {/* Sidebar */}
      <aside className='w-64 bg-[#1f1f1f] text-white p-6 space-y-8'>
        <div>
          <h1 className='text-2xl font-bold'>Admin Panel</h1>
        </div>
        <nav className='space-y-3'>
          {adminMenu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setActive(item.path)}
              className={`flex items-center gap-3 p-2 rounded transition-all hover:bg-[#333] ${
                active === item.path ? 'bg-[#333]' : ''
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className='flex items-center gap-3 p-2 rounded hover:bg-red-600 transition-all text-white bg-red-500 mt-10'
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main content area */}
      <main className='flex-1 bg-gray-100 p-8'>
        <h2 className='text-3xl font-bold mb-6'>Welcome, Admin!</h2>
        <p className='text-gray-700'>Here you can manage users, blogs, and other admin settings.</p>
        {/* Placeholder for routed admin content */}
      </main>
    </div>
  )
}

export default AdminDashboard
