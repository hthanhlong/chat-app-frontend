import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./routers"
import "./index.css"
import AuthProvider from "./provider/AuthProvider"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
