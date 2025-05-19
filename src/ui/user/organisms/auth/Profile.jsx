import {
  CalendarDays, Globe, Info, Lock, Mail,
  MapPin, Pencil, Phone, Trash2, User2
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import SecondHeading from '../../atoms/SecondHeading'
import {
  getUserById,
  updateUser,
  changePassword,
  deleteUser
} from '../../../../services/user/userService'
import ProfileItem from '../../molecules/ProfileItem'
import Modal from '../../molecules/Modal'

const USER_ID = 2 // Replace with auth context in real app

const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

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

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    reset: resetUpdate
  } = useForm()

  const onUpdateSubmit = async (data) => {
    try {
      const res = await updateUser(USER_ID, data)
      setUser(res)
      toast.success('✅ Profile updated successfully!')
      setShowUpdateModal(false)
    } catch (error) {
      toast.error('❌ Failed to update profile.')
    }
  }

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
  } = useForm()

  const onPasswordSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('❌ Passwords do not match.')
      return
    }

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

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete your account?')
    if (!confirmDelete) return

    try {
      await deleteUser(USER_ID)
      toast.success('✅ Account deleted successfully.')
      // redirect or logout
    } catch (err) {
      toast.error('❌ Failed to delete account.')
    }
  }

  useEffect(() => {
    if (user) {
      resetUpdate({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        nationality: user.nationality,
        address: user.address,
        about: user.about
      })
    }
  }, [user, resetUpdate])

  if (loading) return <div className='p-8'>Loading...</div>
  if (error) return <div className='p-8 text-red-600'>{error}</div>

  return (
    <div className='max-w-6xl mx-auto px-6 py-20'>
      <SecondHeading value='Your Profile' />

      <div className='rounded-xl space-y-6'>
        <ProfileItem icon={<User2 size={24} />} label='Full Name' value={`${user.firstName} ${user.lastName}`} />
        <ProfileItem icon={<Mail size={24} />} label='Email' value={user.email} />
        <ProfileItem icon={<Phone size={24} />} label='Phone' value={user.phone} />
        <ProfileItem icon={<Globe size={24} />} label='Nationality' value={user.nationality} />
        <ProfileItem icon={<MapPin size={24} />} label='Address' value={user.address} />
        <ProfileItem icon={<Info size={24} />} label='About' value={user.about} />
        <ProfileItem icon={<CalendarDays size={24} />} label='Joined' value={user.joined || 'N/A'} />

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

          <button
            onClick={handleDelete}
            className='bg-[#991010] text-white py-3 px-6 rounded-lg hover:-translate-y-1 hover:bg-[#742e24] transition-all flex items-center gap-2'
          >
            <Trash2 size={18} /> Delete Account
          </button>
        </div>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <Modal title='Update Profile' onClose={() => setShowUpdateModal(false)}>
          <form onSubmit={handleUpdateSubmit(onUpdateSubmit)} className='space-y-4'>
            {['firstName', 'lastName', 'phone', 'nationality', 'address'].map((field) => (
              <div key={field}>
                <label className='block text-sm font-medium text-gray-700 mb-1 capitalize'>{field}</label>
                <input
                  {...registerUpdate(field)}
                  placeholder={field}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#991010] focus:outline-none'
                />
              </div>
            ))}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>About</label>
              <textarea
                {...registerUpdate('about')}
                placeholder='About you...'
                className='w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-[#991010] focus:outline-none min-h-[80px]'
              />
            </div>
            <div className='flex justify-end gap-3 pt-4'>
              <button type='submit' className='bg-[#991010] text-white py-3 px-6 rounded-lg'>Save Changes</button>
              <button type='button' className='bg-gray-200 py-3 px-6 rounded-lg' onClick={() => setShowUpdateModal(false)}>Cancel</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Password Modal */}
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
