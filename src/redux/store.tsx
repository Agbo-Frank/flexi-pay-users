import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { AuthApi } from './slice/Auth'
import modalSlice from './slice/modal'
import dataSlice from './slice/OtherData'
import { UserApi } from './slice/User'
import { WalletApi } from './slice/wallet'

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    data: dataSlice,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [WalletApi.reducerPath]: WalletApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    AuthApi.middleware, 
    UserApi.middleware, 
    WalletApi.middleware
  ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
