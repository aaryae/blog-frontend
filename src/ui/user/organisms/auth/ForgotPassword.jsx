import { yupResolver } from '@hookform/resolvers/yup'
import { KeyRound } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { forgotPasswordSchema } from '../../../../config/schema/auth/forgotPassword.schema'

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  })

  const onSubmit = (data) => {
    console.log('📨 Send reset link to:', data.email)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-white px-6'>
      <div className='w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8 space-y-6'>
        <div className='text-center'>
          <div className='text-5xl mb-2 w-fit mx-auto text-red-700'>
            <KeyRound size={48} strokeWidth={1.5} absoluteStrokeWidth />
          </div>
          <h2 className='text-2xl font-bold text-gray-800'>Forgot Password</h2>
          <p className='text-sm text-gray-600 mt-1'>
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className='text-sm font-medium text-gray-700'>Email Address</label>
            <input
              type='email'
              {...register('email')}
              placeholder='you@example.com'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
            />
            <p className='text-sm text-red-500 mt-1'>{errors.email?.message}</p>
          </div>

          <button
            type='submit'
            className='w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded transition'
          >
            Send Reset Link
          </button>

          <p className='text-sm text-center text-gray-600'>
            Remember your password?{' '}
            <Link to='/login' className='text-red-600 hover:underline'>
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
