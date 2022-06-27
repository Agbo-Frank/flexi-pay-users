export interface IRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cPassword: string;
    phoneNumber: string
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