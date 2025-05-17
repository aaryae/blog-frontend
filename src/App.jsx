import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ForgotPassword from './ui/user/organisms/auth/ForgotPassword'
import Login from './ui/user/organisms/auth/Login'
import Register from './ui/user/organisms/auth/Register'
import ContactUs from './ui/user/organisms/ContactUs'
import BusinessPage from './ui/user/pages/BusinessPage'
import FoodPage from './ui/user/pages/FoodPage'
import LandingPage from './ui/user/pages/LandingPage'
import Politicalpage from './ui/user/pages/Politicalpage'
import TechnologyPage from './ui/user/pages/TechnologyPage'
import LandingTemplate from './ui/user/templates/Landing.Template'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingTemplate />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: '/food',
        element: <FoodPage />,
      },
      {
        path: '/business',
        element: <BusinessPage />,
      },
      {
        path: '/technology',
        element: <TechnologyPage />,
      },
      {
        path: '/political',
        element: <Politicalpage />,
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
])

function App() {
  return <RouterProvider router={router} />
}

export default App
