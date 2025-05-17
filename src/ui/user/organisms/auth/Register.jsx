import { yupResolver } from '@hookform/resolvers/yup'
import { UserRoundPlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'

// ✅ Validation Schema
const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  nationality: yup.string().required('Nationality is required'),
  about: yup.string().required('Please write something about yourself'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm your password'),
  acceptTerms: yup.bool().oneOf([true], 'You must accept Terms & Conditions'),
})

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log('✅ Registered user:', data)
  }

  return (
    <div className=' flex items-center justify-center bg-white pt-40 py-20'>
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
                {...register('firstName')}
                placeholder='John'
                className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
              />
              <p className='text-red-500 text-sm'>{errors.firstName?.message}</p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700'>Last Name</label>
              <input
                {...register('lastName')}
                placeholder='Doe'
                className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
              />
              <p className='text-red-500 text-sm'>{errors.lastName?.message}</p>
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

          {/* Phone + Address */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium text-gray-700'>Phone Number</label>
              <input
                {...register('phone')}
                placeholder='+977 9800000000'
                className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
              />
              <p className='text-red-500 text-sm'>{errors.phone?.message}</p>
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

          {/* Nationality */}
          <div>
            <label className='text-sm font-medium text-gray-700'>Nationality</label>
            <input
              {...register('nationality')}
              placeholder='Nepali, Indian, etc.'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600'
            />
            <p className='text-red-500 text-sm'>{errors.nationality?.message}</p>
          </div>

          {/* About */}
          <div>
            <label className='text-sm font-medium text-gray-700'>About You</label>
            <textarea
              rows='3'
              {...register('about')}
              placeholder='Tell us a bit about yourself...'
              className='w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600 resize-none'
            ></textarea>
            <p className='text-red-500 text-sm'>{errors.about?.message}</p>
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
