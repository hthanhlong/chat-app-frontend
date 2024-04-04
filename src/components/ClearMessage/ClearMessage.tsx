// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { deleteAllMessage } from '../../axios/message'

const ClearMessage = () => {
  //   const queryClient = useQueryClient()
  //   const { mutateAsync } = useMutation({
  //     mutationFn: () => {
  //       return deleteAllMessage({ senderId, receiverId })
  //     },
  //     onSuccess: () => {
  //       callback()
  //       queryClient.invalidateQueries({
  //         queryKey: ['get-message', receiverId],
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
