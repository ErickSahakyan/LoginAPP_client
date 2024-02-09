import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import type { RootState } from '../store/store'
import store from '../store/store'

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector