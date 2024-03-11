import { createBrowserRouter } from "react-router-dom"
import { ErrorPage, Home, Login } from "../pages"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
])
