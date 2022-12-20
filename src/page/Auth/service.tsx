import * as Yup from 'yup';
import { useAuth } from '../../context/Auth';
import { useFormik, FormikHelpers, FormikConfig } from 'formik';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IAuthResponse, ILogin, IRegister, IResetPassword, ITrigger } from '../../interface';
import { getReferral } from '../../utils';

export function FPFormikLogin(login: ITrigger<ILogin, IAuthResponse>){
    let navigate = useNavigate();
    let searchParams = useSearchParams()[0]
    let pathname = searchParams.has('r_url') ? `/${searchParams.get('r_url')}` : '/'
    let { signIn } = useAuth()

    let initialValues: ILogin = {
        email: '',
        password: ''
    }

    async function onSubmit (value: ILogin, formikHelpers: FormikHelpers<ILogin| any>){
        // console.log(value)
        try{
            let data = await login(value).unwrap()
            
            if(data.status === 'success'){
                if(!data.is_verified){
                    navigate('/auth/verify/email?email=' + value.email, { replace: true })
                }
                else{
                    signIn(`${data.token}`, () => {
                        navigate(pathname)
                    })
                }
            }
        }
        catch(err){
            if(err){
                let error: any = err
                if(error.data.errors){
                    formikHelpers.setErrors(error.data.errors)
                }
            }
        }
    }

    let validationSchema = () => {
        return Yup.object({
            password: Yup
                .string()
                .required('password field is required')
                .min(6, 'Must be 6 characters or more'),
            email: Yup
                .string()
                .required('email field is required')
                .email('Invalid email address'),
        })
    }

    return useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })
}

export function FPFormikRegister(register: ITrigger<IRegister, IAuthResponse>, referee: string | null, cookie: {"flex-pay-cookie"?: any}){
    let navigate = useNavigate()

    let initialValues: IRegister = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        ref: referee || getReferral(),
        guest_id: cookie['flex-pay-cookie']
    }

    async function onSubmit (value: IRegister, formikHelpers: FormikHelpers<IRegister | any>){
        try{
            let data = await register(value).unwrap()
            console.log(data)
            if(data.status == 'success'){
                navigate("/auth/verify/email?from=register", { replace: true })
            }
        }
        catch(err){
            if(err){
                let error: any = err
                if(error.data.errors){
                    formikHelpers.setErrors(error.data.errors)
                }
            }
        }
    }
    let validationSchema = () => {
        return Yup.object({
            first_name: Yup.string().required('first name field is Required'),
            last_name: Yup.string().required('last name field is Required'),
            password: Yup
                        .string()
                        .required('password field is Required')
                        .min(6, 'Must be 6 characters or more'),
            password_confirmation: Yup.string().required('Please confirm password'),
            email: Yup
                    .string()
                    .required('email field isRequired')
                    .email('Invalid email address'),
            phone_number: Yup.string().required('phone number field is Required'),
        })
    }

    const formik: FormikConfig<IRegister>  | any= useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })

    return formik
}

export function FPFormikForgetPassword(sendRequest: any){
    let initialValues = {
        email: '',
    }

    async function onSubmit (value: typeof initialValues, formikHelpers: FormikHelpers<typeof initialValues | any>){
        try{
            console.log(value)
            let data = await sendRequest(value).unwrap()
            // if(data === 'success'){

            // }
        }
        catch(err){
            console.log(err)
            if(err){
                let error: any = err
                if(error.data.errors){
                    formikHelpers.setErrors(error.data.errors)
                }
            }
        }
    }
    let validationSchema = () => {
        return Yup.object({
            email: Yup
                .string()
                .required('email field isRequired')
                .email('Invalid email address'),
        })
    }

    const formik: FormikConfig<typeof initialValues>  | any= useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })

    return formik
}

export function FPFormikResetPassword(reset: any, data: {token: string, email: string}){
    let navigate = useNavigate()
    let initialValues = {
        password: '',
        password_confirmation: '',
    }

    async function onSubmit (value: typeof initialValues, formikHelpers: FormikHelpers<IResetPassword | any>){
        try{
            let res = await reset({
                ...value, 
                token: data.token,
                email: data.email
            }).unwrap()
            if(res.status === 'success'){
                navigate('/auth/login', {replace: true})
            }
        }
        catch(err){
            console.log(err)
            if(err){
                let error: any = err
                if(error.data.errors){
                    formikHelpers.setErrors(error.data.errors)
                }
            }
        }
    }
    let validationSchema = () => {
        return Yup.object({
            password: Yup
                    .string()
                    .required('password field is Required')
                    .min(8, 'Must be 8 characters or more'),
            password_confirmation: Yup
                    .string()
                    .required('confirm password field is Required')
                    .min(8, 'Must be 8 characters or more'),
        })
    }

    const formik: FormikConfig<typeof initialValues>  | any = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })

    return formik
}