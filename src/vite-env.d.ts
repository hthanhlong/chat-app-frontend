/// <reference types="vite/client" />
interface RuntimeEnv {
  API_URL: string
  MODE?: string
  [key: string]: string
}

interface Window {
  env: RuntimeEnv
}
