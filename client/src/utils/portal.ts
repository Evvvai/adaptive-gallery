import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: any
  selector?: any
}

export function Portal({ children, selector }: Props) {
  const ref = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted ? createPortal(children, ref?.current || document.body) : null
}
