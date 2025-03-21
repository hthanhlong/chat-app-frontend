import { CloseIcon } from '../../icons'

const CloseButton = ({
  handleClickClose,
}: {
  handleClickClose: () => void
}) => {
  return (
    <div
      onClick={handleClickClose}
      className="inline-block w-full p-2 lg:hidden"
    >
      <CloseIcon />
    </div>
  )
}

export default CloseButton
