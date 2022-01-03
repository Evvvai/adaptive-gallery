import { combineReducers } from 'redux'

// Import slices
import gallerySlice from './gallery.slice'

// Combine
export const rootReducer = combineReducers({
  [gallerySlice.name]: gallerySlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
