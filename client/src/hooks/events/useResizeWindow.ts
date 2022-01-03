import { useEffect, useState } from 'react'

// Utils
import debounce from '../../utils/browser/debounce'

// Interface
interface Props {
  ref?: any
  debounce?: number
}

////////////////////////////////////////////////////////////////////////////////////////////////////
export const useResizeWindow = (props: Props) => {
  const debounceTime = props.debounce === undefined ? null : props.debounce
  const [width, setWidth] = useState<number | any>(null)

  const handleResizeEvent = () => {
    if (width !== window.innerWidth) setWidth(props.ref ? props.ref.current.offsetWidth : window.innerWidth)
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      let resizeHandler: () => void

      if (!debounceTime) resizeHandler = handleResizeEvent
      else resizeHandler = debounce<typeof handleResizeEvent>(handleResizeEvent, debounceTime)

      window.addEventListener('resize', resizeHandler)

      return () => {
        window.removeEventListener('resize', resizeHandler)
      }
    }
  }, [])

  return [width, setWidth]
}
