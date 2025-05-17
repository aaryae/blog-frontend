import { yupResolver } from '@hookform/resolvers/yup'
import { UserRound } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'

// ✅ Validation Schema
const schema = yup.object().shape({
  username: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
})

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log('✅ Login data:', data)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-white px-6'>
      <div className='w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8 space-y-6'>
        {/* Icon */}
        <div className='text-center'>
          <div className='text-5xl mb-2 mx-auto w-fit text-red-700'>
            <UserRound size={48} strokeWidth={1.5} />
          </div>
          <h2 className='text-2xl font-bold text-gray-800'>Member Login</h2>
        </div>

        {/* Form */}
        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input
              type='text'
              {...register('username')}
              placeholder='you@example.com'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
            />
            <p className='text-sm text-red-500'>{errors.username?.message}</p>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <input
              type='password'
              {...register('password')}
              placeholder='Enter your password'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
            />
            <p className='text-sm text-red-500'>{errors.password?.message}</p>
          </div>

          <div className='flex items-center justify-between text-sm text-gray-600'>
            <label className='flex items-center gap-2'>
              <input type='checkbox' className='accent-red-600' />
              Remember me
            </label>
            <Link to='/forgot-password' className='text-red-600 hover:underline'>
              Forgot password?
            </Link>
          </div>

          <button
            type='submit'
            className='w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded transition'
          >
            LOGIN
          </button>

          <p className='text-sm text-center text-gray-600'>
            Don’t have an account?{' '}
            <Link to='/register' className='text-red-600 hover:underline'>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
