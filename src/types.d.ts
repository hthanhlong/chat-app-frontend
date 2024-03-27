interface LoginInput {
  username: string
  password: string
}

interface SignupInput {
  nickname: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface ERROR_MESSAGE {
  required: string
  maxLength: string
}

interface InputProps {
  label?: string
  name: string
  errorMessage: string | undefined
  register: UseFormRegister<LoginInput>
  placeholder?: string
  type?: string
}

interface SuccessResponse<T> {
  isSuccess: boolean
  errorCode: unknown
  message: string
  data: T
}

interface FriendRequest {
  senderId: string
  receiverId: string
  status: 'PENDING' | 'FRIEND' | 'UNFRIEND' | 'REJECT'
}

interface CustomWebSocket extends WebSocket {
  sendDataToServer: (data: { type: string; payload?: unknown | null }) => void
  pong: (data: string) => void
}

interface TypeMessage {
  senderId: string
  receiverId: string
  message: string
  createAt?: string
}

interface User {
  username: string
  profilePicUrl?: string
  email: string
  nickname?: string
  caption?: string
}
