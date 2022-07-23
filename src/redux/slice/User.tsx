import { createApi, fetchBaseQuery, SkipToken } from '@reduxjs/toolkit/query/react'
import { IUser } from '../../interface'
import { ILogin, IRegister, IForgetPassword } from '../../interface'
import { REACT_APP_BASE_URL } from '../../config'
import { RootState } from '../store'


export const UserApi = createApi({
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
    reducerPath: 'User',
    tagTypes: ['User'],
    refetchOnReconnect: true,
    endpoints: (build) => ({
        getUser: build.query<IUser, void>({
            query: () => ({
                url: "/user/profile",
                method: 'GET'
            }),
            transformResponse: (response: { result: {data:IUser}}, meta, arg) => response.result.data,
            providesTags: ['User']   
        }),
    })
})

export const { 
    useGetUserQuery,
} = UserApi