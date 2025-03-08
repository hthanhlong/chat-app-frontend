import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  AuthProvider,
  NotificationProvider,
  SelectedUserChatProvider,
  LoadingProvider,
  WebSocketProvider,
} from './core/provider'
import App from './App'
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
              <WebSocketProvider>
                <LoadingProvider>
                  <App />
                </LoadingProvider>
              </WebSocketProvider>
            </SelectedUserChatProvider>
          </NotificationProvider>
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
)
