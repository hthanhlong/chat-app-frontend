import { ErrorPage, Home, Login, SignUp } from '../pages'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import Settings from '../pages/settings/Settings'

const routesForPublic = [
  {
    path: '/sign-in',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
]

const routesForAuthenticatedOnly = [
  {
    path: '/',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
]

export const router = createBrowserRouter([
  ...routesForPublic,
  ...routesForAuthenticatedOnly,
])
