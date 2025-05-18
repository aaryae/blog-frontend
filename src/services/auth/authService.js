
import { axiosInstance } from "../../config/axios";

export const signUp = async (formData) => {
  const response = await axiosInstance.post('/user/auth/sign-up', formData)
  return response.data
}
