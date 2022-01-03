import './Modal.scss'
import { useCallback, useState } from 'react'

// Style

// Utils
import cn from 'classnames'

// Interface
interface Props {
  isOpen: boolean
  setOpen: any
  children: JSX.Element

  setOuterIsLock?: React.Dispatch<React.SetStateAction<boolean>>

  customClass?: any
}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function Modal(props: Props): JSX.Element {
  const [isLock, setIsLock] = useState<boolean>(false)

  const handleClickClose = useCallback(() => {
    if (!isLock) {
      setIsLock(true)
      if (props?.setOuterIsLock) props.setOuterIsLock(true)

      setTimeout(() => {
        setIsLock(false)
        if (props?.setOuterIsLock) props.setOuterIsLock(false)

        props.setOpen(false)
      }, 400)
    }
  }, [])

  return (
    <div
      onMouseDown={handleClickClose}
      className={cn('modal', { modal_open: props.isOpen }, { modal_close: isLock }, props.customClass)}
    >
      <div className="modal__inner">
        <div onMouseDown={(e) => e.stopPropagation()} className="modal__content">
          {props.children}
        </div>
      </div>
    </div>
  )
}
