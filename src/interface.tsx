import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { MutationDefinition, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query";

export interface IUser {
    first_name?: string;
    last_name?: string;
    email: string;
    phone_number: string;
    state?: string;
    city?: string;
    address?: string;
    gender?: string;
    referral_link?: string
}

export interface IResponse {
    message: string;
    status: string;
}

export interface IAuthResponse extends IResponse {
    is_verified?: boolean;
    token?: string
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IResetPassword {
    email: string;
    token: string;
    password: string;
    password_confirmation: string
}

export interface IRegister {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone_number: string
}

export interface IForgetPassword {
    email: string;
}

export type ITrigger<T, Response> = MutationTrigger<MutationDefinition<T, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, Response, "Auth">>