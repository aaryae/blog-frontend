const SecondHeading = ({ value }) => {
  return (
    <div className=' py-10 px-3 max-w-6xl mx-auto'>
      {/* Heading text */}
      <h1 className='text-3xl md:text-6xl font-extrabold text-gray-800 uppercase tracking-wide inline-block relative'>
        {value}
        <div className='mt-2 h-1 w-full bg-[#af4133]'></div>
      </h1>
    </div>
  )
}

export default SecondHeading
