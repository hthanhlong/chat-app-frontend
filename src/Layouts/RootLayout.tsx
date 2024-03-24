import { ReactNode, useEffect } from "react"
import { Flowbite, useThemeMode, DarkThemeToggle } from "flowbite-react"

const RootLayout = ({ children }: { children: ReactNode }) => {
  const theme = useThemeMode()

  useEffect(() => {
    const home = document.querySelector(".home")
    if (!home) return
    const { mode } = theme
    if (mode === "dark") {
      home.classList.add("bg-black")
      home.classList.remove("bg-slate-600")
    } else {
      home.classList.remove("bg-black")
      home.classList.add("bg-slate-600")
    }
  }, [theme])

  return (
    <Flowbite>
      <div className="home grid place-items-center">
        <div className="main-layout bg-white w-[1200px] rounded border-[12px] border-opacity-40 overflow-hidden dark:bg-black dark:border-gray-700">
          {children}
        </div>
      </div>
      <DarkThemeToggle className="absolute right-5 top-5 z-30 border-2" />
    </Flowbite>
  )
}

export default RootLayout
