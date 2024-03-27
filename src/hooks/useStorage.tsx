import { useState } from 'react'

const useStorage = (key: string) => {
  const [value, setValue] = useState<string | null>(localStorage.getItem(key))

  const set = (newValue: string) => {
    setValue(newValue)
    localStorage.setItem(key, newValue)
  }
  const remove = () => {
    setValue('')
    localStorage.removeItem(key)
  }
  return { value, set, remove }
}

export default useStorage
