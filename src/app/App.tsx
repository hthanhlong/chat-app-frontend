import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AnimatePresence } from 'framer-motion'
import { router } from '../routers'
import { LoadingComponent } from '../components'

const App = () => {
  return (
    <div className="root-layout relative scroll-smooth">
      <AnimatePresence>
        <RouterProvider router={router} />
      </AnimatePresence>
      <LoadingComponent />
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default App
