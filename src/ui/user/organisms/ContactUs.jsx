const ContactUs = () => {
  return (
    <div className='py-36 px-6 bg-white'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
        {/* Left: Info Section */}
        <div>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>Contact Us</h2>
          <p className='text-gray-600 mb-6'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste quaerat autem corrupti asperiores accusantium
            et fuga! Facere excepturi, quo eos, nobis doloremque dolor labore expedita illum iusto, aut repellat fuga!
          </p>

          <ul className='text-gray-700 space-y-4 text-sm'>
            <li className='flex items-start gap-2'>
              <span>📍</span>
              <span>
                34 Street Name, City Name Here,
                <br /> United States
              </span>
            </li>
            <li className='flex items-center gap-2'>
              <span>📞</span>
              <span>+1 (222) 345 6789</span>
            </li>
            <li className='flex items-center gap-2'>
              <span>✉️</span>
              <span>info@mywebsite.com</span>
            </li>
          </ul>
        </div>

        {/* Right: Contact Form */}
        <form className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
            <input
              type='text'
              placeholder='Your name'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input
              type='email'
              placeholder='you@example.com'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Message</label>
            <textarea
              rows='5'
              placeholder='Write your message here...'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
            ></textarea>
          </div>

          <div>
            <button className='bg-[#991010] text-white py-3 px-6 m-1 rounded-lg  hover:-translate-y-1 hover:bg-[#742e24] transition-all flex gap-2'>
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactUs
