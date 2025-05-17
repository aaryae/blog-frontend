const SmallCard = ({ image, category, title, author, date, excerpt }) => {
  return (
    <div className='flex flex-col sm:flex-row gap-4  '>
      {/* Image */}
      <div className='w-full sm:w-1/3'>
        <div className='h-48 sm:h-full bg-gray-300 overflow-hidden rounded'>
          {image && <img src={image} alt={title} className='w-full h-full object-cover' />}
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-col justify-between w-full sm:w-2/3'>
        <div className='space-y-1'>
          <p className='text-pink-600 text-xs font-semibold uppercase'>{category}</p>
          <h2 className='text-lg font-bold text-gray-900'>{title}</h2>
          <p className='text-xs text-gray-500 font-semibold'>
            {author.toUpperCase()} • <span className='font-normal'>{date}</span>
          </p>
          <p className='text-sm text-gray-700 mt-2'>{excerpt}</p>
        </div>
      </div>
    </div>
  )
}

export default SmallCard
