// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { deleteAllMessage } from '../../axios/message'

const ClearMessage = () => {
  //   const queryClient = useQueryClient()
  //   const { mutateAsync } = useMutation({
  //     mutationFn: () => {
  //       return deleteAllMessage({ senderUuid, receiverUuid })
  //     },
  //     onSuccess: () => {
  //       callback()
  //       queryClient.invalidateQueries({
  //         queryKey: ['get-message', receiverUuid],
  //       })
  //     },
  //   })

  return (
    <div
      onClick={() => {
        console.log('...process')
        // mutateAsync()
      }}
    >
      Clear conversation
    </div>
  )
}

export default ClearMessage
