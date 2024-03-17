import "./LoadingComponent.css"
import { useLoading } from "../../hooks/useLoading"

const LoadingComponent = () => {
  const { isLoading } = useLoading()

  return (
    <>
      {isLoading ? (
        <>
          <div className="absolute loader z-10"></div>
          <div className="fixed bg-blue-200 top-0 right-0 left-0 bottom-0 opacity-30 flex items-center justify-center"></div>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default LoadingComponent
