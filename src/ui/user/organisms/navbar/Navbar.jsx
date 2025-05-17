import Logo from '../../atoms/Logo'

export default function Navbar() {
  return (
    <nav
      className='bg-[white]
     text-[#000000af] w-full fixed top-0 z-40 shadow-md  '
    >
      <div className='max-w-6xl mx-auto w-full flex gap-8 items-center justify-between py-4 '>
        <Logo />
        <button id='menu-toggle' className='md:hidden text-2xl'>
          &#9776;
        </button>
        <div className='hidden md:flex'>
          <ul className='flex gap-7'>
            {['Home', 'Food', 'Political', 'Business', 'Technology', 'Contact Us'].map((item) => {
              const isHome = item === 'Home'
              const link = isHome ? '/' : `/${item.toLowerCase().replace(' ', '')}`

              return (
                <li key={item} className='font-bold uppercase text-sm'>
                  <a href={link}>{item}</a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
