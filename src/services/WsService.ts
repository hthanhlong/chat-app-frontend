import { AUTH_VARIABLE } from "../constant"

class WsService {
  private ws: WebSocket | null = null

  constructor(url: string = "ws://localhost:8081") {
    if (!this.ws) {
      this.ws = new WebSocket(url)
    }
  }

  connect() {
    if (!this.ws) return
    this.ws.onopen = () => {
      if (!this.ws) return
      const templateData = {
        type: "auth",
        data: {
          accessToken:
            window?.localStorage?.getItem(AUTH_VARIABLE.ACCESS_TOKEN) || null,
        },
      }
      this.ws.send(JSON.stringify(templateData))
      this.ws.onmessage = (event) => {
        console.log(event.data)
      }
    }
  }

  close() {
    if (!this.ws) return
    this.ws.close()
  }
}

export default WsService
