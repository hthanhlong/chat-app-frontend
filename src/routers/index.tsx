import { ErrorPage, Home, Login } from "../pages"
import { createBrowserRouter } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"

// Define public routes accessible to all users
const routesForPublic = [
  {
    path: "/login",
    element: <Login />,
  },
]

// Define routes accessible only to authenticated users
const routesForAuthenticatedOnly = [
  {
    path: "/",
    element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]

export const router = createBrowserRouter([
  ...routesForPublic,
  ...routesForAuthenticatedOnly,
])
