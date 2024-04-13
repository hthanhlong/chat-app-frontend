import { CloseIcon } from '../../assets'

const CloseButton = ({
  handleClickClose,
}: {
  handleClickClose: () => void
}) => {
  return (
    <div className="inline-block w-full p-2 lg:hidden">
      <CloseIcon
        onClick={handleClickClose}
        className="ml-auto h-[32px] w-[32px] cursor-pointer rounded-full transition-all hover:scale-110"
      />
    </div>
  )
}

export default CloseButton
