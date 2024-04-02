import { formatDate } from '../../helper'
const Timer = ({ timer }: { timer: string | undefined }) => {
  return (
    <div className="mb-2 text-xs opacity-30 dark:text-gray-300">
      {timer && formatDate(timer || '')}
    </div>
  )
}

export default Timer
