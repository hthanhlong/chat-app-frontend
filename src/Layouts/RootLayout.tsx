import { ReactNode, useEffect } from 'react'
import { Flowbite, useThemeMode } from 'flowbite-react'
import { motion } from 'framer-motion'
import MenuProvider from '../provider/MenuProvider'

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
    <MenuProvider>
      <Flowbite>
        <div className="h-screen w-screen bg-gray-800 max-sm:overflow-hidden lg:flex lg:items-center lg:justify-center lg:p-2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="main-layout lg:mt-10 lg:h-[650px] lg:w-[1200px]"
          >
            <div className="flex h-full max-lg:flex-col lg:flex-row lg:shadow-lg">
              {children}
            </div>
          </motion.div>
        </div>
      </Flowbite>
    </MenuProvider>
  )
}

export default RootLayout
