import './LoadingComponent.css'
import { useLoading } from '../../hooks/useLoading'

const LoadingComponent = () => {
  const { isLoading } = useLoading()

  return (
    <>
      {isLoading && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-blue-200 bg-opacity-30">
          <div className="loader"></div>
        </div>
      )}
    </>
  )
}

export default LoadingComponent
