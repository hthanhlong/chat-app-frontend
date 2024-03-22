import { AUTH_VARIABLE } from "../constant"

interface customTypeWsService extends WebSocket {
  sendDataToServer: (data: Record<string, unknown>) => void
}

class WsService {
  static instance: customTypeWsService
  static ReadyState: number = 0

  constructor() {}

  static init(url: string = "ws://localhost:8081") {
    WsService.instance = new WebSocket(url) as customTypeWsService
    WsService.instance.onopen = WsService._onOpen
    WsService.instance.onmessage = WsService._onMessage
    return WsService.instance
  }

  static _onMessage = (event: MessageEvent) => {
    if (WsService.ReadyState === WebSocket.OPEN) {
      console.log("event.data", event.data)
    }
  }

  // Static method to get the WsService instance
  static getInstance(): WsService {
    if (!WsService.instance) {
      WsService.instance = WsService.init()
    }
    return WsService.instance
  }

  static _onOpen = () => {
    WsService.ReadyState = WsService.instance.readyState
    WsService.sendDataToServer({ type: "INIT" })
  }

  static sendDataToServer = <T>({
    type,
    payload,
  }: {
    type: string
    payload?: T
  }) => {
    if (WsService.ReadyState === WebSocket.OPEN) {
      const newData = {
        accessToken: localStorage.getItem(AUTH_VARIABLE.ACCESS_TOKEN),
        data: {
          type: type,
          payload: payload || null,
        },
      }
      WsService.instance.send(JSON.stringify(newData))
    }
  }

  static close = () => {
    WsService.instance.close()
  }
}

export default WsService
