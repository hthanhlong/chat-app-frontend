import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import { LocalStorageService } from '../services'

type SelectedUserChatContextType = {
  selectedId: string
  listFriends: []
  setSelectedId: (id: string) => void
  setListFriends: (list: unknown[]) => void
}

export const SelectedUserChatContext =
  createContext<SelectedUserChatContextType>({
    selectedId: '',
    listFriends: [],
    setSelectedId: () => {},
    setListFriends: () => [],
  })

const SelectedUserChatProvider = ({ children }: { children: ReactNode }) => {
  const [selectedId, setSelectedId] = useState(
    LocalStorageService.getSelectedId() || '',
  )
  const [listFriends, setListFriends] = useState([])

  const contextValue = useMemo(
    () => ({
      selectedId: selectedId || '',
      listFriends: listFriends || [],
      setSelectedId,
      setListFriends,
    }),
    [selectedId, listFriends],
  )

  useEffect(() => {
    if (selectedId) {
      LocalStorageService.setSelectedId(selectedId)
    }
  }, [selectedId])

  return (
    // @ts-expect-error- //
    <SelectedUserChatContext.Provider value={contextValue}>
      {children}
    </SelectedUserChatContext.Provider>
  )
}

export default SelectedUserChatProvider
