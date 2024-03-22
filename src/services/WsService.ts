import { AUTH_VARIABLE } from "../constant"

class WsService {
  private ws: WebSocket | null = null
  public readyState: number = 0

  constructor(url: string = "ws://localhost:8081") {
    if (!this.ws) {
      this.ws = new WebSocket(url)
      this.ws.onopen = () => {
        this.readyState = this.ws?.readyState || WebSocket.OPEN
        this.sendData({
          type: "INIT",
          payload: "",
        })
      }
      this.ws.onclose = () => {
        this.readyState = this.ws?.readyState || WebSocket.CLOSED
        console.log("socket server closed")
      }
      this.ws.onerror = (error) => {
        console.log("error", error)
      }
      console.log("this.ws", this.ws)
      this.ws.onmessage = this.handleOnMessage
    }
  }

  handleOnMessage(event: MessageEvent) {
    console.log("event", event)
    const { type, payload } = JSON.parse(event.data)
    console.log("type ====>", type)
    switch (type) {
      case "INIT":
        console.log("init", payload)
        break
      case "HAS_NEW_NOTIFICATION":
        console.log("HAS_NEW_NOTIFICATION ====>")
        break
      default:
        break
    }
  }

  sendData({ type, payload }: { type: string; payload?: unknown }) {
    if (this.readyState !== WebSocket.OPEN) return
    const newData = {
      accessToken: localStorage.getItem(AUTH_VARIABLE.ACCESS_TOKEN),
      data: {
        type: type,
        payload: payload,
      },
    }
    this.ws?.send(JSON.stringify(newData))
  }

  close() {
    if (this.readyState !== WebSocket.OPEN) return
    this.ws?.close()
  }
}

export default WsService
