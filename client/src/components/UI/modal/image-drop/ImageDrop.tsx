import './ImageDrop.scss'
import { FC } from 'react'

// Icons
import { RiImageAddFill } from 'react-icons/ri'

// Components

// Custom Hooks
import { useGallery } from '../../../../hooks/store/gallery/useGallery'

// Utils
import { Photo } from '@types'

// Interface
interface Props {
  isOpen?: boolean
  close?: any
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ImageDrop: FC<Props> = ({ isOpen, close }) => {
  const { loadPhotos, addPhoto, photos } = useGallery()

  const handleClickDrop = (event: any) => close(false)
  const handleChangeDrop = (event: any) => {
    const type = event.target.files[0].type
    const size = event.target.files[0].size
    if (
      (type === 'image/gif' || type === 'image/jpeg' || type === 'image/jpg' || type === 'image/png') &&
      size < 9999999
    ) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])

      reader.onload = async (e: any) => {
        const image = new Image()
        image.src = e.target.result
        image.onload = async () => {
          const height = image.height
          const width = image.width

          const photo: Photo = {} as Photo
          photo.url = URL.createObjectURL(event.target.files[0])
          photo.width = width
          photo.height = height
          photo.id = photos.length + 1

          addPhoto(photo)
          close()
        }
      }
    }

    if (event.target.files[0].type === 'application/json' && event.target.files[0].size < 9999999) {
      const reader = new FileReader()
      reader.readAsText(event.target.files[0])
      reader.onload = async (e: any) => {
        try {
          const photosValid = await JSON.parse(e.target.result).galleryImages
          loadPhotos(photosValid)
          close()
        } catch (e) {}
      }
    }
  }

  return (
    <form className="image-drop" onClick={(e) => e.stopPropagation()}>
      <div className="image-drop-content">
        <input
          onClick={handleClickDrop}
          onChange={handleChangeDrop}
          className="image-drop-content__input"
          type="file"
          accept="image/gif,image/jpeg,image/png,application/json"
        />
        <RiImageAddFill className="image-drop-content__icon" />
      </div>
    </form>
  )
}

export default ImageDrop
