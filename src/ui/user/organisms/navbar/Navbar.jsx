import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'
import Logo from '../../atoms/Logo'
import Sidebar from './Sidebar'

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const blogButtonRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        blogButtonRef.current &&
        !blogButtonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false)
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const handleLogout = () => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    localStorage.clear()
    if (rememberedEmail) {
      localStorage.setItem('rememberedEmail', rememberedEmail)
    }
    logout()
    navigate('/login')
  }

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Navbar */}
      <nav className="bg-white text-black/70 w-full fixed top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between py-4 px-4">
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            <Link to="/" className="font-bold uppercase text-sm">
              Home
            </Link>

            {/* Blog Dropdown */}
            <div
              className="relative"
              ref={blogButtonRef}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                type="button"
                className="font-bold uppercase text-sm flex items-center gap-1 cursor-pointer focus:outline-none"
                onClick={() => setIsDropdownOpen((v) => !v)}
                tabIndex={0}
                aria-haspopup="menu"
                aria-expanded={isDropdownOpen}
              >
                Blog <ChevronDown size={16} />
              </button>
              <ul
                className={`absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50
                  transition-all duration-200 ease-in-out
                  ${isDropdownOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'}
                `}
              >
                {['Food', 'Technology', 'Business', 'Politics'].map((category) => (
                  <li key={category}>
                    <Link
                      to={`/${category.toLowerCase()}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition duration-150 ease-in-out"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/contactus" className="font-bold uppercase text-sm">
              Contact Us
            </Link>

            {isLoggedIn && (
              <>
                <Link to="/profile" className="font-bold uppercase text-sm">
                  User Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="font-bold uppercase text-sm text-red-600 hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile icon */}
          <button
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
          >
            &#9776;
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
    </>
  )
}
