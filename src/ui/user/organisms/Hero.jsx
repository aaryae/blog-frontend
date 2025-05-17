const Hero = () => {
  return (
    <div className='max-w-6xl mx-auto pt-24'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 '>
        {/* Main Left Block */}
        <div className='lg:col-span-2 relative h-[30rem] bg-gray-300 rounded-lg flex flex-col justify-end p-6 text-white'>
          <span className='text-[#af4133]  font-bold text-xl uppercase mb-2 tracking-widest'>Title</span>
          <h2 className='text-2xl font-bold mb-2'>this is going to be heading </h2>
          <p className='text-sm font-semibold'>
            JOHN DOE • <span className='font-normal'>20 APRIL 2018</span>
          </p>
        </div>

        {/* Right Column */}
        <div className='flex flex-col gap-4'>
          {/* Top Right */}
          <div className='relative h-60 bg-gray-300 rounded-lg flex flex-col justify-end p-4 text-white'>
            <span className='text-[#af4133] font-bold text-xs uppercase mb-1 tracking-widest'>Lifestyle</span>
            <h3 className='text-base font-bold leading-snug'>Sed ut perspiciatis, unde omnis iste natus error sit</h3>
            <p className='text-xs mt-1 font-semibold'>
              JOHN DOE • <span className='font-normal'>20 APRIL 2018</span>
            </p>
          </div>

          {/* Bottom Right */}
          <div className='relative h-56 bg-gray-300 rounded-lg flex flex-col justify-end p-4 text-white'>
            <span className='text-[#af4133] font-bold text-xs uppercase mb-1 tracking-widest'>Fashion, Lifestyle</span>
            <h3 className='text-base font-bold leading-snug'>
              Mel ut impetus suscipit tincidunt. Cum id ullum laboramus persequeris.
            </h3>
            <p className='text-xs mt-1 font-semibold'>
              JOHN DOE • <span className='font-normal'>20 APRIL 2018</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
