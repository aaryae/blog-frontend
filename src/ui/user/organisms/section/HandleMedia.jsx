import Heading from '../../atoms/Heading'

const HandleMedia = () => {
  const categories = [
    { name: 'Food', count: 451 },
    { name: 'Political', count: 230 },
    { name: 'Technology', count: 40 },
    { name: 'Business', count: 38 },
    { name: 'Others', count: 24 },
    { name: 'Total', count: 24 },
  ]

  return (
    <div className='space-y-8 px-4 pt-6 w-full h-full flex flex-col justify-between'>
      {/* SOCIAL MEDIA */}
      <div>
        {/* <Heading value='Media' /> */}
        <div className='flex gap-2 '>
          <div className='flex-1 bg-[#3b5998] text-white text-center py-4 rounded'>
            <i className='fab fa-facebook-f text-xl'></i>
            <p className='mt-2 text-sm font-semibold'>21.2K</p>
            <p className='text-xs'>Followers</p>
          </div>
          <div className='flex-1 bg-[#00acee] text-white text-center py-4 rounded'>
            <i className='fab fa-twitter text-xl'></i>
            <p className='mt-2 text-sm font-semibold'>10.2K</p>
            <p className='text-xs'>Followers</p>
          </div>
          <div className='flex-1 bg-[#db4437] text-white text-center py-4 rounded'>
            <i className='fab fa-google-plus-g text-xl'></i>
            <p className='mt-2 text-sm font-semibold'>5K</p>
            <p className='text-xs'>Followers</p>
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div>
        <Heading value='categories' />
        {/* <h1 className='text-4xl font-bold pb-4 text-center'>CATEGORIES</h1> */}
        <ul className='text-sm text-gray-800 space-y-2'>
          {categories.map((cat, idx) => (
            <li key={idx} className='flex justify-between border-b pb-1 last:border-none last:pb-0'>
              <span className='font-medium py-2'>{cat.name.toUpperCase()}</span>
              <span className='py-2'>{cat.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HandleMedia
