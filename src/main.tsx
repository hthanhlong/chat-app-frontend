import * as React from "react"
import * as ReactDOM from "react-dom/client"
import "./index.css"
import AuthProvider from "./provider/AuthProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "./App"
import LoadingProvider from "./provider/LoadingProvider"
import SocketStatesContext from "./provider/SocketProvider"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketStatesContext>
        <QueryClientProvider client={queryClient}>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </QueryClientProvider>
      </SocketStatesContext>
    </AuthProvider>
  </React.StrictMode>
)
