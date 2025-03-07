import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { router } from './routers'
import { LoadingComponent } from './components'
const App = () => {
  return (
    <>
      <div className="bg-image grid h-screen w-screen place-items-center">
        <LoadingComponent />
        <RouterProvider router={router} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </>
  )
}

export default App
