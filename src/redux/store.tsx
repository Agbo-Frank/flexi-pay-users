import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { AuthApi } from './slice/Auth'
import { CartApi } from './slice/Cart'
import modalSlice from './slice/modal'
import dataSlice from './slice/OtherData'
import { ProductApi } from './slice/Product'
import { UserApi } from './slice/User'
import { WalletApi } from './slice/wallet'

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    data: dataSlice,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [WalletApi.reducerPath]: WalletApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    AuthApi.middleware, 
    UserApi.middleware, 
    WalletApi.middleware,
    CartApi.middleware,
    ProductApi.middleware
  ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
