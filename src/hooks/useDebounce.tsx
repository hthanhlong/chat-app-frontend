import { useEffect, useState } from "react"

const useDebounce = (value: string) => {
  const [valueDebounce, setValueDebounce] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setValueDebounce(value)
    }, 300)
    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return { valueDebounce }
}

export default useDebounce
