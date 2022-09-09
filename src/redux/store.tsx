import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { AuthApi } from './api/Auth'
import { CartApi } from './api/Cart'
import modalSlice from './slice/modal'
import dataSlice from './slice/OtherData'
import { ProductApi } from './api/Product'
import { SavedItemsApi } from './api/SavedItems'
import { UserApi } from './api/User'
import { WalletApi } from './api/wallet'
import { ReviewApi } from './api/Reviews'
import { OrderApi } from './api/Order'

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    data: dataSlice,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [WalletApi.reducerPath]: WalletApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer,
    [SavedItemsApi.reducerPath]: SavedItemsApi.reducer,
    [ReviewApi.reducerPath]: ReviewApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    AuthApi.middleware, 
    UserApi.middleware, 
    WalletApi.middleware,
    CartApi.middleware,
    ReviewApi.middleware,
    SavedItemsApi.middleware,
    OrderApi.middleware,
    ProductApi.middleware
  ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
