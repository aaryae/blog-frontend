import { useEffect, useState } from 'react'
import { ShieldCheck, UserCircle2 } from 'lucide-react'
import {
  getAllUsers,
  getUsersByStatus,
} from '../../../services/admin/adminService'
import toast from 'react-hot-toast'

const AdminTable = () => {
  const [users, setUsers] = useState([])
  const [statusFilter, setStatusFilter] = useState('ALL')

  const fetchUsers = async () => {
    try {
      const data =
        statusFilter === 'ALL'
          ? await getAllUsers()
          : await getUsersByStatus(statusFilter)
      setUsers(data)
    } catch (err) {
      console.error('Failed to load users:', err)
      toast.error('❌ Could not fetch users')
    }
  }

  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line
  }, [statusFilter])

  return (
    <div className='bg-white rounded-xl shadow-lg p-6 w-full'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold'>User Management</h2>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className='border border-gray-300 px-3 py-1 rounded-md text-sm'
        >
          <option value='ALL'>All Status</option>
          <option value='ACTIVE'>Active</option>
        </select>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto border border-gray-200'>
          <thead>
            <tr className='bg-gray-100 text-sm text-gray-700 uppercase tracking-wider'>
              <th className='px-4 py-3 text-left'>#</th>
              <th className='px-4 py-3 text-left'>Name</th>
              <th className='px-4 py-3 text-left'>Email</th>
              <th className='px-4 py-3 text-left'>Role</th>
              <th className='px-4 py-3 text-left'>Status</th>
              <th className='px-4 py-3 text-left'>Contact</th>
              <th className='px-4 py-3 text-left'>Address</th>
              <th className='px-4 py-3 text-left'>Description</th>
              {/* No Actions column needed */}
            </tr>
          </thead>
          <tbody className='text-sm text-gray-700'>
            {users.map((user, index) => (
              <tr key={user.id} className='border-t'>
                <td className='px-4 py-3'>{index + 1}</td>
                <td className='px-4 py-3 flex items-center gap-2'>
                  <UserCircle2 className='text-gray-500' size={18} />
                  {(user.firstname || '') + ' ' + (user.lastname || '')}
                </td>
                <td className='px-4 py-3'>{user.email}</td>
                <td className='px-4 py-3'>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      user.role === 'ADMIN'
                        ? 'bg-gray-200 text-gray-900'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    <ShieldCheck size={14} />
                    {user.role}
                  </span>
                </td>
                <td className='px-4 py-3'>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className='px-4 py-3'>{user.contactNumber || '—'}</td>
                <td className='px-4 py-3'>{user.address || '—'}</td>
                <td className='px-4 py-3'>{user.description || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminTable
