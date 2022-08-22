import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { MutationDefinition, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query";
import { AlertColor } from "@mui/material";

export interface IUser {
    first_name?: string;
    last_name?: string;
    email: string;
    phone_number: string;
    state?: string;
    gender?: string;
    city?: string;
    address?: string;
    house_address?: string;
    postal_code?: string;
    nearest_bus_stop?: string;
    dob?: string;
    referral_link?: string;
    bank_account?: {
        account_number: string;
        bank_name: string;
        account_name: string;
        approved: false
    },
    reserved_account?: {
        account_number: string;
        bank_code: string;
        order_reference: string;
        reference: string;
    }
}

export interface IResponse<T> {
    message: string;
    status: 'failed' | 'success';
    result: T
}

export interface IFundWalletResponse{
    data: {
        link: string
    }
}

export interface IAuthResponse extends IResponse<IUser> {
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

export interface ICreateAccountBody {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    bvn: string
}

export interface IForgetPassword {
    email: string;
}

export interface IChangePassword {
    old_password: string;
    passwor: string;
    password_confirmation: string;
    previous_password?: string
}

export interface IWithdraw {
    bank_code: string;
    account_number: string;
    amount: string;
    redirect_url?: string;
    full_name: string;
}

export interface IFundWalletByCard {
    full_name: string;
    email: string;
    phone_number: string;
    amount: string;
    redirect_url?: string;
}

export interface IBanks {
    cbn_code: string;
    bank_name: string
}

export type ITrigger<T, Response> = MutationTrigger<MutationDefinition<T, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, Response, "Auth">>

export interface ISelectOptions {
    value: string;
    label: string
}

export interface IGetTransactionResponse {
    current_page: number;
    data: ITransacation[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean
    }[],
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    total: number;
    to: 15
}

export interface ITransacation {
    reference?: string;
    amount: string;
    charges: string;
    prev_balance: string;
    new_balance: string;
    status: "SUCCESSFUL";
    type: "DEBIT" | "CREDIT";
    created_at: string;
    updated_at: string;
    info: string
}

export interface IWalletDetails {
    uuid: string;
    account_number: string;
    account_reference: string;
    balance: string;
    status: string;
    account_name: string;
    bank_name: string;
}

export interface IModalReducer {
    orderDetails: boolean,
    trackOrder: boolean,
    productReview: boolean,
    addAddress: boolean,
    addCreditCard: boolean,
    withdrawalForm: boolean,
    editProfile: boolean;
    snackBar: {
        open: boolean;
        message: string;
        severity: AlertColor;
    }
}