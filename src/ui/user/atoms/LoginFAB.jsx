import { LogIn, User, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginFAB = () => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className='fixed left-3 bottom-10 z-50'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className='group flex items-center space-x-3'>
        {/* Main Icon */}
        <div className='bg-[#af4133] text-white p-3 rounded-full shadow-lg cursor-pointer transition-all duration-300 group-hover:animate-none animate-bounce'>
          <User size={20} />
        </div>

        {/* Login/Signup List */}
        <div
          className={`flex flex-col items-start transition-all duration-300 origin-left ${
            hovered ? 'scale-100 opacity-100 space-y-2' : 'scale-0 opacity-0 h-0 overflow-hidden'
          }`}
        >
          <Link
            to='/login'
            className='flex items-center gap-2 bg-white text-[#af4133] px-4 py-2 text-sm font-medium rounded-full shadow border border-gray-200 hover:shadow-md hover:ring hover:ring-red-200 transition-all duration-300 backdrop-blur-sm'
          >
            <LogIn size={16} />
            Login
          </Link>
          <Link
            to='/register'
            className='flex items-center gap-2 bg-white text-[#af4133] px-4 py-2 text-sm font-medium rounded-full shadow border border-gray-200 hover:shadow-md hover:ring hover:ring-red-200 transition-all duration-300 backdrop-blur-sm'
          >
            <UserPlus size={16} />
            Signup
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginFAB
