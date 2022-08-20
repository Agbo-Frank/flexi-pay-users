import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './slice/modalSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { AuthApi } from './slice/Auth'
import { UserApi } from './slice/User'
import dataSlice from './slice/OtherData'
import { WalletApi } from './slice/wallet'

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    data: dataSlice,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [WalletApi.reducerPath]: WalletApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthApi.middleware, UserApi.middleware, WalletApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
