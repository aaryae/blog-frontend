import { yupResolver } from '@hookform/resolvers/yup'
import { UserRound } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema } from '../../../../config/schema/auth/login.schema'
import { signIn } from '../../../../services/auth/authService'

const Login = () => {
  const navigate = useNavigate()

  const { register, handleSubmit,formState: { errors },} = useForm({resolver: yupResolver(loginSchema), })

  const onSubmit = async (data) => {
    try {
      const result = await signIn(data)
      console.log('✅ Login success:', result)

      // Optionally store JWT in localStorage or context
      localStorage.setItem('token', result.token)

      // Redirect to dashboard/home page
      navigate('/')
    } catch (error) {
      console.error('❌ Login failed:', error.response?.data?.message || error.message)
      alert('Login failed. Please check your credentials.')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-white px-6'>
      <div className='w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8 space-y-6'>
        {/* Icon & Title */}
        <div className='text-center'>
          <div className='text-5xl mb-2 mx-auto w-fit text-red-700'>
            <UserRound size={48} strokeWidth={1.5} />
          </div>
          <h2 className='text-2xl font-bold text-gray-800'>Member Login</h2>
        </div>

        {/* Login Form */}
        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
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

          {/* Password */}
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

          {/* Remember me & Forgot password */}
          <div className='flex items-center justify-between text-sm text-gray-600'>
            <label className='flex items-center gap-2'>
              <input type='checkbox' className='accent-red-600' />
              Remember me
            </label>
            <Link to='/forgot-password' className='text-red-600 hover:underline'>
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type='submit'
            className='w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded transition'
          >
            LOGIN
          </button>

          {/* Register Link */}
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
