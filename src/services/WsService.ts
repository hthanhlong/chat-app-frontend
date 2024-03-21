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
          data: "",
        })
        console.log("socket connected")
      }
      this.ws.onclose = () => {
        this.readyState = this.ws?.readyState || WebSocket.CLOSED
        console.log("socket server closed")
      }
      this.ws.onerror = (error) => {
        console.log("error", error)
      }
    }
  }

  sendData({ type, data }: { type: string; data: unknown }) {
    if (this.readyState !== WebSocket.OPEN) return
    const newData = {
      accessToken: localStorage.getItem(AUTH_VARIABLE.ACCESS_TOKEN),
      type: type,
      data: data,
    }
    this.ws?.send(JSON.stringify(newData))
  }

  close() {
    if (this.readyState !== WebSocket.OPEN) return
    this.ws?.close()
  }
}

export default WsService
