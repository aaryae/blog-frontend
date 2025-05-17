import { UserRound } from 'lucide-react'

const Login = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-white px-6'>
      <div className='w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8 space-y-6'>
        {/* Icon */}
        <div className='text-center'>
          <div className='text-5xl mb-2 mx-auto w-fit'>
            <UserRound size={48} strokeWidth={1.5} absoluteStrokeWidth />
          </div>
          <h2 className='text-2xl font-bold text-gray-800'>Member Login</h2>
        </div>

        {/* Form */}
        <form className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Username</label>
            <input
              type='text'
              placeholder='Enter your username'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <input
              type='password'
              placeholder='Enter your password'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
            />
          </div>

          <div className='flex items-center justify-between text-sm text-gray-600'>
            <label className='flex items-center gap-2'>
              <input type='checkbox' className='accent-red-600' />
              Remember me
            </label>
            <a href='#' className='text-red-600 hover:underline'>
              Forgot password?
            </a>
          </div>

          <button
            type='submit'
            className='w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded transition'
          >
            LOGIN
          </button>

          <p className='text-sm text-center text-gray-600'>
            Don’t have an account?{' '}
            <a href='/register' className='text-red-600 hover:underline'>
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
