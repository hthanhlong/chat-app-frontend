import './LoadingComponent.css'
import { useLoading } from '../../hooks/useLoading'

const LoadingComponent = () => {
  const { isLoading } = useLoading()

  return (
    <>
      {isLoading ? (
        <>
          <div className="loader absolute z-10"></div>
          <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-blue-200 opacity-30"></div>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default LoadingComponent
