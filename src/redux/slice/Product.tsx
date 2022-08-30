import { ICategory, IFilter, IPagination, IProduct, IResponse } from '../../interface'
import { RootState } from '../store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FLEXIPAY_URL } from '../../utils/constants'
import { string } from 'yup'


export const ProductApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: FLEXIPAY_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).data.token
            
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
                headers.set('Content-Type', `application/json`);
            }
          
            return headers
        }
    }),
    reducerPath: 'Product',
    tagTypes: ['Product', 'Category'],
    endpoints: (build) => ({
        getProducts: build.query<IResponse<IPagination<IProduct[]>>, number>({
            query: (page) => ({
                url: "/guest/product/fetch-all?page=" + page
            }),
            providesTags: ['Product']
        }),
        getProduct: build.query<IResponse<{data: IProduct }>, string>({
            query: (id) => ({
                url: "/guest/product/view/" + id
            }),
            providesTags:['Product']
        }),
        filterProduct: build.query<IResponse<{data: IPagination<IProduct[]>}>, Partial<IFilter> | any>({
            query: (body) => ({
                url: '/guest/product/filter',
                method: 'GET',
                params: body
            })
        }),
        getCategories: build.query<IResponse<ICategory[]>, void>({
            query: () => ({
                url: "/category/fetch/parent"
            }),
            providesTags: ['Category']
        }),
        searchProduct: build.query<IResponse<{data: IPagination<IProduct[]>}>, {page?: string; search_params: string;}>({
            query: (body) => ({
                url: "/guest/product/search?search_param=" + body.search_params
            }),
            providesTags: ['Category']
        }),
    })
})

export const { 
    useGetProductsQuery,
    useGetProductQuery,
    useLazyFilterProductQuery,
    useGetCategoriesQuery,
    useLazyGetProductsQuery,
    useSearchProductQuery,
    useLazySearchProductQuery
} = ProductApi