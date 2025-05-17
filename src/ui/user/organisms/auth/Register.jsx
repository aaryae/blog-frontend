import { UserRoundPlus } from 'lucide-react'

const Register = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-white px-6 pt-20'>
      <div className='w-full max-w-lg bg-white border border-gray-200 rounded-xl shadow-md p-8 space-y-6'>
        <div className='text-center'>
          <div className='text-5xl mb-2 w-fit mx-auto'>
            <UserRoundPlus size={48} strokeWidth={1.5} absoluteStrokeWidth />
          </div>
          <h2 className='text-2xl font-bold text-gray-800'>Create an Account</h2>
        </div>

        <form className='space-y-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium text-gray-700'>First Name</label>
              <input
                type='text'
                placeholder='John'
                className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
              />
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700'>Last Name</label>
              <input
                type='text'
                placeholder='Doe'
                className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
              />
            </div>
          </div>

          <div>
            <label className='text-sm font-medium text-gray-700'>Email</label>
            <input
              type='email'
              placeholder='you@example.com'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
            />
          </div>

          <div>
            <label className='text-sm font-medium text-gray-700'>Phone Number</label>
            <input
              type='tel'
              placeholder='+977 9800000000'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
            />
          </div>

          <div>
            <label className='text-sm font-medium text-gray-700'>Address</label>
            <input
              type='text'
              placeholder='City, Country'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
            />
          </div>

          <div>
            <label className='text-sm font-medium text-gray-700'>Password</label>
            <input
              type='password'
              placeholder='Enter a secure password'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
            />
          </div>

          <div>
            <label className='text-sm font-medium text-gray-700'>Nationality</label>
            <input
              type='text'
              placeholder='Nepali, Indian, etc.'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
            />
          </div>

          <div>
            <label className='text-sm font-medium text-gray-700'>About You</label>
            <textarea
              rows='3'
              placeholder='Tell us a bit about yourself...'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600 resize-none'
            ></textarea>
          </div>

          <div className='flex items-center gap-2'>
            <input type='checkbox' className='accent-red-600' />
            <label className='text-sm text-gray-700'>
              I agree to the{' '}
              <a href='#' className='text-red-600 underline'>
                Terms & Conditions
              </a>
            </label>
          </div>

          <button
            type='submit'
            className='w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded transition'
          >
            Register
          </button>

          <p className='text-sm text-center text-gray-600'>
            Already have an account?{' '}
            <a href='/login' className='text-red-600 hover:underline'>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
