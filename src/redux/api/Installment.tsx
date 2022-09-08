import {  ICart, IInstallment, IResponse } from '../../interface'
import { RootState } from '../store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FLEXIPAY_URL } from '../../utils/constants'


export const InstallmentApi = createApi({
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
    reducerPath: 'Insatallment',
    tagTypes: ['Insatallment'],
    endpoints: (build) => ({
        createInstallment: build.mutation<IResponse<{data: null}>, Omit<IInstallment, 'installment_uuid'>>({
            query: (body) => ({
                url: "/vendor/create/instalment",
                method: 'POST',
                body
            }),
            invalidatesTags: ['Insatallment']
        }),
        deleteInstallment: build.mutation<IResponse<{data: null}>, Pick<IInstallment, 'installment_uuid'>>({
            query: (body) => ({
                url: "/vendor/delete/instalment",
                method: 'DELETE',
                body
            }),
            invalidatesTags: ['Insatallment']
        }),
        updateInstallment: build.mutation<IResponse<{data: null}>, Omit<IInstallment, 'product_uuid'>>({
            query: (body) => ({
                url: "/vendor/update/instalment",
                method: 'DELETE',
                body
            }),
            invalidatesTags: ['Insatallment']
        }),
    })
})

export const { 
    useCreateInstallmentMutation,
    useDeleteInstallmentMutation,
    
} = InstallmentApi