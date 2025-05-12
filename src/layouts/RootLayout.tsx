import { ReactNode, useEffect } from 'react'
import { useThemeMode } from 'flowbite-react'
import { motion } from 'framer-motion'
import { MenuProvider } from '../core/provider'
import { Link } from 'react-router-dom'
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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border-[1px] border-gray-600"
      >
        <Link to="/">
          <div className="hidden border-b-[1px] border-gray-600 bg-white px-2 py-3 text-sm font-bold text-black lg:block lg:text-lg dark:bg-black dark:text-white">
            A5 CHAT APP
          </div>
        </Link>
        <div className="flex h-full w-full overflow-hidden shadow-lg lg:h-[650px] lg:w-[960px]">
          {children}
        </div>
      </motion.div>
    </MenuProvider>
  )
}

export default RootLayout
