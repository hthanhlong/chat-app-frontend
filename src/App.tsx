import { RouterProvider } from 'react-router-dom'
import { router } from './routers'
import { LoadingComponent } from './components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AnimatePresence } from 'framer-motion'

const App = () => {
  return (
    <div className="relative scroll-smooth">
      <AnimatePresence>
        <RouterProvider router={router} />
      </AnimatePresence>
      <LoadingComponent />
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default App
