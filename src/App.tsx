import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { router } from './routers'
import { LoadingComponent } from './components'
const App = () => {
  return (
    <>
      <div className="bg-image grid h-screen w-screen place-items-center">
        <LoadingComponent />
        <RouterProvider router={router} />
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          className: 'text-xs',
        }}
      />
    </>
  )
}

export default App
