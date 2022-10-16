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
        getSimilarProducts: build.query<IResponse<{data: IPagination<IProduct[]>}>, {product_uuid?: string, category_uuid?: string}>({
            query: (body) => ({
                url: "/guest/product/fetch/similar",
                params: body
            }),
            providesTags: (result, error, arg) => {
                return result ? [{type: 'Product', product: arg.product_uuid, category: arg.category_uuid}] : ['Product']
            }
        }),
        getOtherProductsFromVendor: build.query<IResponse<{data: IPagination<IProduct[]>}>, {product_uuid?: string, vendor_uuid?: string}>({
            query: (body) => ({
                url: "/guest/product/vendor/fetch-other",
                params: body
            }),
            providesTags: (result, error, arg) => {
                return result ? [{type: 'Product', product: arg.product_uuid, vendor: arg.vendor_uuid}] : ['Product']
            }
        }),
        getRecentlyViewed: build.query<IResponse<{data: IProduct[]}>, void>({
            query: () => ({
                url: "/guest/product/vendor/fetch/recently-viewed",
            }),
            providesTags: ['Product']
        }),
        getProduct: build.query<IResponse<{data: IProduct }>, string>({
            query: (id) => ({
                url: "/guest/product/view/" + id
            }),
            providesTags: (result, error, arg) => {
                return result ? [{type: 'Product', id: arg}] : ['Product']
            }
        }),
        filterProduct: build.query<IResponse<{data: IPagination<IProduct[]>}>, Partial<IFilter> | any>({
            query: (body) => ({
                url: '/guest/product/filter',
                method: 'GET',
                params: body,
    
            })
        }),
        getCategories: build.query<IResponse<ICategory[]>, void>({
            query: () => ({
                url: "/category/fetch/parent"
            }),
            providesTags: (result, error, arg) => {
                return result ? [{type: 'Category', category: 'parent'}] : ['Category']
            }
        }),
        getSubCategories: build.query<IResponse<ICategory>, {page: number, id: string}>({
            query: (body) => ({
                url: "/category/fetch/sub/" + body.id
            }),
            providesTags: (result, error, arg) => {
                return result ? [{type: 'Category', category: arg.id}] : ['Category']
            }
        }),
        searchProduct: build.query<IResponse<{data: IPagination<IProduct[]>}>, {page?: string; search_params: string;}>({
            query: (body) => ({
                url: "/guest/product/search?search_param=" + body.search_params + "&page=" + body.page
            }),
            providesTags: ['Category']
        }),
        getStore: build.query<IResponse<{data: IProduct[]}>, string>({
            query: (slug) => ({
                url: "/guest/shop/" + slug
            }),
        })
    })
})

export const { 
    useGetProductsQuery,
    useGetProductQuery,
    useLazyFilterProductQuery,
    useGetCategoriesQuery,
    useLazyGetCategoriesQuery,
    useLazyGetProductsQuery,
    useSearchProductQuery,
    useLazySearchProductQuery,
    useGetStoreQuery,
    useLazyGetStoreQuery,
    useGetSubCategoriesQuery,
    useLazyGetSubCategoriesQuery,
    useGetSimilarProductsQuery,
    useLazyGetSimilarProductsQuery,
    useGetRecentlyViewedQuery,
    useLazyGetRecentlyViewedQuery,
    useLazyGetOtherProductsFromVendorQuery
} = ProductApi