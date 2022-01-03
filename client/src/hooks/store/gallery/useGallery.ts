import ActionCreators from '../../../store/gallery.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useTypesSelector } from '../useTypesSelector'
import { useCallback } from 'react'
import { Photo } from '@types'

// Gallery Hook Selector / Dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useGallery = () => {
  const dispatch = useDispatch()
  const { loadedPhotos, clearedPhotos, addedPhoto, removedPhoto } = bindActionCreators(ActionCreators.actions, dispatch)
  const { photos } = useTypesSelector((state) => state.gallery)

  const loadPhotos = useCallback(async (photos: Photo[]) => {
    try {
      const photoList = photos.map((photo: Photo, key: number) => {
        if (!photo.url || !photo.width || !photo.height) throw new Error('photo invalid')
        photo.id = key + photos.length
        return photo
      })

      loadedPhotos(photoList)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const clearPhotos = useCallback(async () => {
    clearedPhotos()
  }, [])

  const addPhoto = useCallback(async (photo: Photo) => {
    // const photo: Photo = {} as Photo

    addedPhoto(photo)
  }, [])

  const removePhoto = useCallback(async (photo: Photo) => {
    removedPhoto(photo)
  }, [])

  return { photos, loadPhotos, clearPhotos, addPhoto, removePhoto }
}
