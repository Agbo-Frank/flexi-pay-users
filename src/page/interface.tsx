export interface IRegister {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone_number: string
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IForgetPassword {
    email: string;
}

export interface IResetPassword {
    password: string;
}