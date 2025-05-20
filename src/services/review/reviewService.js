import { axiosInstance } from '../../config/axios'

// Add a new review/comment
export const addReview = async (payload) => {
  const res = await axiosInstance.post('/review/add', payload)
  return res.data
}

// Get all comments for a specific post
export const getCommentsByPost = async (postId) => {
  const res = await axiosInstance.get(`/review/getCommentByPost/${postId}`)
  return res.data
}

// Delete a comment by ID
export const deleteReview = async (id) => {
  const res = await axiosInstance.get(`/review/delete/${id}`)
  return res.data
}
