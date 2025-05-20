// src/services/admin/adminService.js
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
