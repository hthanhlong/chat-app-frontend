import { RouterProvider } from "react-router-dom"
import { router } from "./routers"
import { LoadingComponent } from "./components"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import WsService from "./services/WsService"
import { useAuth } from "./hooks/useAuth"
import { useEffect } from "react"

const App = () => {
  const { id } = useAuth()

  useEffect(() => {
    const ws = new WsService()
    ws.connect()
  }, [id])

  return (
    <div className="relative">
      <RouterProvider router={router} />
      <LoadingComponent />
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default App
