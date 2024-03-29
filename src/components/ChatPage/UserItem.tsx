import { MouseEventHandler } from 'react'
import Avatar from '../Avatar/Avatar'
import Timer from './Timer'
import { useQuery } from '@tanstack/react-query'
import { getLastMessages } from '../../axios/message'

const UserItem = ({
  name,
  caption,
  active,
  onClick,
  onContextMenu,
  isOnline,
  userId,
}: {
  name: string
  caption: string
  active?: boolean
  isOnline?: boolean
  userId?: string
  onClick?: MouseEventHandler
  onContextMenu?: MouseEventHandler
}) => {
  const { data } = useQuery({
    queryKey: ['get-last-message', userId],
    // @ts-expect-error -//
    queryFn: () => {
      if (userId) {
        return getLastMessages(userId)
      }
      return Promise.resolve({ data: {} })
    },
  })

  return (
    <div
      className={`mx-1 my-2 flex cursor-pointer items-center justify-between rounded-s-lg bg-opacity-0 p-1 dark:border-l-4 dark:border-black hover:dark:bg-slate-800 ${
        active
          ? '!bg-gray-100 from-yellow-800 to-black dark:!border-yellow-200 dark:bg-gradient-to-r'
          : 'hover:bg-gray-100 dark:border-slate-800 dark:border-transparent dark:border-opacity-50 dark:hover:bg-slate-800'
      }`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <Avatar name={name} caption={caption} isOnline={isOnline} />
      <div className="w-[140px] text-right">
        {/* @ts-expect-error -// */}
        {data?.data && (
          <div>
            <div className="text-xs dark:text-gray-300">
              {/* @ts-expect-error -// */}
              <Timer timer={data?.data?.createdAt} />
            </div>
            <div className="... truncate text-xs dark:text-gray-300">
              {/* @ts-expect-error -// */}
              {data?.data?.message}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserItem
