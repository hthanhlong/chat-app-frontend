import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from '../Avatar/Avatar'
import { Link } from 'react-router-dom'
import {
  faEllipsisVertical,
  faSquarePhoneFlip,
  faCamera,
} from '@fortawesome/free-solid-svg-icons'
import { useSelectedUserChat } from '../../../core/hooks'
import { useQuery } from '@tanstack/react-query'
import { UserService } from '../../../core/services'
import { Skeleton } from '../../ui'

const RightTop = () => {
  const { selectedId } = useSelectedUserChat()

  const { data, isLoading } = useQuery({
    queryKey: ['get-user-top-right', selectedId],
    // @ts-expect-error - //
    queryFn: () => {
      if (selectedId) {
        return UserService.getUserById(selectedId)
      }
      return Promise.resolve({
        data: {
          nickname: '',
          caption: '',
        },
      })
    },
  })

  return (
    <div className="flex h-[80px] items-center justify-between border-b-[1px] bg-white dark:border-gray-600 dark:bg-black">
      {!isLoading ? (
        <div className="p-2">
          <Avatar name={data?.data?.nickname} caption={data?.data?.caption} />
        </div>
      ) : (
        <Skeleton className="h-[72px]" />
      )}
      <div className="flex w-[152px] gap-1">
        <div className="w-full rounded-lg p-1 text-center dark:hover:text-orange-500">
          <FontAwesomeIcon
            icon={faCamera}
            className="dark:text-white"
            fontSize={24}
          />
        </div>
        <div className="w-full rounded-lg p-1 text-center dark:hover:text-orange-500">
          <FontAwesomeIcon
            icon={faSquarePhoneFlip}
            className="dark:text-white"
            fontSize={24}
          />
        </div>
        <Link
          to="/settings"
          className="inline-block w-full rounded-lg p-1 text-center dark:hover:text-orange-500"
        >
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="dark:text-white"
            fontSize={24}
          />
        </Link>
      </div>
    </div>
  )
}

export default RightTop
