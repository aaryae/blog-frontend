import { axiosInstance } from '../../config/axios'

// Register (Sign-Up)
export const signUp = async (formData) => {
  const response = await axiosInstance.post('/user/auth/sign-up', formData)
  return response.data
}

// Login (Sign-In)
export const signIn = async (credentials) => {
  const response = await axiosInstance.post('/user/auth/sign-in', credentials)
  return response.data
}
