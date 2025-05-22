import {
  CalendarDays, Info, Lock, Mail,
  MapPin, Pencil, Plus, Phone, User2
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import SecondHeading from '../../atoms/SecondHeading'
import {
  getUserById,
  updateUser,
  changePassword,
} from '../../../../services/user/userService'
import ProfileItem from '../../molecules/ProfileItem'
import Modal from '../../molecules/Modal'
import { Link } from 'react-router-dom'

// Import schemas with correct keys!
import {
  updateProfileSchema,
  changePasswordSchema
} from '../../../../config/schema/auth/profile.schema'

const USER_ID = localStorage.getItem('userId')

const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(USER_ID)
        setUser(data)
      } catch (err) {
        toast.error('❌ Failed to load user.')
        setError('Failed to load user.')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  // --- Update Profile Form ---
  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    reset: resetUpdate,
    formState: { errors: updateErrors }
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
  })

  // Make sure form fields always match API
  useEffect(() => {
    if (user) {
      resetUpdate({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        contactNumber: user.contactNumber || '',
        address: user.address || '',
        description: user.description || '',
      })
    }
  }, [user, resetUpdate])

  // Update profile and refresh user after update
  const onUpdateSubmit = async (data) => {
    try {
      await updateUser(USER_ID, data)
      const updatedUser = await getUserById(USER_ID)
      setUser(updatedUser)
      toast.success('✅ Profile updated successfully!')
      setShowUpdateModal(false)
    } catch (error) {
      toast.error('❌ Failed to update profile.')
    }
  }

  // --- Change Password Form ---
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors }
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  })

  const onPasswordSubmit = async (data) => {
    try {
      await changePassword(user.email, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      })
      toast.success('✅ Password changed successfully!')
      setShowPasswordModal(false)
    } catch (err) {
      toast.error('❌ Failed to change password.')
    }
  }

  if (loading) return <div className='p-8'>Loading...</div>
  if (error) return <div className='p-8 text-red-600'>{error}</div>

  return (
    <div className='max-w-6xl mx-auto px-6 py-20'>
      <SecondHeading value='Your Profile' />

      <div className='rounded-xl space-y-6'>
        <ProfileItem icon={<User2 size={24} />} label='Full Name' value={`${user.firstname} ${user.lastname}`} />
        <ProfileItem icon={<Mail size={24} />} label='Email' value={user.email} />
        <ProfileItem icon={<Phone size={24} />} label='Contact Number' value={user.contactNumber} />
        <ProfileItem icon={<MapPin size={24} />} label='Address' value={user.address} />
        <ProfileItem icon={<Info size={24} />} label='Description' value={user.description || 'loading...'} />
        <ProfileItem icon={<CalendarDays size={24} />} label='Joined' value={user.joined || 'may 28,2025'} />

        <div className='flex flex-wrap gap-3 pt-10'>
          <button
            onClick={() => setShowPasswordModal(true)}
            className='bg-white border-2 border-[#991010] text-[#991010] py-3 px-6 rounded-lg hover:-translate-y-1 hover:bg-[#991010] hover:text-white transition-all flex items-center gap-2'
          >
            <Lock size={18} /> Change Password
          </button>

          <button
            onClick={() => setShowUpdateModal(true)}
            className='bg-white border-2 border-[#991010] text-[#991010] py-3 px-6 rounded-lg hover:-translate-y-1 hover:bg-[#991010] hover:text-white transition-all flex items-center gap-2'
          >
            <Pencil size={18} /> Update Profile
          </button>

          <Link
            to="/addpost"
            className='bg-[#991010] text-white py-3 px-6 rounded-lg hover:-translate-y-1 hover:bg-[#742e24] transition-all flex items-center gap-2'
          >
            <Plus size={18} /> Add Post
          </Link>
        </div>
      </div>

      {/* --- Update Profile Modal --- */}
      {showUpdateModal && (
        <Modal title='Update Profile' onClose={() => setShowUpdateModal(false)}>
          <form onSubmit={handleUpdateSubmit(onUpdateSubmit)} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>First Name</label>
              <input
                {...registerUpdate('firstname')}
                placeholder='First Name'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#991010] focus:outline-none'
              />
              {updateErrors.firstname && (
                <p className="text-sm text-red-600 mt-1">{updateErrors.firstname.message}</p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Last Name</label>
              <input
                {...registerUpdate('lastname')}
                placeholder='Last Name'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#991010] focus:outline-none'
              />
              {updateErrors.lastname && (
                <p className="text-sm text-red-600 mt-1">{updateErrors.lastname.message}</p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Contact Number</label>
              <input
                {...registerUpdate('contactNumber')}
                placeholder='Contact Number'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#991010] focus:outline-none'
              />
              {updateErrors.contactNumber && (
                <p className="text-sm text-red-600 mt-1">{updateErrors.contactNumber.message}</p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
              <input
                {...registerUpdate('address')}
                placeholder='Address'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#991010] focus:outline-none'
              />
              {updateErrors.address && (
                <p className="text-sm text-red-600 mt-1">{updateErrors.address.message}</p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
              <textarea
                {...registerUpdate('description')}
                placeholder='Description'
                className='w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-[#991010] focus:outline-none min-h-[80px]'
              />
              {updateErrors.description && (
                <p className="text-sm text-red-600 mt-1">{updateErrors.description.message}</p>
              )}
            </div>
            <div className='flex justify-end gap-3 pt-4'>
              <button type='submit' className='bg-[#991010] text-white py-3 px-6 rounded-lg'>Save Changes</button>
              <button type='button' className='bg-gray-200 py-3 px-6 rounded-lg' onClick={() => setShowUpdateModal(false)}>Cancel</button>
            </div>
          </form>
        </Modal>
      )}

      {/* --- Change Password Modal --- */}
      {showPasswordModal && (
        <Modal title='Change Password' onClose={() => setShowPasswordModal(false)}>
          <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className='space-y-4'>
            {[{ label: 'Old Password', name: 'oldPassword' }, { label: 'New Password', name: 'newPassword' }, { label: 'Confirm Password', name: 'confirmPassword' }].map(({ label, name }) => (
              <div key={name}>
                <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
                <input
                  {...registerPassword(name)}
                  type='password'
                  placeholder={label}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#991010] focus:outline-none'
                />
                {passwordErrors[name] && (
                  <p className="text-sm text-red-600 mt-1">{passwordErrors[name]?.message}</p>
                )}
              </div>
            ))}
            <div className='flex justify-end gap-3 pt-4'>
              <button type='submit' className='bg-[#991010] text-white py-3 px-6 rounded-lg'>Update Password</button>
              <button type='button' className='bg-gray-200 py-3 px-6 rounded-lg' onClick={() => setShowPasswordModal(false)}>Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default Profile
