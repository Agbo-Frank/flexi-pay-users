import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IAuthResponse } from '../../interface'
import { ILogin, IRegister, IForgetPassword } from '../../page/interface'
import { REACT_APP_BASE_URL } from '../../config'


export const AuthApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: REACT_APP_BASE_URL
    }),
    reducerPath: 'Auth',
    endpoints: (build) => ({
        register: build.mutation<any, IRegister>({
            query: (body) => ({
                url: "/auth/register",
                method: 'POST',
                body,
                header: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse: (response: any, meta, arg) => response,   
        }),
        login: build.mutation<IAuthResponse, ILogin>({
            query: (body) => ({
                url: "/auth/login",
                method: 'POST',
                body,
                header: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse: (response: IAuthResponse, meta, arg) => response,    
        }),
        forgotPassword: build.mutation<any, IForgetPassword>({
            query: (body) => ({
                url: "/auth/password/reset/link",
                method: 'POST',
                body,
                header: {
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse: (response:  any, meta, arg) => response,    
        })
    })
})

export const { 
    useRegisterMutation,
    useLoginMutation,
    useForgotPasswordMutation
} = AuthApi