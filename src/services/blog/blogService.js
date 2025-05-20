import { axiosInstance } from '../../config/axios'

// Fetch all categories
export const getAllCategories = async () => {
  const res = await axiosInstance.get('/category/getAllcategory')
  return res.data
}

// Add a new category
export const addCategory = async (payload) => {
  const res = await axiosInstance.post('/category/add', payload)
  return res.data
}

// Add a new blog post (admin)
export const addBlogPost = async (formData) => {
  const res = await axiosInstance.post('/user/react/post/add', formData)
  return res.data
}

// Fetch all blogs (for public/unauthorized)
export const getAllBlogs = async () => {
  const res = await axiosInstance.get('/post/postForUnauthorized')
  return res.data
}



// Delete blog by ID
export const deleteBlog = async (postId) => {
  const res = await axiosInstance.get(`/post/delete/${postId}`)
  return res.data
}

// Filter by title (for search)
export const filterBlogsByTitle = async (keyword) => {
  const res = await axiosInstance.get(`/post/filterByTitle/${keyword}`)
  return res.data
}
