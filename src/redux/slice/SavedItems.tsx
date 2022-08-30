import { IAddToCartReq, ICart, IResponse } from '../../interface'
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
        savedItem: build.mutation<IResponse<{data: ICart}>, IAddToCartReq>({
            query: (body) => ({
                url: "/guest/add/to-cart",
                method: 'POST',
                body
            }),
            invalidatesTags: ['SaveItem']
        }),
        getUserSavedItems: build.query<IResponse<{data: ICart[]}>, Pick<IAddToCartReq, 'guest_id'>>({
            query: (body) => ({
                url: "/guest/fetch/all-cart?guest_id=" + body.guest_id,
            }),
            providesTags: ['SaveItem']
        }),
        removeItem: build.mutation<IResponse<{data: null}>, Pick<ICart, 'uuid'>>({
            query: (body) => ({
                url: "/guest/remove/from-cart",
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