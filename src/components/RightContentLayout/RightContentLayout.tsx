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
    <div className="flex h-screen w-screen bg-white dark:bg-black">
      <Menu handleClickOpen={handleClickOpen} />
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default RightContentLayout
