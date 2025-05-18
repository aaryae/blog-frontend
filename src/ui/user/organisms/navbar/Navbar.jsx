import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Logo from '../../atoms/Logo'
import { ChevronDown } from 'lucide-react'
import { useAuth } from '../../../../context/AuthContext'

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className='bg-white text-black/70 w-full fixed top-0 z-40 shadow-md'>
      <div className='max-w-6xl mx-auto w-full flex items-center justify-between py-4 px-4'>
        <Logo />
 
        {/* Desktop Nav */}
        <div className='hidden md:flex items-center gap-7'>
          <Link to='/' className='font-bold uppercase text-sm'>Home</Link>

          {/* Blog Dropdown */}
          <div className='relative'>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className='font-bold uppercase text-sm flex items-center gap-1'
            >
              Blog <ChevronDown size={16} />
            </button>
            {isDropdownOpen && (
              <ul className='absolute top-full left-0 bg-white border rounded shadow-md mt-2 w-40 cursor-pointer'>
                {['Food', 'Technology', 'Business', 'Political'].map((category) => (
                  <li key={category}>
                    <Link
                      to={`/${category.toLowerCase()}`}
                      className='block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer'
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link to='/contactus' className='font-bold uppercase text-sm cursor-pointer'>Contact Us</Link>

          {/* Authenticated */}
          {isLoggedIn && (
            <>
              <Link to='/profile' className='font-bold uppercase text-sm cursor-pointer'>User Profile</Link>
              <button
                onClick={handleLogout}
                className='font-bold uppercase text-sm text-red-600 hover:underline cursor-pointer'
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile icon */}
        <button id='menu-toggle' className='md:hidden text-2xl cursor-pointer'>&#9776;</button>
      </div>
    </nav>
  )
}
