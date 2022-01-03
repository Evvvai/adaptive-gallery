import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GalleryState } from '../types/store/gallery'
import { Photo } from '@types'

const initialState: GalleryState = {
  isGalleryMenu: false,

  photos: [],
}

// Slice
////////////////////////////////////////////////////////////////////////
const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    loadedPhotos: (state, { payload }: PayloadAction<Photo[]>) => {
      state.photos = [...state.photos, ...payload]
    },
    clearedPhotos: (state) => {
      state.photos = []
    },
    addedPhoto: (state, { payload }: PayloadAction<Photo>) => {
      state.photos.push(payload)
    },
    removedPhoto: (state, { payload }: PayloadAction<Photo>) => {
      state.photos = state.photos.filter((photo) => photo.id !== payload.id)
    },
    openedGalleryMenu: (state) => {
      state.isGalleryMenu = true
    },
    closedGalleryMenu: (state) => {
      state.isGalleryMenu = false
    },
  },
})

// export const {} = gallerySliceSlice.actions
export default gallerySlice

// Action
