import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './provider/AuthProvider'
import LoadingProvider from './provider/LoadingProvider'
import SocketProvider from './provider/SocketProvider'
import SelectedUserChatProvider from './provider/SelectedUserChatProvider'
import NotificationProvider from './provider/NotificationProvider'
import App from './app/App'
import './global.css'
import { googleClientId } from './config'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <NotificationProvider>
            <SelectedUserChatProvider>
              <SocketProvider>
                <LoadingProvider>
                  <App />
                </LoadingProvider>
              </SocketProvider>
            </SelectedUserChatProvider>
          </NotificationProvider>
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
)
