import { useRouteError } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NotFound from './NotFound'

interface ErrorPage extends Error {
  statusText: string
  message: string
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorPage

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-700 text-white">
      {error.statusText === 'Not Found' ? (
        <NotFound />
      ) : (
        <div>
          <h1 className="text-8xl font-bold">Oops!</h1>
          <p className="text-2xl">Sorry, something went wrong.</p>
        </div>
      )}
      <Link
        to="/"
        className="mt-4 text-2xl text-blue-500 transition-all hover:scale-110 hover:text-blue-700"
      >
        Back to home
      </Link>
    </div>
  )
}
