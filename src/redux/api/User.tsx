import { createApi, fetchBaseQuery, SkipToken } from '@reduxjs/toolkit/query/react'
import { IUser, IResponse, IChangePassword, IDeliveryAddress } from '../../interface'
import { ILogin, IRegister, IForgetPassword } from '../../interface'
import { REACT_APP_BASE_URL } from '../../config'
import { RootState } from '../store'
import { FLEXIPAY_URL } from '../../utils/constants'
import { IAddAddress } from '../../components/interface'


export const UserApi = createApi({
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
    reducerPath: 'User',
    tagTypes: ['User', "Checkout", "Address"],
    refetchOnReconnect: true,
    endpoints: (build) => ({
        getUser: build.query<IResponse<{data: IUser}>, void>({
            query: () => ({
                url: "/user/profile",
                method: 'GET'
            }),
            transformResponse: (response: IResponse<{data: IUser}>, meta, arg) => response,
            providesTags: ['User']   
        }),
        editUser: build.mutation<IResponse<{data: null}>, Partial<IUser>>({
            query: (body) => ({
                url: "/user/profile",
                method: 'POST',
                body
            }),
            invalidatesTags: ['User'],
            transformResponse: (response: IResponse<{data: null}>, meta, arg) => response
        }),
        changePassword: build.mutation<IResponse<{data: null}>, IChangePassword>({
            query: (body) => ({
                url: '/auth/update-password',
                method: 'POST',
                body
            }),
            transformResponse: (response: IResponse<{data: null}>, meta, arg) => response
        }),
        getDeliveryAddress: build.query<IResponse<{data: IDeliveryAddress[]}>, void>({
            query: (body) => ({
                url: "/user/fetch/delivery_addresses",
                method: "GET"
            }),
            providesTags: ['User', "Checkout", "Address"],
        }),
        createDeliveryAddress: build.mutation<IResponse<{data: null}>, Omit<IAddAddress, 'id'>>({
            query: (body) => ({
                url: "/user/create/delivery_address-details",
                method: "POST",
                body
            }),
            invalidatesTags: ['User', "Checkout", "Address"],
        }),
        updateDeliveryAddress: build.mutation<IResponse<{data: null | any[]}>, IDeliveryAddress>({
            query: (body) => ({
                url: "/user/update/delivery_address-details",
                method: "POST",
                body
            }),
            invalidatesTags: ['User', "Checkout", "Address"],
        }),
        removeDeliveryAddress: build.mutation<IResponse<{data: null | any[]}>, {id: number | string | null}>({
            query: (body) => ({
                url: "/user/delete/delivery_address-detail",
                method: "DELETE",
                body
            }),
            invalidatesTags: ['User', "Checkout", "Address"],
        })
    })
})

export const { 
    useGetUserQuery,
    useEditUserMutation,
    useChangePasswordMutation,
    useLazyGetUserQuery,
    useGetDeliveryAddressQuery,
    useCreateDeliveryAddressMutation,
    useUpdateDeliveryAddressMutation,
    useLazyGetDeliveryAddressQuery,
    useRemoveDeliveryAddressMutation
} = UserApi