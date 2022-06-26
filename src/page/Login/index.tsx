import Logo from '../../components/icons/logo';
import MailIcon from '../../components/icons/MailIcon';
import PadLock from '../../components/icons/PadLock';

import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import AuthenticationForm from '../../components/AuthenticationForm';

import { ILogin } from './interface'

import { useFormik, FormikConfig } from 'formik';
import { Link } from 'react-router-dom'
import * as Yup from 'yup';

function Login() {

    let initialValues: ILogin = {
        email: '',
        password: ''
    }

    function onSubmit (value: ILogin){
        console.log(value)
    }
    let validationSchema = () => {
        return Yup.object({
            password: Yup
                        .string()
                        .required('password field is Required')
                        .min(6, 'Must be 6 characters or more'),
            email: Yup
                    .string()
                    .required('email field isRequired')
                    .email('Invalid email address'),
        })
    }

    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit: (value) => {
            console.log(value)
        }
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

            <form className='my-10'>
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

            <Button color="#FF5000">
                <p className='text-white font-semibold text-sm'>Login</p>
            </Button>
            </form>
        </div>
    </AuthenticationForm>
  );
}

export default Login;
