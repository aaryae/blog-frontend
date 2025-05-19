import { axiosInstance } from '../../config/axios'

export const addBlogPost = async (formData) => {
  const response = await axiosInstance.post('/user/react/post/add', formData)
  return response.data
}
