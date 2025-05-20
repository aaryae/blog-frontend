import { axiosInstance } from '../../config/axios'


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

//get blogs by catagory
export const getBlogsByCategory = async (categoryId) => {
  const res = await axiosInstance.get(`/post/getPostByCategoryForUser/${categoryId}`)
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

// Like blog post by ID
export const likeBlogPost = async (postId) => {
  const res = await axiosInstance.get(`/user/react/add/${postId}`)
  return res.data
}
