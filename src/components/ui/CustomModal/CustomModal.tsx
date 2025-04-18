import { Button, Modal } from 'flowbite-react'
import { ReactNode } from 'react'

function CustomModal({
  openModal,
  onClose,
  onAccept,
  textClose,
  textAccept,
  header,
  body,
  size,
  actionArea,
}: {
  openModal: boolean
  onClose: () => void
  onAccept: () => void
  textClose?: string
  textAccept?: string
  header?: string
  body?: string | ReactNode
  actionArea?: boolean
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
}) {
  return (
    <>
      <Modal show={openModal} onClose={onClose} size={size || 'sm'}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Body>{body || 'Body'}</Modal.Body>
        {actionArea && (
          <Modal.Footer>
            <Button color="failure" onClick={onAccept}>
              {textAccept || 'Accept'}
            </Button>
            <Button color="gray" onClick={onClose}>
              {textClose || 'Close'}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  )
}

export default CustomModal
