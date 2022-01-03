import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import thunk from 'redux-thunk'

// export function makeStore() {
//   return configureStore({
//     reducer: rootReducer,
//     middleware: [thunk],
//   })
// }

// export type RootStore = ReturnType<typeof makeStore>
// export type RootState = ReturnType<RootStore['getState']>
// export type AppDispatch = typeof store.dispatch
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

// export const store = makeStore()

export const store = configureStore({
  reducer: rootReducer,
})
