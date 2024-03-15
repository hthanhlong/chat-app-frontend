import Message from "../Message/Message"
import "./ChatSection.css"

const ChatSection = () => {
  return (
    <div className="chat-section h-full flex flex-col">
      <Message
        isSender
        message="hello kjdhskf ksdjfh ksdjfh ksdjfh skdfjh skdfjh skdfjh ksdjfhks dfjhksdf hskdjfh ksdjfh ksdjfhs kdfjhs kdfjhks dfjhsdk j"
      />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message message="Lorem ldkhjf dslf lsdjkf lsdkfj lsdfj lsdkfj lsdkfsldkfj lsdkfj sldkf sldkfj sldkfj sldkfj sldfkj dlfkj lsdkf lsdfkj lsdkfj lsdkfj lkdfjlskdfjls dkfjls dkfj dlfkjsdlfkj " />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
      <Message isSender message="hello" />
    </div>
  )
}

export default ChatSection
