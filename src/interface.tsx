
export interface IUser {
    first_name?: string;
    last_name?: string;
    email: string;
    phone_number: string;
    state?: string;
    city?: string;
    address?: string;
}

export interface IForgetPasswordResponse {
    status: string,
    message: string
}

export interface IAuthResponse {
    is_verified: boolean;
    message: string;
    status: string;
    token?: string
}