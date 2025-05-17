const Heading = ({ value }) => {
  return (
    <div className='relative text-center py-10 pl-3 max-w-6xl mx-auto  overflow-hidden'>
      {/* Decorative line background */}
      <div className='absolute left-1/2 top-1/2    transform -translate-x-1/2 w-full h-1 bg-[#af4133]  ' />

      {/* Heading text */}
      <h1 className='relative z-10 inline-block bg-white px-6 text-3xl md:text-4xl font-extrabold text-gray-800 uppercase tracking-wide'>
        {value}
      </h1>
    </div>
  )
}

export default Heading
