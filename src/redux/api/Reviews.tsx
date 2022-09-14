import {  IPagination, IRate, IResponse, IReview } from '../../interface'
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
        commentOnAProduct: build.mutation<IResponse<{data: any}>, Omit<IReview, 'rate'>>({
            query: (body) => ({
                url: "/reviews/submit",
                method: 'POST',
                body
            }),
            invalidatesTags: ['Review']
        }),
        rateAProduct: build.mutation<IResponse<{data: any}>, Omit<IReview, 'comment'>>({
            query: (body) => ({
                url: "/reviews/rate",
                method: "POST",
                body
            }),
            invalidatesTags: ['Review']
        }),
        getReviews: build.query<IResponse<{data: IPagination<IRate[]>}>, {slug: string, page: string}>({
            query: (body) => ({
                url: "/reviews/fetch-all?page=" + body.page,
                method: 'GET',
                params: { slug: body.slug }
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