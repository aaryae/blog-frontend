 const ProfileItem = ({ icon, label, value }) => (
  <div className='flex items-center gap-4 hover:bg-red-50 rounded-md px-2 py-2 transition'>
    <div className='bg-red-100 text-red-700 rounded-full p-3'>{icon}</div>
    <div>
      <p className='text-sm text-gray-500'>{label}</p>
      <p className='text-gray-800'>{value}</p>
    </div>
  </div>
)
export default ProfileItem;