import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './ui/ProtectedRoute'
import ForgotPassword from './ui/user/organisms/auth/ForgotPassword'
import Login from './ui/user/organisms/auth/Login'
import Profile from './ui/user/organisms/auth/Profile'
import Register from './ui/user/organisms/auth/Register'
import CardDetails from './ui/user/organisms/CardDetails'
import ContactUs from './ui/user/organisms/ContactUs'
import BusinessPage from './ui/user/pages/BusinessPage'
import FoodPage from './ui/user/pages/FoodPage'
import LandingPage from './ui/user/pages/LandingPage'
import Politicalpage from './ui/user/pages/Politicalpage'
import TechnologyPage from './ui/user/pages/TechnologyPage'
import LandingTemplate from './ui/user/templates/Landing.Template'
import AddPost from './ui/common/AddPost'
import AdminTemplate from './ui/admin/templates/AdminTemplate'
import AdminRoute from './ui/admin/AdminRoute'
import AdminDashboard from './ui/admin/pages/AdminDashboard'
import AdminTable from './ui/admin/pages/AdminTable'
import ManageBlogs from './ui/admin/pages/ManageBlog'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingTemplate />,
    children: [
      { index: true, element: <LandingPage /> },

      {
        path: '/food',
        element: (
          // <ProtectedRoute>
            <FoodPage />
          // </ProtectedRoute>
        ),
      },
      {
        path: '/business',
        element: (
          // <ProtectedRoute>
            <BusinessPage />
          // </ProtectedRoute>
        ),
      },
      {
        path: '/technology',
        element: (
          // <ProtectedRoute>
            <TechnologyPage />
          // </ProtectedRoute>
        ),
      },
      {
        path: '/politics',
        element: (
          // <ProtectedRoute>
            <Politicalpage />
          // </ProtectedRoute>
        ),
      },
      {
        path: '/card-detail',
        element: (
          // <ProtectedRoute>
          <CardDetails />
          // </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          // <ProtectedRoute>
          <Profile />
          // </ProtectedRoute>
        ),
      },
      {
        path: '/addpost',
        element: (
          // <ProtectedRoute>
          <AddPost />
          // </ProtectedRoute>
        ),
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/contactus',
        element: <ContactUs />,
      },
    ],
  },
  {
    element:<AdminRoute/>,
   children:[
    {
      path:"/admin",
      element:<AdminTemplate/>,
      children:[
        {index:true, element:<AdminDashboard/>},
        {path:"users", element:<AdminTable/>},
        {path:"manage-blogs", element:<ManageBlogs/>},

      ]
    }
   ]
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position='bottom-right' reverseOrder={false} />
    </>
  )
}

export default App
