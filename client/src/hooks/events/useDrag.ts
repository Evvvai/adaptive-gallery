/**
 * made little bit crutchy, can be redone,
 * but I do not particularly see the point of doing two drag&drop
 */

import { useLayoutEffect, useState } from 'react'

// Utils
import debounce from '../../utils/browser/debounce'

// Interface
interface Props {
  ref?: any
  debounce?: number
}

////////////////////////////////////////////////////////////////////////////////////////////////////
export const useDrag = (props?: Props): any => {
  const debounceTime = props?.debounce === undefined ? null : props.debounce
  const dropArea = props?.ref?.current ? props.ref.current : window

  const [isArea, setIsArea] = useState<boolean>(false)

  const handleDragEnterEvent = (e: any) => {
    if (!isArea) {
      console.log('> enter')
      setIsArea(true)
    }
  }

  const handleDragLeaveEvent = (e: any) => {
    // console.log('< leave', e?.target)
  }

  const handleDropLeaveEvent = (e: any) => {
    if (isArea) setIsArea(false)
    console.log('^ drop')
  }

  useLayoutEffect(() => {
    if (typeof window !== undefined && typeof dropArea !== undefined) {
      let dragEnterHandler: (e: any) => void
      let dragDropHandler: (e: any) => void
      let dragLeaveHandler: (e: any) => void

      if (!debounceTime) {
        dragEnterHandler = handleDragEnterEvent
        dragLeaveHandler = handleDragLeaveEvent
        dragDropHandler = handleDropLeaveEvent
      } else {
        dragEnterHandler = debounce<typeof handleDragEnterEvent>(handleDragEnterEvent, debounceTime)
        dragLeaveHandler = debounce<typeof handleDragLeaveEvent>(handleDragLeaveEvent, debounceTime)
        dragDropHandler = debounce<typeof handleDropLeaveEvent>(handleDropLeaveEvent, debounceTime)
      }

      dropArea.addEventListener('dragenter', dragEnterHandler, false)
      dropArea.addEventListener('dragleave', dragLeaveHandler, false)
      dropArea.addEventListener('drop', dragDropHandler, false)

      return () => {
        dropArea.removeEventListener('dragenter', dragEnterHandler, false)
        dropArea.removeEventListener('dragenter', dragLeaveHandler, false)
        dropArea.removeEventListener('drop', dragDropHandler, false)
      }
    }
  }, [])

  return [isArea, setIsArea]
}
