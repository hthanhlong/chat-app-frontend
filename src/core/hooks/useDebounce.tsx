import { useEffect, useRef, useState } from 'react'

const useDebounce = (value: string) => {
  const [valueDebounce, setValueDebounce] = useState(value)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
    timeout.current = setTimeout(() => {
      setValueDebounce(value)
    }, 300)
    return () => {
      clearTimeout(timeout.current as ReturnType<typeof setTimeout>)
    }
  }, [value])

  return { valueDebounce }
}

export default useDebounce
