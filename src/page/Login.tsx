import { Logo, MailIcon, PadLock, Spinner } from '../components/icons';

import {Button, FormInput, AuthenticationForm} from '../components';

import { ILogin } from './interface'
import { useLoginMutation } from '../redux/slice/Auth'

import { useFormik, FormikHelpers } from 'formik';
import { Link } from 'react-router-dom'
import * as Yup from 'yup';

export function Login() {
    let [login, { isLoading: loading, data, error }] =  useLoginMutation()
    console.log(data, error)

    let initialValues: ILogin = {
        email: '',
        password: ''
    }

    async function onSubmit (value: any, formikHelpers: FormikHelpers<ILogin| any>){
        try{
            console.log(value)
            let data = await login(value).unwrap()
            console.log(data)
        }
        catch(err){
            console.log(err)
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

    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })
  return (
    <AuthenticationForm>
        <div className='flex justify-between items-center w-full py-6 border-b border-solid border-grey-100'>
            <Logo />
            <div className='flex gap-5 items-center text-grey-200'>
            <span>Don’t have an account?</span>
            <Link to="/register" className='py-2  px-8 border border-solid border-grey-100 rounded-full'>Register</Link>
            </div>
        </div>

        <div className='my-20'>
            <div>
            <h2 className='text-primary-dark-blue font-bold text-4xl'>Hi, You’ve Been Missed</h2>
            <small className='block mt-3 text-lg text-grey-300'>Log in to your account</small>
            </div>
            {/* {data && <p>{data}</p>} */}
            {/* {error && <p>{error}</p>} */}
            <form className='my-10 w-10/12' onSubmit={formik.handleSubmit}>
            <div className='flex justify-start gap-3'>
                <FormInput 
                type='email' 
                Icon={MailIcon} 
                name="email" 
                label="Email"
                formik={formik} />
                <FormInput 
                type='password' 
                Icon={PadLock} 
                name="password" 
                label="Password"
                formik={formik}/>
            </div>

            <p className='text-sm mb-3'>Forgotten your password?   <Link to="/forget-password" className='text-crimson'>Reset password</Link></p>

            <div className='w-3/12'>
                <Button type='submit' color="#FF5000">
                    <div className='flex items-center gap-3'>
                        {
                            loading ? 
                            <div className='w-5 h-5'><Spinner /></div>: 
                            <p className='text-white font-semibold text-sm'>Login</p>
                        }
                    </div>
                </Button>
            </div>
            </form>
        </div>
    </AuthenticationForm>
  );
}

export default Login;
