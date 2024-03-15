import { ReactNode } from "react"

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="home grid place-items-center overflow-auto">
      <div className="main-layout bg-white w-[1200px] rounded border-[12px] border-opacity-40 overflow-hidden">
        {children}
      </div>
    </div>
  )
}

export default RootLayout
