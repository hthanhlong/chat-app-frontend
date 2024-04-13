import { motion } from 'framer-motion'
import CloseButton from '../CloseButton/CloseButton'
import { ReactNode } from 'react'
import { useShowMenu } from '../../hooks/useShowMenu'

const LeftContentLayout = ({ children }: { children: ReactNode }) => {
  const { scope, animate } = useShowMenu()

  const handleClickClose = () => {
    if (!scope && !animate) return
    // @ts-expect-error - animate
    animate(scope.current, {
      left: '-300px',
    })
  }

  return (
    <motion.div
      ref={scope}
      className="z-10 w-full max-w-[300px] border-r-[1px] border-gray-600 bg-gray-600 shadow-gray-500 dark:bg-black max-lg:fixed max-lg:-left-[300px] max-lg:top-0 max-lg:h-full"
    >
      <CloseButton handleClickClose={handleClickClose} />
      {children}
    </motion.div>
  )
}

export default LeftContentLayout
