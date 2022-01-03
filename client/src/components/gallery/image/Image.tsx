import './Image.scss'

import { FC, useEffect, useState } from 'react'

// Icons
import { MdOutlineDeleteForever } from 'react-icons/md'
import { Photo } from '@types'

// Components

// Custom hooks
import { useGallery } from '../../../hooks/store/gallery/useGallery'
import cn from 'classnames'

// Interface
interface Props {
  margin?: string
  photo: Photo
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const MyImage: FC<Props> = (props) => {
  const { removePhoto } = useGallery()

  const [isLoad, setIsLoad] = useState<boolean>(false)

  const imgStyle = { margin: props.margin || '2px', display: 'block' }

  const handleOnClickRemove = () => removePhoto(props.photo)

  useEffect(() => {
    const image = new Image()
    image.src = props.photo.url
    image.onload = () => {
      setIsLoad(true)
    }
  }, [])

  return (
    <div className="image">
      <img
        className={cn('image__img', { isLoading: !isLoad })}
        style={imgStyle}
        src={props.photo.url}
        width={props.photo.width}
        height={props.photo.height}
        alt="img"
      />
      <div onClick={handleOnClickRemove} className="image-options">
        <MdOutlineDeleteForever className="image-options__delete" />
      </div>
    </div>
  )
}

export default MyImage
