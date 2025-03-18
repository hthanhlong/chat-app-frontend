export default function Loading() {
  return (
    <div className="fixed grid h-screen w-screen place-items-center bg-white">
      <div className="flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">Page Loading...</div>
        <div className="text-sm">Please wait...</div>
      </div>
    </div>
  )
}
