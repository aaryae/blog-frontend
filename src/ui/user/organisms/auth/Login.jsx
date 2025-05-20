import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, UserRound } from 'lucide-react'
import { useAuth } from '../../../../context/AuthContext'
import { loginSchema } from '../../../../config/schema/auth/login.schema'
import { signIn } from '../../../../services/auth/authService'
import toast from 'react-hot-toast'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  // On mount, pre-fill email if remembered
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail')
    if (savedEmail) {
      setValue('email', savedEmail)
      setRememberMe(true)
    }
  }, [setValue])

const onSubmit = async (data) => {
  console.log(data)
  try {
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', data.email)
    } else {
      localStorage.removeItem('rememberedEmail')
    }

    const result = await signIn(data)

    // Save data to localStorage
    localStorage.setItem('accessToken', result.token)
    localStorage.setItem('refreshToken', result.refreshToken)
    localStorage.setItem('role', result.roles)
    localStorage.setItem('userId', result.userId)

    login(result.token)

    toast.success('🎉 Login successful!')

    if (result.roles === 'ADMIN') {
      navigate('/admin')
    } else {
      navigate('/')
    }

  } catch (error) {
    console.error('Login error:', error)
    toast.error('❌ Invalid email or password.')
  }
}


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-6'>
      <div className='w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8 space-y-6'>
        {/* Header Icon + Title */}
        <div className='text-center'>
          <div className='text-4xl mb-2 mx-auto w-fit text-red-700'>
            <UserRound size={42} strokeWidth={1.5} />
          </div>
          <h2 className='text-2xl font-bold text-gray-800'>Member Login</h2>
        </div>

        {/* Login Form */}
        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input
              type='email'
              {...register('email')}
              placeholder='you@example.com'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
            />
            <p className='text-sm text-red-500'>{errors.email?.message}</p>
          </div>

          {/* Password with Eye Toggle */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder='Enter your password'
                className='w-full border border-gray-300 px-4 py-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-red-600'
              />
              <span
                className='absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500'
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            <p className='text-sm text-red-500'>{errors.password?.message}</p>
          </div>

          {/* Remember Me + Forgot Password */}
          <div className='flex items-center justify-between text-sm text-gray-600'>
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className='accent-red-600'
              />
              Remember me
            </label>
            <Link to='/forgot-password' className='text-red-600 hover:underline'>
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded transition'
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Register Link */}
        <p className='text-sm text-center text-gray-600'>
          Don’t have an account?{' '}
          <Link to='/register' className='text-red-600 hover:underline'>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
