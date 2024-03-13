import { RouterProvider } from "react-router-dom"
import { router } from "./routers"
import { LoadingComponent } from "./components"

const App = () => {
  return (
    <div className="relative">
      <RouterProvider router={router} />
      <LoadingComponent />
    </div>
  )
}

export default App
