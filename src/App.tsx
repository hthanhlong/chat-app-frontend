import { useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { router } from "./routers"
import { LoadingComponent } from "./components"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSocketStates } from "./hooks/useSocketStates"
import { AUTH_VARIABLE } from "./constant"
import { useAuth } from "./hooks/useAuth"

const App = () => {
  const { id } = useAuth()
  const { setIsHasNotification, setWs } = useSocketStates()

  const init = async () => {
    const ws = new WebSocket("ws://localhost:8081")
    setWs(ws)
    ws.onopen = () => {
      if (ws.readyState === 1) {
        ws.send(
          JSON.stringify({
            accessToken: localStorage.getItem(AUTH_VARIABLE.ACCESS_TOKEN),
            data: {
              type: "INIT",
              payload: null,
            },
          })
        )
      }
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === "HAS_NEW_NOTIFICATION") {
        setIsHasNotification(true)
      }
    }

    ws.onerror = (event) => {
      console.log("error", event)
    }

    ws.onclose = () => {
      setTimeout(() => {
        console.log("reconnecting")
        init()
      }, 1000)
    }
  }

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div className="relative">
      <RouterProvider router={router} />
      <LoadingComponent />
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default App
