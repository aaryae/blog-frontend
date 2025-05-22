import { yupResolver } from '@hookform/resolvers/yup'
import { UserRoundPlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../../../../services/auth/authService'
import { registerSchema } from "../../../../config/schema/auth/register.schema"
import toast from 'react-hot-toast'

const Register = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  })

  const onSubmit = async (data) => {
    // Remove validation-only fields before sending
    const payload = { ...data }
    delete payload.confirmPassword
    delete payload.acceptTerms
    try {
      await signUp(payload)
      toast.success('🎉 Registration successful!')
      navigate('/login')
    } catch (error) {
      const message = error?.response?.data?.message || 'Registration failed. Please try again.'
      toast.error(`❌ ${message}`)
      console.error('❌ Registration failed:', message)
    }
  }

  return (
    <div className='flex items-center justify-center bg-white pt-40 py-20'>
      <div className='w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow p-10 space-y-6'>
        {/* Header */}
        <div className='text-center'>
          <div className='text-5xl mb-2 w-fit mx-auto text-red-700'>
            <UserRoundPlus size={48} strokeWidth={1.5} />
          </div>
          <h2 className='text-2xl font-bold text-gray-800'>Create an Account</h2>
        </div>

        {/* Form */}
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {/* First + Last Name */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium text-gray-700'>First Name</label>
              <input
                {...register('firstname')}
                placeholder='John'
                className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
              />
              <p className='text-red-500 text-sm'>{errors.firstname?.message}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700'>Last Name</label>
              <input
                {...register('lastname')}
                placeholder='Doe'
                className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
              />
              <p className='text-red-500 text-sm'>{errors.lastname?.message}</p>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className='text-sm font-medium text-gray-700'>Email</label>
            <input
              {...register('email')}
              placeholder='you@example.com'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
            />
            <p className='text-red-500 text-sm'>{errors.email?.message}</p>
          </div>

          {/* Contact Number + Address */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium text-gray-700'>Contact Number</label>
              <input
                {...register('contactNumber')}
                placeholder='+977 9800000000'
                className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
              />
              <p className='text-red-500 text-sm'>{errors.contactNumber?.message}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700'>Address</label>
              <input
                {...register('address')}
                placeholder='City, Country'
                className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
              />
              <p className='text-red-500 text-sm'>{errors.address?.message}</p>
            </div>
          </div>

          {/* Password + Confirm Password */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium text-gray-700'>Password</label>
              <input
                type='password'
                {...register('password')}
                placeholder='Create a password'
                className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
              />
              <p className='text-red-500 text-sm'>{errors.password?.message}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700'>Confirm Password</label>
              <input
                type='password'
                {...register('confirmPassword')}
                placeholder='Repeat your password'
                className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
              />
              <p className='text-red-500 text-sm'>{errors.confirmPassword?.message}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className='text-sm font-medium text-gray-700'>About You</label>
            <textarea
              rows='3'
              {...register('description')}
              placeholder='Tell us a bit about yourself...'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600 resize-none'
            ></textarea>
            <p className='text-red-500 text-sm'>{errors.description?.message}</p>
          </div>

          {/* Terms */}
          <div className='flex items-start gap-2'>
            <input type='checkbox' {...register('acceptTerms')} className='accent-red-600 mt-1' />
            <label className='text-sm text-gray-700'>
              I agree to the{' '}
              <a href='#' className='text-red-600 underline'>
                Terms & Conditions
              </a>
            </label>
          </div>
          <p className='text-red-500 text-sm'>{errors.acceptTerms?.message}</p>

          {/* Submit */}
          <button
            type='submit'
            className='w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded transition'
          >
            Register
          </button>

          {/* Already registered */}
          <p className='text-sm text-center text-gray-600'>
            Already have an account?{' '}
            <Link to='/login' className='text-red-600 hover:underline'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
