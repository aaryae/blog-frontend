import { CalendarDays, Globe, Info, Lock, Mail, MapPin, Pencil, Phone, Trash2, User2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import SecondHeading from '../../atoms/SecondHeading'
// import { updateUser, changePassword, deleteUser } from '../../services/user/userService' // Uncomment when backend is ready

const Profile = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const user = {
    id: '12345',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+977 9800000000',
    nationality: 'Nepali',
    address: 'Kathmandu, Nepal',
    about: 'Enthusiastic blogger passionate about technology, travel, and culture.',
    joined: 'March 10, 2024',
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting user...') // replace with: await deleteUser(user.id)
    }
  }

  // Form for Update Profile
  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    reset: resetUpdate,
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      nationality: user.nationality,
      address: user.address,
      about: user.about,
    },
  })

  const onUpdateSubmit = (data) => {
    console.log('Update data:', data)
    // await updateUser(user.id, data)
    setShowUpdateModal(false)
  }

  // Form for Change Password
  const { register: registerPassword, handleSubmit: handlePasswordSubmit, reset: resetPassword } = useForm()

  const onPasswordSubmit = (data) => {
    console.log('Password change data:', data)
    // await changePassword(user.email, data)
    setShowPasswordModal(false)
  }

  return (
    <div className='max-w-6xl mx-auto px-6 py-20'>
      <SecondHeading value='Your Profile' />

      {/* User Details */}
      <div className='rounded-xl space-y-6'>
        {/* Full Name */}
        <ProfileItem icon={<User2 size={24} />} label='Full Name' value={`${user.firstName} ${user.lastName}`} />
        <ProfileItem icon={<Mail size={24} />} label='Email' value={user.email} />
        <ProfileItem icon={<Phone size={24} />} label='Phone' value={user.phone} />
        <ProfileItem icon={<Globe size={24} />} label='Nationality' value={user.nationality} />
        <ProfileItem icon={<MapPin size={24} />} label='Address' value={user.address} />
        <ProfileItem icon={<Info size={24} />} label='About' value={user.about} />
        <ProfileItem icon={<CalendarDays size={24} />} label='Joined' value={user.joined} />

        {/* Action Buttons */}
        <div className='flex flex-wrap gap-3 pt-10'>
          <button
            onClick={() => setShowPasswordModal(true)}
            className='bg-white border-2 border-[#991010] text-[#991010] py-3 px-6 rounded-lg hover:-translate-y-1 hover:bg-[#991010] hover:text-white transition-all flex items-center gap-2'
          >
            <Lock size={18} /> Change Password
          </button>

          <button
            onClick={() => setShowUpdateModal(true)}
            className='bg-white border-2 border-[#991010] text-[#991010]  py-3 px-6 rounded-lg hover:-translate-y-1 hover:bg-[#991010] hover:text-white transition-all flex items-center gap-2'
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
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>First Name</label>
              <input
                {...registerUpdate('firstName')}
                placeholder='First Name'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#991010] focus:outline-none'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Last Name</label>
              <input
                {...registerUpdate('lastName')}
                placeholder='Last Name'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#991010] focus:outline-none'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Phone</label>
              <input
                {...registerUpdate('phone')}
                placeholder='Phone'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#991010] focus:outline-none'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Nationality</label>
              <input
                {...registerUpdate('nationality')}
                placeholder='Nationality'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#991010] focus:outline-none'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
              <input
                {...registerUpdate('address')}
                placeholder='Address'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#991010] focus:outline-none'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>About</label>
              <textarea
                {...registerUpdate('about')}
                placeholder='Tell us something about you...'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#991010] focus:outline-none resize-none min-h-[80px]'
              />
            </div>

            <div className='flex justify-end gap-3 pt-4'>
              <button
                type='submit'
                className='bg-[#991010] text-white py-3 px-6 rounded-lg hover:-translate-y-1 hover:bg-[#742e24] transition-all'
              >
                Save Changes
              </button>
              <button
                type='button'
                className='bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-all'
                onClick={() => setShowUpdateModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <Modal title='Change Password' onClose={() => setShowPasswordModal(false)}>
          <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Old Password</label>
              <input
                {...registerPassword('oldPassword')}
                type='password'
                placeholder='Enter current password'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#991010] focus:outline-none'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>New Password</label>
              <input
                {...registerPassword('newPassword')}
                type='password'
                placeholder='Enter new password'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#991010] focus:outline-none'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Confirm Password</label>
              <input
                {...registerPassword('confirmPassword')}
                type='password'
                placeholder='Re-enter new password'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#991010] focus:outline-none'
              />
            </div>

            <div className='flex justify-end gap-3 pt-4'>
              <button
                type='submit'
                className='bg-[#991010] text-white py-3 px-6 rounded-lg hover:-translate-y-1 hover:bg-[#742e24] transition-all'
              >
                Update Password
              </button>
              <button
                type='button'
                className='bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-all'
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

// Reusable Profile Row
const ProfileItem = ({ icon, label, value }) => (
  <div className='flex items-center gap-4 hover:bg-red-50 rounded-md px-2 py-2 transition'>
    <div className='bg-red-100 text-red-700 rounded-full p-3'>{icon}</div>
    <div>
      <p className='text-sm text-gray-500'>{label}</p>
      <p className='text-gray-800'>{value}</p>
    </div>
  </div>
)

// Reusable Modal Component
const Modal = ({ title, children, onClose }) => (
  <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center'>
    <div className='bg-white p-6 rounded-xl w-full max-w-md'>
      <h3 className='text-xl font-semibold mb-4'>{title}</h3>
      {children}
    </div>
  </div>
)

export default Profile
