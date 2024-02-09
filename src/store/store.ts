import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})
export type RootState = ReturnType<typeof store.getState>

export default store