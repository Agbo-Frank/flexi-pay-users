import {  IPagination, IRate, IResponse } from '../../interface'
import { RootState } from '../store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FLEXIPAY_URL } from '../../utils/constants'


export const ReviewApi = createApi({
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
    reducerPath: 'Review',
    tagTypes: ['Product', 'Review'],
    endpoints: (build) => ({
        commentOnAProduct: build.mutation<IResponse<{data: null}>, {comment: string; slug: string}>({
            query: (body) => ({
                url: "/reviews/submit",
                method: 'POST',
                body
            }),
            invalidatesTags: ['Review']
        }),
        rateAProduct: build.mutation<IResponse<{data: null}>, any>({
            query: (body) => ({
                url: "/reviews/rate",
                method: "POST",
                body
            }),
            invalidatesTags: ['Review']
        }),
        getReviews: build.query<IResponse<IPagination<IRate>>, {data: {slug: string}, page: string}>({
            query: (body) => ({
                url: "/reviews/fetch-all?page=" + body.page,
                method: 'GET',
                params: body.data
            }),
            providesTags: ["Review"]
        })
    })
})

export const { 
    useCommentOnAProductMutation,
    useRateAProductMutation,
    useGetReviewsQuery,
    useLazyGetReviewsQuery
} = ReviewApi