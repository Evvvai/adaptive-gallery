import ActionCreators from '../../../store/gallery.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useTypesSelector } from '../useTypesSelector'
import { useCallback } from 'react'

// Gallery menu Hook Selector / Dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useGalleryMenu = () => {
  const dispatch = useDispatch()
  const { openedGalleryMenu, closedGalleryMenu } = bindActionCreators(ActionCreators.actions, dispatch)
  const { isGalleryMenu } = useTypesSelector((state) => state.gallery)

  const openGalleryMenu = useCallback(() => {
    openedGalleryMenu()
  }, [])

  const closeGalleryMenu = useCallback(() => {
    closedGalleryMenu()
  }, [])

  return { isGalleryMenu, openGalleryMenu, closeGalleryMenu }
}
