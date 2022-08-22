import * as Yup from 'yup';
import { useAuth } from '../../context/Auth';
import { useFormik, FormikHelpers, FormikConfig } from 'formik';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IAuthResponse, ILogin, ITrigger } from '../../interface';

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
        try{
            let data = await login(value).unwrap()
            console.log(data)
            if(data.status === 'success'){
                if(!data.is_verified){
                    navigate('/verify/email?email=' + value.email)
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
                formikHelpers.setErrors(error.data.errors)
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