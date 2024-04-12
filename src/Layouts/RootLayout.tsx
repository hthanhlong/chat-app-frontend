import { ReactNode, useEffect } from 'react'
import { Flowbite, useThemeMode } from 'flowbite-react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  const theme = useThemeMode()

  useEffect(() => {
    const home = document.querySelector('.home')
    if (!home) return
    const { mode } = theme
    if (mode === 'dark') {
      home.classList.add('bg-black')
      home.classList.remove('bg-slate-600')
    } else {
      home.classList.remove('bg-black')
      home.classList.add('bg-slate-600')
    }
  }, [theme])

  return (
    <Flowbite>
      <div className="h-screen w-screen bg-gray-800 lg:flex lg:items-center lg:justify-center lg:p-2">
        {children}
      </div>
    </Flowbite>
  )
}

export default RootLayout
