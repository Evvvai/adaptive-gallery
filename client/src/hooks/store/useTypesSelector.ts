import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'

export const useTypesSelector: TypedUseSelectorHook<RootState> = useSelector
