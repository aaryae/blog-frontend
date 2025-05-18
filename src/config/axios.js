import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Optional: Add interceptors for auth or error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global error messages here
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)
