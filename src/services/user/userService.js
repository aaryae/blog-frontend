import { axiosInstance } from '../../config/axios'

// Get user by ID
export const getUserById = async (userId) => {
  const response = await axiosInstance.get(`/user/getById/${userId}`)
  return response.data
}

// Find user by email
export const findUserByEmail = async (email) => {
  const response = await axiosInstance.get(`/user/findUserByEmail/${email}`)
  return response.data
}

// Update user by ID
export const updateUser = async (userId, updatedData) => {
  const response = await axiosInstance.post(`/user/update/${userId}`, updatedData)
  return response.data
}

// Change user password by email
export const changePassword = async (email, passwordData) => {
  const response = await axiosInstance.post(`/user/changePassword/${email}`, passwordData)
  return response.data
}

// Delete user by ID
export const deleteUser = async (userId) => {
  const response = await axiosInstance.get(`/user/delete/${userId}`)
  return response.data
}
