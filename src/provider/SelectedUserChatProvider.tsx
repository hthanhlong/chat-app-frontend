import { ReactNode, createContext, useMemo, useState } from "react"

type SelectedUserChatContextType = {
  selectedId: string
  listFriends: []
  setSelectedId: (id: string) => void
  setListFriends: (list: unknown[]) => void
}

export const SelectedUserChatContext =
  createContext<SelectedUserChatContextType>({
    selectedId: "",
    listFriends: [],
    setSelectedId: () => {},
    setListFriends: () => [],
  })

const SelectedUserChatProvider = ({ children }: { children: ReactNode }) => {
  const [selectedId, setSelectedId] = useState("")
  const [listFriends, setListFriends] = useState([])

  const contextValue = useMemo(
    () => ({
      selectedId: selectedId || "",
      listFriends: listFriends || [],
      setSelectedId,
      setListFriends,
    }),
    [selectedId, listFriends]
  )

  return (
    // @ts-expect-error- //
    <SelectedUserChatContext.Provider value={contextValue}>
      {children}
    </SelectedUserChatContext.Provider>
  )
}

export default SelectedUserChatProvider
