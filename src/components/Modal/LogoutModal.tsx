import { Button, Modal } from "flowbite-react"

function LogoutModal({
  openModal,
  onClose,
  onAccept,
  textClose,
  textAccept,
  header,
  body,
}: {
  openModal: boolean
  onClose: () => void
  onAccept: () => void
  textClose?: string
  textAccept?: string
  header?: string
  body?: string
}) {
  return (
    <>
      <Modal show={openModal} onClose={onClose}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {(
              <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
                {body}
              </h3>
            ) || "Body"}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={onAccept}>
            {textAccept || "Accept"}
          </Button>
          <Button color="gray" onClick={onClose}>
            {textClose || "Close"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default LogoutModal
