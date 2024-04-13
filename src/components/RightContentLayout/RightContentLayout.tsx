import { ReactNode } from 'react'
import Menu from '../Menu/Menu'
import { useShowMenu } from '../../hooks/useShowMenu'

const RightContentLayout = ({ children }: { children: ReactNode }) => {
  const { scope, animate } = useShowMenu()

  const handleClickOpen = () => {
    if (!scope && !animate) return
    // @ts-expect-error - animate
    animate(scope.current, {
      left: '0',
    })
  }

  return (
    <div className="flex-1 dark:bg-black max-lg:flex max-lg:min-h-screen">
      <Menu handleClickOpen={handleClickOpen} />
      {children}
    </div>
  )
}

export default RightContentLayout
