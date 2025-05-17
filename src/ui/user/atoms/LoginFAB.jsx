import { LogIn, User, UserPlus } from 'lucide-react'
import { useState } from 'react'

const LoginFAB = () => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className='fixed left-3 bottom-1 transform -translate-y-1/2 z-50'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className='group flex items-center space-x-3'>
        {/* Main Icon Button - Animate only if group not hovered */}
        <div className='bg-[#af4133] text-white p-3 rounded-full shadow-lg cursor-pointer transition-all duration-300 group-hover:animate-none animate-bounce'>
          <User size={20} />
        </div>

        {/* Expandable Menu to the right */}
        <div
          className={`flex flex-col items-start transform transition-all duration-300 origin-left ${
            hovered ? 'scale-100 opacity-100 space-y-2' : 'scale-0 opacity-0 h-0 overflow-hidden'
          }`}
        >
          <button
            onClick={() => (window.location.href = '/login')}
            className='flex items-center gap-2 bg-white text-[#af4133] px-4 py-1.5 text-sm rounded-full shadow hover:bg-[#f8f8f8] hover:scale-105 transition-all duration-200'
          >
            <LogIn size={16} />
            Login
          </button>
          <button
            onClick={() => (window.location.href = '/signup')}
            className='flex items-center gap-2 bg-white text-[#af4133] px-4 py-1.5 text-sm rounded-full shadow hover:bg-[#f8f8f8] hover:scale-105 transition-all duration-200'
          >
            <UserPlus size={16} />
            Signup
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginFAB
