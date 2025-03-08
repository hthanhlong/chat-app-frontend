import RightContent from '../RightContent/RightContent'
import RightTop from '../../core/RightTop/RightTop'
import { RightContentLayout } from '../../ui'

const ChatRight = () => {
  return (
    <RightContentLayout>
      <div id="chat-right">
        <RightTop />
        <RightContent />
      </div>
    </RightContentLayout>
  )
}

export default ChatRight
