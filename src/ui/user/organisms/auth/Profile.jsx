import { CalendarDays, Globe, Info, Mail, MapPin, Phone, User2 } from 'lucide-react'
import SecondHeading from '../../atoms/SecondHeading'

const Profile = () => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+977 9800000000',
    nationality: 'Nepali',
    address: 'Kathmandu, Nepal',
    about: 'Enthusiastic blogger passionate about technology, travel, and culture.',
    joined: 'March 10, 2024',
  }

  return (
    <div className='max-w-6xl mx-auto px-6 py-20'>
      <SecondHeading value='Your Profile' />

      {/* User Card */}
      <div className='rounded-xl space-y-6'>
        {/* Full Name */}
        <div className='flex items-center gap-4 hover:bg-red-50 rounded-md px-2 py-2 transition'>
          <div className='bg-red-100 text-red-700 rounded-full p-3'>
            <User2 size={24} />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Full Name</p>
            <p className='text-lg font-semibold text-gray-800'>
              {user.firstName} {user.lastName}
            </p>
          </div>
        </div>

        {/* Email */}
        <div className='flex items-center gap-4 hover:bg-red-50 rounded-md px-2 py-2 transition'>
          <div className='bg-red-100 text-red-700 rounded-full p-3'>
            <Mail size={24} />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Email</p>
            <p className='text-gray-800'>{user.email}</p>
          </div>
        </div>

        {/* Phone */}
        <div className='flex items-center gap-4 hover:bg-red-50 rounded-md px-2 py-2 transition'>
          <div className='bg-red-100 text-red-700 rounded-full p-3'>
            <Phone size={24} />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Phone</p>
            <p className='text-gray-800'>{user.phone}</p>
          </div>
        </div>

        {/* Nationality */}
        <div className='flex items-center gap-4 hover:bg-red-50 rounded-md px-2 py-2 transition'>
          <div className='bg-red-100 text-red-700 rounded-full p-3'>
            <Globe size={24} />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Nationality</p>
            <p className='text-gray-800'>{user.nationality}</p>
          </div>
        </div>

        {/* Address */}
        <div className='flex items-center gap-4 hover:bg-red-50 rounded-md px-2 py-2 transition'>
          <div className='bg-red-100 text-red-700 rounded-full p-3'>
            <MapPin size={24} />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Address</p>
            <p className='text-gray-800'>{user.address}</p>
          </div>
        </div>

        {/* About */}
        <div className='flex items-start gap-4 hover:bg-red-50 rounded-md px-2 py-2 transition'>
          <div className='bg-red-100 text-red-700 rounded-full p-3'>
            <Info size={24} />
          </div>
          <div>
            <p className='text-sm text-gray-500'>About</p>
            <p className='text-gray-800'>{user.about}</p>
          </div>
        </div>

        {/* Joined */}
        <div className='flex items-center gap-4 hover:bg-red-50 rounded-md px-2 py-2 transition'>
          <div className='bg-red-100 text-red-700 rounded-full p-3'>
            <CalendarDays size={24} />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Joined</p>
            <p className='text-gray-800'>{user.joined}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
