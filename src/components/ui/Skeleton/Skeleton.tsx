const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={`mr-1 flex h-[56px] flex-1 animate-pulse items-center p-1 dark:border-gray-700 ${
        className ? className : ''
      }`}
    >
      <svg
        className="me-3 h-10 w-10 text-gray-200 dark:text-gray-700"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
      <div className="flex-1">
        <div className="mb-2 h-2 w-[calc(100%-30px)] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  )
}

export default Skeleton
