import * as React from "react"
import * as ReactDOM from "react-dom/client"
import "./index.css"
import AuthProvider from "./provider/AuthProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "./App"
import LoadingProvider from "./provider/LoadingProvider"
import SocketProvider from "./provider/SocketProvider"
import SelectedUserChatProvider from "./provider/SelectedUserChatProvider"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SelectedUserChatProvider>
          <SocketProvider>
            <LoadingProvider>
              <App />
            </LoadingProvider>
          </SocketProvider>
        </SelectedUserChatProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
