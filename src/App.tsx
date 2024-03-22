import { RouterProvider } from "react-router-dom"
import { router } from "./routers"
import { LoadingComponent } from "./components"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <div className="relative">
      <RouterProvider router={router} />
      <LoadingComponent />
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default App
