import { axiosInstance } from '../../config/axios'

// Get all users
export const getAllUsers = async () => {
  const response = await axiosInstance.get('/user/admin/getAll')
  return response.data
}

// Optional: Other admin endpoints (ready to be used later)
export const verifyUser = async (userId) => {
  const response = await axiosInstance.get(`/user/admin/verifyUser/${userId}`)
  return response.data
}

export const getUsersByStatus = async (status) => {
  const response = await axiosInstance.get(`/user/admin/getByStatus/${status}`)
  return response.data
}

export const filterUsersByDate = async (payload) => {
  const response = await axiosInstance.post(`/api/user/admin/filterByDate`, payload)
  return response.data
}
