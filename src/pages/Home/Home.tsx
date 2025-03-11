import { RootLayout } from '../../layouts'
import { ChatLeft, ChatRight } from '../../components'
import WebsocketService from '../../core/services/WebsocketService'
import { useEffect } from 'react'
import { LocalStorageService } from '../../core/services'

const Home = () => {
  useEffect(() => {
    const accessToken = LocalStorageService.getAccessToken()
    if (!accessToken) return
    WebsocketService.init(accessToken)
  }, [])

  return (
    <RootLayout>
      <ChatLeft />
      <ChatRight />
    </RootLayout>
  )
}

export default Home
