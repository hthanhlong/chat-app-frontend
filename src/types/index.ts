import { FieldValues, UseFormRegister } from 'react-hook-form'

export interface ISignIn {
  username: string
  password: string
}

export interface ISignInResponse {
  uuid: string
  name: string
  nickName: string
  accessToken?: string
  refreshToken?: string
}

export interface ISignUp {
  nickName: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface ISignUpResponse {
  accessToken: string
  refreshToken: string
}

export interface IErrorMessages {
  required: string
  maxLength: string
}

export interface IInputProps<T extends FieldValues> {
  label?: string
  name: 'username' | 'password' | 'nickName' | 'email' | 'confirmPassword'
  errorMessage: string | undefined
  register: UseFormRegister<T>
  placeholder?: string
  type?: string
  defaultValue?: string
}

export interface ISuccessResponse<T> {
  isSuccess: boolean
  errorCode: unknown
  message: string
  data: T
}

export interface IFriendRequest {
  receiverUuid: string
  status: 'PENDING' | 'FRIEND' | 'UNFRIEND' | 'REJECT'
}

export interface ICustomWebSocket extends WebSocket {
  sendDataToServer: (data: { type: string; payload?: unknown | null }) => void
  pong: (data: string) => void
}

export interface IMessage {
  uuid: string
  senderUuid: string
  receiverUuid: string
  message: string
  fileUrl?: string
  createdAt?: string
  isImageLoaded?: boolean
}

export interface IUser {
  _id?: string
  username: string
  profilePicUrl?: string
  email: string
  nickName?: string
  caption?: string
}

export interface ICustomNotification {
  _id: string | null
  senderUuid: string
  receiverUuid: string
  type: 'FRIEND' | 'MESSAGE' | 'POST'
  content: string
  status: 'READ' | 'UNREAD'
  updatedAt?: string
  createdAt?: string
}

export interface IFriend {
  uuid: string
  name: string
  nickName: string
  profilePicUrl: string
  caption?: string
}

export type EventPayload<T> = {
  eventName: string
  value: T
}
