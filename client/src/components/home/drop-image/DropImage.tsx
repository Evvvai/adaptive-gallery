import './DropImage.scss'
import { FC, Fragment, useEffect } from 'react'

// Icons

// Components
import ImageDrop from '../../UI/modal/image-drop/ImageDrop'
import Modal from '../../UI/modal/Modal'

// Custom hooks
import { useDrag } from '../../../hooks/events/useDrag'
import { useGalleryMenu } from '../../../hooks/store/gallery/useGalleryMenu'

// Utils
import { Portal } from '../../../utils/portal'

////////////////////////////////////////////////////////////////////////////////////////////////////
const DropImage: FC = () => {
  const [isArea, setIsArea] = useDrag()
  const { isGalleryMenu } = useGalleryMenu()

  useEffect(() => {
    setIsArea(false)
  }, [isGalleryMenu])

  return (
    <Fragment>
      {!isGalleryMenu && (
        <Portal>
          <Modal setOpen={setIsArea} isOpen={isArea}>
            <ImageDrop />
          </Modal>
        </Portal>
      )}
    </Fragment>
  )
}

export default DropImage
