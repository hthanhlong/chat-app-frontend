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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex h-full w-full overflow-hidden shadow-lg lg:h-[650px] lg:w-[960px]">
            {children}
          </div>
        </motion.div>
      </Flowbite>
    </MenuProvider>
  )
}

export default RootLayout
