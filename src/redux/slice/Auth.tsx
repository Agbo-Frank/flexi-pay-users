import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IAuthResponse, IResetPassword, ILogin, IRegister, IForgetPassword, IResponse } from '../../interface'
import { RootState } from '../store'


export const AuthApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://flexipay.ng/api',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).data.token
            
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
          
            return headers
        }
    }),
    reducerPath: 'Auth',
    tagTypes: ['User'],
    endpoints: (build) => ({
        register: build.mutation<IAuthResponse, IRegister>({
            query: (body) => ({
                url: "/auth/register",
                method: 'POST',
                body,
            }),
            transformResponse: (response: IAuthResponse, meta, arg) => response,   
        }),
        login: build.mutation<IAuthResponse, ILogin>({
            query: (body) => ({
                url: "/auth/login",
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
            transformResponse: (response: IAuthResponse, meta, arg) => response
        }),
        forgotPassword: build.mutation<IResponse<any>, IForgetPassword>({
            query: (body) => ({
                url: "/auth/password/reset/link",
                method: 'POST',
                body
            }),
            transformResponse: (response:  any, meta, arg) => response,    
        }),
        resetPassword: build.mutation<IResponse<any>, IResetPassword>({
            query: (body) => ({
                url: "/auth/password/reset",
                method: 'POST',
                body
            }),
            transformResponse: (response: any, meta, arg) => response,    
        }),
        logout: build.mutation<IResponse<any>, void>({
            query: () => {
                return {
                    url: "/auth/logout",
                    method: 'POST'
                }
            },
            invalidatesTags: ['User'],
            transformResponse: (response: any, meta, arg) => response
        }),
    })
})

export const { 
    useRegisterMutation,
    useLoginMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useLogoutMutation,
} = AuthApi