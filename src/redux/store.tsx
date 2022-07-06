import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './slice/modalSlice'
import { AuthApi } from './slice/Auth'

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    [AuthApi.reducerPath]: AuthApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
