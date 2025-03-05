import './LoadingComponent.css'
import { useLoading } from '../../hooks/useLoading'

const LoadingComponent = () => {
  const { isLoading } = useLoading()

  return (
    <>
      {isLoading && (
        <div className="fixed z-50 h-screen w-screen bg-gray-800 bg-opacity-50">
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="loader"></div>
          </div>
        </div>
      )}
    </>
  )
}

export default LoadingComponent
