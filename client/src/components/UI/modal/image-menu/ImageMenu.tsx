import './ImageMenu.scss'
import { FC, useState } from 'react'
import cn from 'classnames'

// Icons
import { IoIosClose } from 'react-icons/io'
import { BsImages } from 'react-icons/bs'

// Components
import MyInput from '../../my-input/MyInput'

// Custom Hooks
import { useGallery } from '../../../../hooks/store/gallery/useGallery'

// Utils
import photosPreset from '../../../../photos.json'
import { Photo } from '@types'

// Interface
interface Props {
  isOpen: boolean
  setOpen: any
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ImageMenu: FC<Props> = (props) => {
  const { loadPhotos, clearPhotos, addPhoto, photos } = useGallery()

  const [invalidJson, setInvalidJson] = useState<boolean>(false)
  const [imageSelected, setImageSelected] = useState<Photo>({} as Photo)
  const [imageUrl, setImageUrl] = useState<string>('')

  const handleClickDrop = (event: any) => setInvalidJson(false)
  const handleChangeDrop = (event: any) => {
    if (
      (event.target.files[0].type === 'image/gif' ||
        event.target.files[0].type === 'image/jpeg' ||
        event.target.files[0].type === 'image/jpg' ||
        event.target.files[0].type === 'image/png') &&
      event.target.files[0].size < 9999999
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

          setImageSelected(photo)
          setImageUrl(photo.url)
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
          props.setOpen(false)
        } catch (e) {
          setInvalidJson(true)
        }

        if (invalidJson) setInvalidJson(false)
        setImageUrl('')
      }
    }
  }

  const handleChangeUrl = (url: string) => {
    setImageUrl(url)
    const image = new Image()
    image.src = url
    image.onload = async () => {
      const height = image.height
      const width = image.width

      const photo: Photo = {} as Photo
      photo.url = url
      photo.width = width
      photo.height = height
      photo.id = photos.length + 1

      setImageSelected(photo)
    }
  }

  const handleClickClose = (event: any) => props.setOpen(false)

  const handleClickUpload = (event: any) => {
    if (!verifyImage()) return
    addPhoto(imageSelected)
    props.setOpen(false)
    setImageUrl('')
    setImageSelected({} as Photo)
  }

  // Dont have any ideas
  const verifyImage = (): boolean => {
    return imageSelected.url ? true : false
  }

  return (
    <form className="image-menu" onClick={(e) => e.stopPropagation()}>
      <div className="image-menu-content">
        <div className="image-menu-header">
          <div className="image-menu-header__title">Upload images</div>
          {/* <div onClick={clickCloseHandler}><Close /></div> */}
        </div>

        <div className="image-menu-preview">
          <div className="image-menu-preview-info">
            <BsImages className="image-menu-preview-info__icon" />
            <span className="image-menu-preview-info__text">Drop your image here or json</span>
          </div>
          <input
            onClick={handleClickDrop}
            onChange={handleChangeDrop}
            className="image-menu-preview__input"
            type="file"
            accept="image/gif,image/jpeg,image/png,application/json"
          />
          <img
            className="image-menu-preview__img"
            alt="none"
            src={
              imageSelected?.url
                ? imageSelected.url
                : 'https://firebasestorage.googleapis.com/v0/b/csleague-2ecff.appspot.com/o/etc%2Fnot_invites.gif?alt=media&token=1b1d83e1-f6f4-4a48-85cb-5520663ced0a'
              // process.env.REACT_APP_IMG_NONE Im sure you will forget to add in the .env  )0)))0)))
            }
          ></img>
        </div>

        {invalidJson && (
          <div className="image-menu-error">
            <pre className="language-json">
              {/* Not realese pattern codestyle for json...i lazy */}
              {/* <code></code> */}
              <h1 className="image-menu-error__title">Invalid json, check example below</h1>
              <code
                className="image-menu-error__text"
                dangerouslySetInnerHTML={{
                  __html: `{
  "galleryImages": [
      {
        "url": "http://photo.jpg",
        "width": 640,
        "height": 426
      },
  ]
}
`,
                }}
              />
            </pre>
          </div>
        )}

        <div className="image-menu-remote">
          <MyInput
            label={'image url'}
            model={{ value: imageUrl, setValue: handleChangeUrl }}
            type={'text'}
            name={'search'}
          />
        </div>

        <div className="image-menu-submit submit-content">
          <div className="submit-content">
            <div
              className="submit-content__preset"
              onClick={(e) => {
                clearPhotos()
                loadPhotos(JSON.parse(JSON.stringify(photosPreset)).galleryImages)
                handleClickClose(e)
              }}
            >
              Load preset
            </div>
            <div
              className="submit-content__clear"
              onClick={(e) => {
                clearPhotos()
                handleClickClose(e)
              }}
            >
              Clear gallery
            </div>
          </div>

          <div
            className={cn('image-menu-submit__upload', {
              active: verifyImage(),
            })}
            onClick={handleClickUpload}
          >
            Upload
          </div>
        </div>
      </div>
      <div className="image-menu-close" onClick={handleClickClose}>
        <IoIosClose />
      </div>
    </form>
  )
}

export default ImageMenu
