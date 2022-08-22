import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IResponse, ICreateAccountBody, IWithdraw, IFundWalletByCard, IFundWalletResponse, IBanks, ITransacation, IGetTransactionResponse, IWalletDetails } from '../../interface'
import { RootState } from '../store'


export const WalletApi = createApi({
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
    reducerPath: 'Wallet',
    tagTypes: ['User', 'Banks', 'Transaction'],
    endpoints: (build) => ({
        createAccount: build.mutation<IResponse<{data: null}>, ICreateAccountBody>({
            query: (body) => ({
                url: "/create/reserved/account",
                method: 'POST',
                body,
            }),
            transformResponse: (response: IResponse<{data: null}>, meta, arg) => response,   
            invalidatesTags: ['User']
        }),
        withdrawFund: build.mutation<any, IWithdraw>({
            query: (body) => ({
                url: '/fund/my-bank',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Transaction']
        }),
        fundWalletByCard: build.mutation<IResponse<IFundWalletResponse>, IFundWalletByCard>({
            query: (body) => ({
                url: '/fund/via/wallet-card',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Transaction'],
            transformResponse: (response: IResponse<IFundWalletResponse>, meta, arg) => response,
        }),
        getAllBanks: build.query<IResponse<{data: IBanks[]}>, void>({
            query: () => ({
                url: "/guest/fetch-banks",
                method: 'GET'
            }),
            providesTags: ['Banks']
        }),
        getTransaction: build.query<IResponse<IGetTransactionResponse>, string>({
            query: (page) => ({
                url: "/wallet/transactions?page=" + page,
                method: "GET",
            }),
            providesTags: ['Transaction']
        }),
        getWalletDetails: build.query<IResponse<{data: IWalletDetails}>, void>({
            query: () => ({
                url: '/wallet/details',
                method: 'GET'
            })
        })
    }),
})

export const { 
    useCreateAccountMutation,
    useFundWalletByCardMutation,
    useLazyGetAllBanksQuery,
    useWithdrawFundMutation,
    useLazyGetTransactionQuery,
    useGetWalletDetailsQuery,
    useLazyGetWalletDetailsQuery
} = WalletApi