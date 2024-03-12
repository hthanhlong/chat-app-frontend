import { ErrorPage, Home, Login, SignUp } from "../pages"
import { createBrowserRouter } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"

const routesForPublic = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]

const routesForAuthenticatedOnly = [
  {
    path: "/",
    element: <ProtectedRoute />,
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
