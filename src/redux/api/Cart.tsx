import { IAddToCartReq, ICart, IResponse } from '../../interface'
import { RootState } from '../store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FLEXIPAY_URL } from '../../utils/constants'


export const CartApi = createApi({
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
    reducerPath: 'Cart',
    tagTypes: ['Product', 'Cart'],
    endpoints: (build) => ({
        addToCart: build.mutation<IResponse<{data: ICart}>, IAddToCartReq>({
            query: (body) => ({
                url: "/guest/add/to-cart",
                method: 'POST',
                body
            }),
            invalidatesTags: ['Cart']
        }),
        updateCart: build.mutation<IResponse<{data: ICart}>, {quantity: string; cart_uuid: string}>({
            query: (body) => ({
                url: "/guest/update/cart",
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Cart']
        }),
        getUserCart: build.query<IResponse<{data: ICart[]}>, Pick<IAddToCartReq, 'guest_id'>>({
            query: (body) => ({
                url: "/guest/fetch/all-cart?guest_id=" + body.guest_id,
            }),
            providesTags: ['Cart']
        }),
        delCart: build.mutation<IResponse<{data: null}>, Pick<ICart, 'uuid'>>({
            query: (body) => ({
                url: "/guest/remove/from-cart",
                method: 'DELETE',
                body
            }),
            invalidatesTags: ['Cart']
        }),
        emptyCart: build.mutation<IResponse<{data: null}>, void>({
            query: () => ({
                url: "/guest/cart/destroy",
                method: 'POST'
            }),
            invalidatesTags: ['Cart']
        }),
    })
})

export const { 
    useAddToCartMutation,
    useGetUserCartQuery,
    useLazyGetUserCartQuery,
    useDelCartMutation,
    useUpdateCartMutation,
    useEmptyCartMutation
} = CartApi