import { KeyRound } from 'lucide-react'

const ForgotPassword = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-white px-6'>
      <div className='w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8 space-y-6'>
        {/* Header Icon + Title */}
        <div className='text-center'>
          <div className='text-5xl mb-2 w-fit mx-auto'>
            <KeyRound size={48} strokeWidth={1.5} absoluteStrokeWidth />
          </div>
          <h2 className='text-2xl font-bold text-gray-800'>Forgot Password</h2>
          <p className='text-sm text-gray-600 mt-1'>
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Form */}
        <form className='space-y-5'>
          <div>
            <label className='text-sm font-medium text-gray-700'>Email Address</label>
            <input
              type='email'
              placeholder='you@example.com'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded transition'
          >
            Send Reset Link
          </button>

          <p className='text-sm text-center text-gray-600'>
            Remember your password?{' '}
            <a href='/login' className='text-red-600 hover:underline'>
              Back to Login
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
