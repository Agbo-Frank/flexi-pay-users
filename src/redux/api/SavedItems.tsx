import { IAddToCartReq, ICart, IResponse, ISavedItems } from '../../interface'
import { RootState } from '../store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FLEXIPAY_URL } from '../../utils/constants'


export const SavedItemsApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: FLEXIPAY_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).data.token
            
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
          
            return headers
        }
    }),
    reducerPath: 'SaveItem',
    tagTypes: ['Product', 'SaveItem'],
    endpoints: (build) => ({
        savedItem: build.mutation<IResponse<{data: null}>, Pick<IAddToCartReq, 'product_uuid'>>({
            query: (body) => ({
                url: "/wishlist/store",
                method: 'POST',
                body
            }),
            invalidatesTags: ['SaveItem']
        }),
        getUserSavedItems: build.query<IResponse<{data: ISavedItems[]}>, void>({
            query: (body) => ({
                url: "/fetch-all",
            }),
            providesTags: ['SaveItem']
        }),
        removeItem: build.mutation<IResponse<{data: null}>, {wishlist_uuid: string}>({
            query: (body) => ({
                url: "/wishlist/destroy",
                method: 'DELETE',
                body
            }),
            invalidatesTags: ['SaveItem']
        }),
    })
})

export const { 
    useSavedItemMutation,
    useRemoveItemMutation,
    useGetUserSavedItemsQuery
} = SavedItemsApi