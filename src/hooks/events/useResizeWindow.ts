import { useEffect, useState } from 'react'

// Interface
interface Props {
  ref?: any
}

////////////////////////////////////////////////////////////////////////////////////////////////////
export const useResizeWindow = (props: Props) => {
  const [width, setWidth] = useState<number | any>(null)

  const handleResizeEvent = () => {
    if (width !== window.innerWidth) setWidth(props.ref ? props.ref.current.offsetWidth : window.innerWidth)
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener('resize', handleResizeEvent)

      return () => {
        window.removeEventListener('resize', handleResizeEvent)
      }
    }
  }, [])

  return [width, setWidth]
}
