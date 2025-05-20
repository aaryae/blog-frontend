import { FileText, LayoutDashboard, LogOut, Users } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const adminMenu = [
  { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/admin' },
  { name: 'Manage Users', icon: <Users size={18} />, path: '/admin/users' },
  { name: 'Manage Blogs', icon: <FileText size={18} />, path: '/admin/manage-blogs' },
]

const AdminNavbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [active, setActive] = useState(location.pathname)

  const handleLogout = () => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    localStorage.clear()
    if (rememberedEmail) {
      localStorage.setItem('rememberedEmail', rememberedEmail)
    }

    navigate('/login')
  }

  return (
    <aside className='w-64 bg-[#1f1f1f] text-white p-6 flex flex-col shadow-lg min-h-screen'>
      <div className='mb-10'>
        <h1 className='text-3xl font-extrabold bg-gradient-to-r from-[#f43f5e] to-[#991010] text-transparent bg-clip-text'>
          Admin Panel
        </h1>
      </div>

      <nav className='flex flex-col gap-2 flex-1'>
        {adminMenu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setActive(item.path)}
            className={`flex items-center gap-3 p-3 rounded-md transition-all font-medium ${
              active === item.path
                ? 'bg-[#991010] text-white shadow-md'
                : 'hover:bg-[#2c2c2c] text-gray-300'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className='flex items-center gap-3 p-3 rounded-md mt-10 bg-red-600 hover:bg-red-700 transition text-white font-medium'
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  )
}

export default AdminNavbar
