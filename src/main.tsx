import * as ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  AuthProvider,
  NotificationProvider,
  LoadingProvider,
  PartnerProvider,
} from './core/provider'
import App from './App'
import './global.css'
import { googleClientId } from './config'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <LoadingProvider>
            <PartnerProvider>
              <App />
            </PartnerProvider>
          </LoadingProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </AuthProvider>
  </GoogleOAuthProvider>,
)
