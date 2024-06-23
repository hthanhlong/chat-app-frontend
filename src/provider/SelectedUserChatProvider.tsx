import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import { LOCAL_STORAGE_KEY } from '../data'

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
    window.localStorage.getItem(LOCAL_STORAGE_KEY.SELECTED_ID) || '',
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
      window.localStorage.setItem(LOCAL_STORAGE_KEY.SELECTED_ID, selectedId)
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
