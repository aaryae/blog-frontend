import { Box } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='bg-[#111] text-white py-10 mt-16'>
      <div className='max-w-6xl mx-auto  px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
        {/* Logo + Intro */}
        <div>
          <div className={`flex justify-center items-center w-fit p-1 gap-2 cursor-pointer `}>
            <Box size={28} color='#ffffff' />
            <h1 className='font-extrabold tracking-wide text-xl font-sans text-[#af4133] '>THEBLOG</h1>
          </div>{' '}
          <p className='text-sm mt-2 text-gray-300'>
            Curated stories, thoughts and insights for the curious mind. Stay updated and inspired.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className='text-md font-semibold mb-3'>Explore</h3>
          <ul className='space-y-2 text-sm text-gray-400'>
            <li>
              <a href='/' className='hover:text-white transition'>
                Home
              </a>
            </li>
            <li>
              <a href='/food' className='hover:text-white transition'>
                Food
              </a>
            </li>
            <li>
              <a href='/political' className='hover:text-white transition'>
                Politics
              </a>
            </li>
            <li>
              <a href='/business' className='hover:text-white transition'>
                Business
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className='text-md font-semibold mb-3'>Contact</h3>
          <ul className='space-y-2 text-sm text-gray-400'>
            <li>Email: contact@theblog.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Location: London, UK</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className='text-md font-semibold mb-3'>Follow Us</h3>
          <div className='flex gap-4'>
            <a href='https://facebook.com' target='_blank' className='hover:text-[#af4133] transition'>
              <i className='fab fa-facebook-f'></i> Facebook
            </a>
            <a href='https://instagram.com' target='_blank' className='hover:text-[#af4133] transition'>
              <i className='fab fa-instagram'></i> Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className='text-center text-sm text-gray-500 mt-8'>
        &copy; {new Date().getFullYear()} THEBLOG. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
