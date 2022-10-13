import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { MutationDefinition, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query";
import { AlertColor } from "@mui/material";

export interface AddressDetails {
    id: string;
    name?: string;
    phone_number: string;
    state: string;
    city: string;
    nearest_bus_stop: string;
    house_address: string;
    postal_code: string;
    created_at?: string | Date;
    updated_at?: string | Date;
}

export interface IDeliveryAddress {
    id: string;
    name: string,
    phone_number: string,
    state: string,
    city: string,
    nearest_bus_stop: string,
    house_address: string,
    postal_code: string,
    is_default: number,
    created_at: Date | string,
    updated_at: string | Date
}

export interface IUser extends Omit<AddressDetails, 'id'> {
    first_name?: string;
    last_name?: string;
    email: string;
    gender?: string;
    address?: {
        city: string;
        house_address: string;
        nearest_bus_stop: string;
        postal_code: string;
        state: string
    };
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
    phone_number: string;
    ref?: string | null
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

export interface IStoreDetails {
    name: string;
    description: string;
    address_street_number: string;
    address_city: string;
    address_state: string;
    company_code : string,
    address_country_code : string,
    address_postal_code : string,
    address_street_alt?: string,
    name_slug?: string;
    shop_link?: string;
    user_id?: string;
    uuid?: string
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
    to: number
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

export interface IUserTransacation {
    user_id: number;
    reference?: string;
    amount: string;
    service_type: string;
    service_provider: string;
    service_number: string;
    status: string;
    created_at: string;
    updated_at: string;
    narration: string
}


export interface IWalletDetails {
    uuid: string;
    account_number: string;
    account_reference: string;
    balance: string;
    status: string;
    referral_balance: string;
    account_name: string;
    bank_name: string;
}

export interface IModalReducer {
    productReview: boolean,
    addAddress: {
        open: boolean;
        type: "edit" | "create";
        body: IDeliveryAddress | null
    },
    addCreditCard: boolean,
    withdrawalForm: boolean,
    editProfile: boolean;
    addressBook:boolean;
    snackBar: {
        open: boolean;
        message: string;
        severity: AlertColor;
    }
}

export interface IProductImage {
    id: number;
    product_id: number;
    image: string;
    created_at: string;
    updated_at: string;
    image_link: string;
}

export interface IProduct {
    uuid: string;
    name: string;
    description: string;
    price: string;
    slug: string;
    sku?: string;
    material?: string;
    key_features: string;
    product_code?: string;
    discounted_price?:string;
    weight?: string;
    category?: {
        uuid: string
    };
    vendor?: IStoreDetails;
    product_images: IProductImage[];
    installments: IInstallment[]
}

export interface IPagination<T> {
    current_page: number;
    data: T;
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
    to: number
}

export interface IAddToCartReq{
    product_uuid: string;
    quantity: string;
    guest_id: string;
}

export interface ICart{
    uuid: string;
    quantity: string;
    price: string;
    created_at: string;
    updated_at: string;
    user: IUser;
    product: IProduct | null
}

export interface ISavedItems{
    uuid: string;
    created_at: string;
    updated_at: string;
    product: IProduct
}

export interface IFilter {
    parent_category?: string;
    sub_category?: string;
    price?: string;
    product_name?: string;
    latest?: boolean | string;
    page?: string | number
}

export interface ICategory {
    uuid: string;
    name: string;
    slug: null | string;
    sub_categories: ISubCategory[]
    attributes: IAttributes[];
    products: IProduct[]
}

export interface ISubCategory extends ICategory {
    code: string;
    description: string;
    parent_code: string;
    created_at: string | Date;
    updated_at: string | Date;
    parent_id: number | string;
    is_active: boolean;
    attributes: IAttributes[]
}

export interface IAttributes {
    uuid: number | string;
    code: string;
    name: string;
    frontend_type: 'select' | 'radio' | 'text';
    is_filterable: boolean;
    is_required: boolean;
    created_at: string | Date;
    updated_at: string | Date;
}

export interface IInstallment {
    amount: string;
    frequency: string;
    product_uuid: string;
    product?: IProduct;
    name: string;
    uuid: string;
    installment_uuid: string;
    is_approved: number
}

export interface IRate {
    comment: string;
    rate: number | string;
    created_at: string | Date;
    updated_at: string | Date;
    user: IUser
}

export type TCheckoutMethod = "directly_via_wallet" | "install_mental_via_card" | "install_mental_via_wallet" | "directly_via_card" | string

export interface IDetails extends ICart {
    delivery_period: string | Date | any;
    delivery_fee: string;
    unit_price: number;
    total_price: number;
    vendor_id: number;
    product: IProduct | null
}

export interface ICheckoutDetails {
    details: IDetails[],
    total_delivery_fee: number;
    address_details: AddressDetails;
    sub_total: number;
    total: number;
    vat: number
}

export interface IOrder {
    id: string;
    order_type: string;
    status: string;
    discount_rate: string;
    discount_price: string;
    created_at: string | Date;
    updated_at: string | Date;
    customer: Pick<IUser, 'first_name' | 'last_name'>,
    order_detail: IOrderDetails[]
}

export interface IOrderDetails {
    quantity: number;
    price: string;
    delivery_address: IDeliveryAddress,
    product: IProduct;
    created_at: string | Date;
    updated_at: string | Date;
}

export interface IReview {
    comment: string;
    rate: string | number;
    slug: string
}

export interface ISubscription {
    amount_to_be_paid: string;
    amount_left: string;
    amount_paid: string;
    is_completed: number;
    method: string;
    created_at: string | Date;
    updated_at: string | Date;
    status: string;
    installment: IInstallment  
}