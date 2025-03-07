import { useEffect, useState } from 'react'

const usePropertiesElement = (classSelector: string) => {
  const [properties, setProperties] = useState<DOMRect | null>(null)

  const handleResize = (element: HTMLElement) => {
    if (element) {
      const rect = element.getBoundingClientRect()
      setProperties(rect)
    }
  }

  useEffect(() => {
    const element = document.querySelector(
      `.${classSelector}`,
    ) as HTMLElement | null
    if (element) {
      const rect = element.getBoundingClientRect()
      setProperties(rect)
    }
    window.addEventListener('resize', () =>
      handleResize(element as HTMLElement),
    )
    return () => {
      window.removeEventListener('resize', () =>
        handleResize(element as HTMLElement),
      )
    }
  }, [classSelector])

  return properties
}

export default usePropertiesElement
