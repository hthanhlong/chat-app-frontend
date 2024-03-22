import { ReactNode, createContext, useEffect, useState } from "react"
import { AUTH_VARIABLE } from "../constant"
import { useAuth } from "../hooks/useAuth"

type SocketStatesContextType = {
  ws: CustomWebSocket | null
  setWs: (ws: CustomWebSocket) => void
  listOnLineUsers: string[]
  setListOnLineUsers: (listOnLineUsers: string[]) => void
  isHasNotification: boolean
  setIsHasNotification: (isHasNotification: boolean) => void
}

export const SocketStatesContext = createContext<SocketStatesContextType>({
  ws: null,
  setWs: () => {},
  listOnLineUsers: [],
  setListOnLineUsers: () => {},
  isHasNotification: false,
  setIsHasNotification: () => {},
})

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useAuth()
  const [isHasNotification, setIsHasNotification] = useState(false)
  const [ws, setWs] = useState<CustomWebSocket | null>(null)
  const [listOnLineUsers, setListOnLineUsers] = useState<string[]>([])

  const init = async () => {
    const ws = new WebSocket("ws://localhost:8081") as CustomWebSocket
    ws.onopen = () => _handleOpen(ws)
    ws.onmessage = _handleOnMessage
    ws.onerror = (event) => console.log("error", event)
    ws.sendDataToServer = (data) => _sendDataToServer(data, ws)
    setWs(ws)
  }

  const _handleOpen = (ws: CustomWebSocket) => {
    ws.send(
      JSON.stringify({
        accessToken: localStorage.getItem(AUTH_VARIABLE.ACCESS_TOKEN) || "",
        data: {
          type: "INIT",
        },
      })
    )
  }

  const _sendDataToServer = (
    data: {
      type: string
      payload?: unknown | null
    },
    ws: CustomWebSocket
  ) => {
    const accessToken = localStorage.getItem(AUTH_VARIABLE.ACCESS_TOKEN) || ""
    const templateData = {
      accessToken,
      data: {
        type: data.type,
        payload: data.payload || null,
      },
    }
    ws.send(JSON.stringify(templateData))
  }

  const _handleOnMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data)
    if (data.type === "HAS_NEW_NOTIFICATION") {
      setIsHasNotification(true)
    }
    if (data.type === "ONLINE_USERS") {
      const onlineUsers = data.payload as string[]
      const filterOnlineUsers = onlineUsers.filter((user) => user !== id)
      setListOnLineUsers(filterOnlineUsers)
    }
  }

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    const handleBeforeUnload = () => {
      ws?.sendDataToServer({ type: "CLOSE_CONNECTION" })
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [ws])

  return (
    <SocketStatesContext.Provider
      value={{
        ws,
        setWs,
        listOnLineUsers,
        setListOnLineUsers,
        isHasNotification,
        setIsHasNotification,
      }}
    >
      {children}
    </SocketStatesContext.Provider>
  )
}

export default SocketProvider
