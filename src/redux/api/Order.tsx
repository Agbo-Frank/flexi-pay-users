import {  ICheckoutDetails, IOrder, IPagination, IRate, IResponse, TCheckoutMethod } from '../../interface'
import { RootState } from '../store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FLEXIPAY_URL } from '../../utils/constants'


export const OrderApi = createApi({
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
    reducerPath: 'Order',
    tagTypes: ['Product', 'Order'],
    endpoints: (build) => ({
        checkout: build.mutation<IResponse<{data: {link: string}}>, {checkout_method: TCheckoutMethod}>({
            query: (body) => ({
                url: "/checkout",
                method: "POST",
                body
            }),
            invalidatesTags: ['Order']
        }),
        processCheckout: build.mutation<IResponse<{data: ICheckoutDetails}>, void>({
            query: () => ({
                url: "/process-checkout",
                method: "POST",
            })
        }),
        getUserOrders: build.query<IResponse<IPagination<IOrder>>, void>({
            query: () => ({
                url: "user/orders",
                method: "GET"
            }),
            providesTags: ["Order"]
        })
    })
})

export const { 
    useProcessCheckoutMutation,
    useCheckoutMutation,
    useGetUserOrdersQuery
} = OrderApi