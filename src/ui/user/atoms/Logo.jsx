import { Box } from 'lucide-react'

const Logo = () => {
  return (
    // <Link to='/'>
    <div className={`flex justify-center items-center w-fit p-1 gap-2 cursor-pointer `}>
      <Box size={28} color='#af4133' />
      <h1 className='font-extrabold tracking-wide text-xl font-sans '>THEBLOG</h1>
    </div>
    // </Link>
  )
}

export default Logo
