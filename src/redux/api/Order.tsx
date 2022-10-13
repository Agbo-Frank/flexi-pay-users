import {  ICheckoutDetails, IOrder, IPagination, IRate, IResponse, ISubscription, TCheckoutMethod } from '../../interface'
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
    tagTypes: ['Product', 'Order', 'Subscription', "Checkout"],
    endpoints: (build) => ({
        checkout: build.mutation<IResponse<{data: {link: string}}>, {checkout_method: TCheckoutMethod, install_mental_ids: string[] | undefined}>({
            query: (body) => ({
                url: "/checkout",
                method: "POST",
                body
            }),
            invalidatesTags: ['Order',  'Subscription']
        }),
        processCheckout: build.mutation<IResponse<{data: ICheckoutDetails}>, void>({
            query: () => ({
                url: "/process-checkout",
                method: "POST",
            }),
            invalidatesTags: ["Checkout"]
        }),
        getUserOrders: build.query<IResponse<{data: IPagination<IOrder[]>}>, number>({
            query: (page) => ({
                url: "/user/orders?page=" + page.toString(),
                method: "GET"
            }),
            providesTags: (result, error, arg) => result ? [{type: "Order", id: arg}] : ["Order"]
        }),
        getUserSubscriptions: build.query<IResponse<IPagination<ISubscription[]>>, number>({
            query: (page) => ({
                url: "/user/subscriptions?page=" + page.toString(),
                method: "GET"
            }),
            providesTags: (result, error, arg) => result ? [{type: "Subscription", id: arg}] : ["Subscription"]
        }),
        cancelSubscription: build.mutation<IResponse<{data: any[] | null}>, {id: string}>({
            query: (body) => ({
                url: "/user/cancel/subscription",
                method: "POST",
                body
            }),
            invalidatesTags: ["Subscription"]
        })
    })
})

export const { 
    useProcessCheckoutMutation,
    useCheckoutMutation,
    useGetUserOrdersQuery,
    useLazyGetUserOrdersQuery,
    useGetUserSubscriptionsQuery,
    useLazyGetUserSubscriptionsQuery,
    useCancelSubscriptionMutation
} = OrderApi