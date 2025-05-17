const Heroblog = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%)',
      }}
    >
      {/* Triangle CSS inside the component */}
      <style>
        {`
          .triangle {
            width: 0;
            height: 0;
            border-style: solid;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-left: 10px solid #af4133;
            border-right: 0;
            position: absolute;
            right: -10px;
            bottom: -6px;
          }
        `}
      </style>

      <div className='py-24 pt-36 px-6 md:px-16 text-gray-800 max-w-7xl mx-auto tracking-wider'>
        <h1 className='text-3xl md:text-7xl font-bold mb-4 relative inline-block'>
          Let's Explore The{' '}
          <span className='relative inline-block border-b-2 border-[#af4133] pb-1 pr-4'>
            BLOG
            <span className='triangle' />
          </span>
        </h1>

        <br />
        <p className='text-md md:text-lg text-gray-600 w-1/2'>
          Dive into inspiring blog stories, trending topics, and fresh insights. Start your journey of discovery.
        </p>
      </div>
    </div>
  )
}

export default Heroblog
