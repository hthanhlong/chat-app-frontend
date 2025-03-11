import { ReactNode, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useShowMenu } from '../../../core/hooks'

const LeftContentLayout = ({ children }: { children: ReactNode }) => {
  const { scope, animate } = useShowMenu()

  const handleClickClose = () => {
    if (!scope && !animate) return
    // @ts-expect-error - animate
    animate(scope.current, {
      left: '-320px',
    })
  }

  useEffect(() => {
    const element = document.getElementById('chat-left')

    const handleClickGlobal = (event: MouseEvent) => {
      const properties = element?.getBoundingClientRect()
      if (
        (properties &&
          element &&
          !element.contains(event.target as Node) &&
          properties?.x === 1) ||
        properties?.x === 0
      ) {
        handleClickClose()
      }
    }

    document.addEventListener('click', handleClickGlobal)
    return () => {
      document.removeEventListener('click', handleClickGlobal)
    }
  }, [])

  return (
    <motion.div
      ref={scope}
      id="chat-left"
      className="fixed z-10 h-screen min-w-[320px] max-w-[320px] border-r-[1px] border-gray-600 bg-white shadow-gray-500 dark:bg-black lg:relative"
    >
      {children}
    </motion.div>
  )
}

export default LeftContentLayout
