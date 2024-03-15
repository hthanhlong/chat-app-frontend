import { useEffect, useState } from "react"

const usePropertiesElement = (classSelector: string) => {
  const [properties, setProperties] = useState<DOMRect | null>(null)

  useEffect(() => {
    const element = document.querySelector(`.${classSelector}`)
    const properties = element?.getBoundingClientRect()
    if (properties) setProperties(properties)
    else setProperties(null)
  }, [classSelector])

  return properties
}

export default usePropertiesElement
